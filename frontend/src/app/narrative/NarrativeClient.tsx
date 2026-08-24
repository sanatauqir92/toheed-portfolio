'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Modal from '../components/Modal';

type Job = {
  Director: string;
  Editor: string;
  Title: string;
  Year: string;
  documentId: string;
  Accolades: string;
  Url: string;
  Category: string;
  imageUrl?: string;
};

type NarrativeData = {
  data: Job[];
};

const DESKTOP_PAGE_SIZE = 3;
const MOBILE_PAGE_SIZE = 1;
const DESKTOP_BREAKPOINT = '(min-width: 768px)';

function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_BREAKPOINT);
    const update = () => setPageSize(mql.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return pageSize;
}

const missingImageIcon = (
  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

function Still({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gray-100 border border-gray-300 pr-0.5 flex items-center justify-center">
        {missingImageIcon}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="w-full h-full relative"
      onClick={onClick}
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover hover:cursor-pointer hover:opacity-70 pr-0.5"
        onError={() => setHasError(true)}
      />
    </button>
  );
}

function ProjectCard({ job, onOpenImage }: { job: Job; onOpenImage: (img: string) => void }) {
  return (
    <div className="w-full">
      {!job.Url ? (
        <div className="w-full aspect-video bg-white border border-gray-300 flex items-center justify-center mb-1 relative">
          <Image
            src={`/stills/${job.imageUrl}_placeholder.jpg`}
            alt="Video coming soon placeholder"
            fill
            className="object-cover opacity-80"
          />
          <span className="text-gray-600 text-lg font-medium relative z-10 bg-white/80 px-3 py-2 rounded">
            Final Mix Coming Soon
          </span>
        </div>
      ) : (
        <iframe
          src={job.Url}
          className="w-full aspect-video block mb-1"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
      <div className="flex flex-row mb-2">
        {!job.imageUrl ? (
          <div className="w-full h-24 bg-gray-100 border border-gray-300 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          Array.from({ length: 3 }, (_, idx) => {
            const img = `${job.imageUrl}_${idx + 1}.jpg`;
            return (
              <div key={idx} className="w-1/3 h-24">
                <Still src={`/stills/${img}`} alt={`${job.Title} still ${idx + 1}`} onClick={() => onOpenImage(img)} />
              </div>
            );
          })
        )}
      </div>
      <p className="text-lg">
        {job.Title} <i>{job.Year}</i>
      </p>
      <p className="text-base">📽️ Directed by {job.Director}</p>
      <p className="text-base">✂️ {job.Editor}</p>
      <p className="text-base">{job.Accolades}</p>
    </div>
  );
}

const gridColsByPageSize: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
};

function CategoryCarousel({
  category,
  jobs,
  pageSize,
  onOpenImage,
}: {
  category: string;
  jobs: Job[];
  pageSize: number;
  onOpenImage: (img: string) => void;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const total = jobs.length;

  // Jump back to the start whenever the page size changes (e.g. crossing the mobile breakpoint).
  useEffect(() => {
    setStartIndex(0);
  }, [pageSize]);

  const visibleJobs = useMemo(() => {
    if (total === 0) return [];
    return Array.from({ length: Math.min(pageSize, total) }, (_, i) => jobs[(startIndex + i) % total]);
  }, [jobs, startIndex, total, pageSize]);

  // Stills for the page that would show next, preloaded so the arrow feels instant.
  const preloadJobs = useMemo(() => {
    if (total <= pageSize) return [];
    const visibleIds = new Set(visibleJobs.map((job) => job.documentId));
    return Array.from({ length: Math.min(pageSize, total) }, (_, i) =>
      jobs[(startIndex + pageSize + i) % total]
    ).filter((job) => !visibleIds.has(job.documentId));
  }, [jobs, startIndex, total, pageSize, visibleJobs]);

  const handleNext = () => {
    setDirection('next');
    setStartIndex((prev) => (prev + pageSize) % total);
  };

  const handlePrev = () => {
    setDirection('prev');
    setStartIndex((prev) => (prev - pageSize + total) % total);
  };

  const gridColsClass = gridColsByPageSize[pageSize] ?? gridColsByPageSize[DESKTOP_PAGE_SIZE];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 mb-10">
      <h2 className="text-lg font-bold uppercase mb-4">{category}</h2>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={total <= pageSize}
          aria-label={`Show previous ${category} projects`}
          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#211814] text-white flex items-center justify-center hover:bg-black transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#211814]"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          key={startIndex}
          className={`grid ${gridColsClass} gap-6 flex-1 motion-reduce:animate-none ${
            direction === 'next'
              ? 'animate-[narrative-slide-in-right_300ms_ease-out]'
              : 'animate-[narrative-slide-in-left_300ms_ease-out]'
          }`}
        >
          {visibleJobs.map((job) => (
            <ProjectCard key={job.documentId} job={job} onOpenImage={onOpenImage} />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={total <= pageSize}
          aria-label={`Show next ${category} projects`}
          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#211814] text-white flex items-center justify-center hover:bg-black transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#211814]"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {total > pageSize && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          {startIndex + 1}–{((startIndex + visibleJobs.length - 1) % total) + 1} of {total}
        </p>
      )}

      {/* Preload the next page's stills so the arrow feels instant. */}
      <div aria-hidden="true" className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none">
        {preloadJobs.map((job) => (
          <div key={`preload-${job.documentId}`}>
            {!job.Url && job.imageUrl && (
              <div className="relative w-px h-px">
                <Image src={`/stills/${job.imageUrl}_placeholder.jpg`} alt="" fill priority />
              </div>
            )}
            {job.imageUrl &&
              Array.from({ length: 3 }, (_, idx) => (
                <div key={idx} className="relative w-px h-px">
                  <Image
                    src={`/stills/${job.imageUrl}_${idx + 1}.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NarrativeClient({ narrative }: { narrative: NarrativeData }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const pageSize = useResponsivePageSize();

  const jobsByCategory = useMemo(() => {
    const map = new Map<string, Job[]>();
    (narrative?.data ?? []).forEach((job) => {
      const category = job.Category || 'Uncategorized';
      if (!map.has(category)) map.set(category, []);
      map.get(category)!.push(job);
    });
    return map;
  }, [narrative]);

  const openImage = (img: string) => {
    setOpen(true);
    setImage(img);
  };

  if (!narrative?.data || narrative.data.length === 0) {
    return (
      <>
        <h1 className="text-xl font-bold uppercase mb-4">Editing Work</h1>
        <p className="text-lg mt-4">No editing work available.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold uppercase mb-4">Editing Work</h1>

      {Array.from(jobsByCategory.entries()).map(([category, jobs]) => (
        <CategoryCarousel
          key={category}
          category={category}
          jobs={jobs}
          pageSize={pageSize}
          onOpenImage={openImage}
        />
      ))}

      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          imageUrl={`/stills/lg_${image}`}
          altText="Enlarged still"
        />
      )}
    </>
  );
}
