'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '../components/Modal';
import { useMemo } from 'react';

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
  data: Job[] ;
};

const Narrative: React.FC = () => {
  const [narrative, setNarrative] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [imageErrors, setImageErrors] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const fetchNarrative = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const path = '/api/narratives?sort=Order:asc';
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch narrative data');
        const data = await res.json();
        setNarrative(data);
        console.log(data.data)
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNarrative();
  }, []);

  const categories = useMemo(() => {
    if (!narrative) return [];
    return [
      'All Projects',
      ...Array.from(
        new Set(narrative.data.map((job: Job) => job.Category).filter(Boolean))
      )
    ];
  }, [narrative]);

  const filteredNarrative = useMemo(() => {
    if (!narrative) return null;
    if (selectedCategory === 'All Projects') {
      return narrative;
    }
    return {
      data: narrative.data.filter((job: Job) => job.Category === selectedCategory)
    };
  }, [narrative, selectedCategory]);

  const openImage = (img: string) => {
    setOpen(true);
    setImage(img);
  };

  // Function to handle image errors per job
  const handleImageError = (jobId: string, imageSrc: string) => {
    setImageErrors(prev => ({
      ...prev,
      [jobId]: new Set([...(prev[jobId] || []), imageSrc])
    }));
  };

  // Function to check if an image has error for a specific job
  const hasImageError = (jobId: string, imageSrc: string) => {
    return imageErrors[jobId]?.has(imageSrc) || false;
  };

  console.log('Selected Category:', selectedCategory);
  console.log('Filtered Narrative:', filteredNarrative);

  if (loading) return <div>Loading...</div>;
  if (error || !narrative)
    return <div>Error: {error ?? 'No Equipment data'}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold uppercase mb-4">Editing Work</h1>
      <div>
      
        <div className="mb-4 flex gap-2 flex-wrap items-center">
          <p>Filter By:</p>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded border-2 border-dotted border-red-700 hover:bg-red-700
                ${selectedCategory === cat ? 'bg-red-700 text-white focus:bg-red-700 transition-colors duration-700 ease-in-out' : 'bg-white text-black'}`}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ul className="md:flex gap-1 list-none p-0">
        {filteredNarrative?.data.map((job: Job) => (
          <li
            key={job.documentId}
            className="flex-none w-full md:w-1/3 flex mb-4"
          >
            <div className="w-full">
              {job.Url !== '' && (
                <iframe
                  src={job.Url}
                  className="w-full aspect-video block mb-2"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
              <div className="flex flex-row gap-0.5 mb-2">
                {!job.imageUrl ? (
                  // Show "Coming Soon" placeholder if no imageUrl
                  <div className="w-full h-24 bg-white border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Coming Soon</span>
                  </div>
                ) : (
                  // Generate image buttons if imageUrl exists
                  Array.from({ length: 3 }, (_, idx) => {
                    const img = `${job.imageUrl}_${idx + 1}.jpg`;
                    const fullImagePath = `/stills/${img}`;
                    const hasError = hasImageError(job.documentId, fullImagePath);
                    
                    return (
                      <div key={idx} className="w-1/3 h-24">
                        {hasError ? (
                          <div className="w-full h-full bg-white border border-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Error</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="w-full h-full"
                            onClick={() => openImage(img)}
                            style={{ background: 'none', border: 'none', padding: 0 }}
                          >
                            <Image
                              src={fullImagePath}
                              alt={`${job.Title} still ${idx + 1}`}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-full object-cover hover:cursor-pointer hover:opacity-70"
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
};

export default Narrative;