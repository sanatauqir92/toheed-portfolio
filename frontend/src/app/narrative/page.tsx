'use client';
import { useEffect, useState } from 'react';
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
};

type NarrativeData = {
  data: [Job];
};

const Narrative: React.FC = () => {
  const [narrative, setNarrative] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNarrative();
  }, []);

  const openImage = (img: string) => {
    setOpen(true);
    setImage(img);
  };

  if (loading) return <div>Loading...</div>;
  if (error || !narrative)
    return <div>Error: {error ?? 'No Equipment data'}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold uppercase mb-4">Editing Work</h1>

      <ul className="md:flex gap-1 list-none p-0">
        {narrative.data.map((job: Job) => (
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
              <div className="flex flex-row mb-2">
                {['lovespellcake_1.jpg', 'lovespellcake_2.jpg', 'lovespellcake_3.jpg'].map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    className={`w-1/3 h-24 ${idx > 0 ? 'ml-1' : ''}`}
                    onClick={() => openImage(img)}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    <Image
                      src={`/stills/${img}`}
                      alt={`Mock ${idx + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full object-cover hover:cursor-pointer"
                    />
                  </button>
                ))}
                {/* <Image src="/stills/lovespellcake_1.jpg"             
                  width={0}
                  height={0}
                  sizes="100vw" 
                  alt="Mock 1" 
                  className="w-1/3 h-24" />
                <Image src="/stills/lovespellcake_2.jpg" 
                  alt="Mock 2"             
                  width={0}
                  height={0}
                  sizes="100vw" 
                  className="w-1/3 h-24 pl-1" />
                <Image src="/stills/lovespellcake_3.jpg" 
                  alt="Mock 3"             
                  width={0}
                  height={0}
                  sizes="100vw" 
                  className="w-1/3 h-24 pl-1" /> */}
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
      {open && <Modal isOpen={open} onClose={() => setOpen(false)} imageUrl={`/stills/lg_${image}`} altText="Enlarged still" />}
    </>
  );
};

export default Narrative;
