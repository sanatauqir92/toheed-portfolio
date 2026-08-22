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

const PAGE_SIZE = 2;

export default function NarrativeClient({ narrative }: { narrative: NarrativeData }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [imageErrors, setImageErrors] = useState<Record<string, Set<string>>>({});

  const categories = useMemo(() => {
    if (!narrative?.data || narrative.data.length === 0) {
      return ['All Projects'];
    }
    return [
      'All Projects',
      ...Array.from(
        new Set(narrative.data.map((job: Job) => job.Category).filter(Boolean))
      ),
    ];
  }, [narrative]);

  const filteredNarrative = useMemo(() => {
    if (!narrative?.data) {
      return { data: [] };
    }
    return {
      data: narrative.data.filter((job: Job) => {
        return selectedCategory === 'All Projects' || job.Category === selectedCategory;
      }),
    };
  }, [narrative, selectedCategory]);

  const total = filteredNarrative.data.length;

  // Jump back to the start of the slideshow whenever the category changes.
  useEffect(() => {
    setStartIndex(0);
  }, [selectedCategory]);

  const visibleJobs = useMemo(() => {
    if (total === 0) return [];
    return Array.from({ length: Math.min(PAGE_SIZE, total) }, (_, i) =>
      filteredNarrative.data[(startIndex + i) % total]
    );
  }, [filteredNarrative, startIndex, total]);

  const handleNext = () => {
    setDirection('next');
    setStartIndex((prev) => (prev + PAGE_SIZE) % total);
  };

  const handlePrev = () => {
    setDirection('prev');
    setStartIndex((prev) => (prev - PAGE_SIZE + total) % total);
  };

  // Stills for the page that would show next, preloaded so the arrow feels instant.
  const preloadJobs = useMemo(() => {
    if (total <= PAGE_SIZE) return [];
    const visibleIds = new Set(visibleJobs.map((job) => job.documentId));
    return Array.from({ length: Math.min(PAGE_SIZE, total) }, (_, i) =>
      filteredNarrative.data[(startIndex + PAGE_SIZE + i) % total]
    ).filter((job) => !visibleIds.has(job.documentId));
  }, [filteredNarrative, startIndex, total, visibleJobs]);

  const openImage = (img: string) => {
    setOpen(true);
    setImage(img);
  };

  const handleImageError = (jobId: string, imageSrc: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [jobId]: new Set([...(prev[jobId] || []), imageSrc]),
    }));
  };

  const hasImageError = (jobId: string, imageSrc: string) => {
    return imageErrors[jobId]?.has(imageSrc) || false;
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

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-colors duration-200
                ${isSelected ? 'bg-[#211814] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {total === 0 ? (
        <p className="text-lg mt-4">No projects in this category.</p>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 md:p-6">

          <div className="flex items-center gap-3 md:gap-4">
            {total > PAGE_SIZE && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Show previous projects"
                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#211814] text-white flex items-center justify-center hover:bg-black transition-colors duration-200"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              key={startIndex}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 motion-reduce:animate-none ${
                direction === 'next'
                  ? 'animate-[narrative-slide-in-right_300ms_ease-out]'
                  : 'animate-[narrative-slide-in-left_300ms_ease-out]'
              }`}
            >
              {visibleJobs.map((job: Job) => (
                <div key={job.documentId} className="w-full">
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
                        const fullImagePath = `/stills/${img}`;
                        const hasError = hasImageError(job.documentId, fullImagePath);

                        return (
                          <div key={idx} className="w-1/3 h-24">
                            {hasError ? (
                              <div className="w-full h-full bg-gray-100 border border-gray-300 pr-0.5 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="w-full h-full relative"
                                onClick={() => openImage(img)}
                                style={{ background: 'none', border: 'none', padding: 0 }}
                              >
                                <Image
                                  src={fullImagePath}
                                  alt={`${job.Title} still ${idx + 1}`}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                  className="object-cover hover:cursor-pointer hover:opacity-70 pr-0.5"
                                  onError={() => handleImageError(job.documentId, fullImagePath)}
                                />
                              </button>
                            )}
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
              ))}
            </div>

            {total > PAGE_SIZE && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Show next projects"
                className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#211814] text-white flex items-center justify-center hover:bg-black transition-colors duration-200"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {total > PAGE_SIZE && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              {startIndex + 1}–{((startIndex + visibleJobs.length - 1) % total) + 1} of {total}
            </p>
          )}

          {/* Preload the next page's stills so the arrow feels instant. */}
          <div aria-hidden="true" className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none">
            {preloadJobs.map((job: Job) => (
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
                        sizes="(max-width: 768px) 50vw, 33vw"
                        priority
                      />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}

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
