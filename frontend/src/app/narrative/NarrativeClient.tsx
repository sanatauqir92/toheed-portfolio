'use client';
import { useState, useMemo } from 'react';
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

export default function NarrativeClient({ narrative }: { narrative: NarrativeData }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
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
    if (selectedCategory === 'All Projects') {
      return narrative;
    }
    return {
      data: narrative.data.filter((job: Job) => job.Category === selectedCategory),
    };
  }, [narrative, selectedCategory]);

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
        <h1 className="text-3xl font-bold uppercase mb-4">Editing Work</h1>
        <p className="text-lg mt-4">No editing work available.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold uppercase mb-4">Editing Work</h1>
      <div>
        <div className="mb-4 flex gap-2 flex-wrap items-center">
          <p>Filter By:</p>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded border-2 border-dotted border-red-500 hover:bg-red-500 hover:text-white
                ${selectedCategory === cat ? 'bg-red-500 text-white focus:bg-red-500 transition-colors duration-700 ease-in-out' : 'bg-white text-black'}`}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ul className="md:flex flex-wrap list-none">
        {filteredNarrative?.data.map((job: Job) => (
          <li
            key={job.documentId}
            className="flex-none w-full md:w-1/3 flex mb-4"
          >
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
              <p className="text-xl">
                {job.Title} <i>{job.Year}</i>
              </p>
              <p className="text-lg">📽️ Directed by {job.Director}</p>
              <p className="text-lg">✂️ {job.Editor}</p>
              <p className="text-lg">{job.Accolades}</p>
            </div>
          </li>
        ))}
      </ul>
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
