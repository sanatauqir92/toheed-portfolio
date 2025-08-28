'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion';
import ContentModal from '../components/ContentModal';

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
  const [contentOpen, setContentOpen] = useState(false);
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
                {[
                  'lovespellcake_1.jpg',
                  'lovespellcake_2.jpg',
                  'lovespellcake_3.jpg',
                ].map((img, idx) => (
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
      <div>
        <p className="text-3xl">OPTION #2 with or without Accordion</p>
        <div className="flex flex-row gap-1 w-full">
          <div className="p-4 bg-gradient-to-r from-[#311801] via-[#1b0d01] to-[#141414] text-white">
            <p className="text-xl">
              Love Spell Cake <i>2024</i>
            </p>
            <p className="text-lg">📽️ Directed by Toheed Chaudhry</p>
            <p className="text-lg">✂️ Edited by Sana Tauqir</p>
            <p className="text-lg">⭐️ All of Them</p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/7ZMfsTgxm0M?si=bid8k3CtFuEH8yGu"
            className="w-1/4 aspect-[16/9] block"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ minWidth: 0 }}
          ></iframe>
          <Image
            src="/stills/lg_lovespellcake_1.jpg"
            alt="Mock 1"
            width={640}
            height={360}
            className="w-1/4 aspect-[16/9] object-cover"
            sizes="25vw"
          />
          <Image
            src="/stills/lg_lovespellcake_2.jpg"
            alt="Mock 2"
            width={640}
            height={360}
            className="w-1/4 aspect-[16/9] object-cover"
            sizes="25vw"
          />
        </div>
        <div className="flex flex-row gap-1 w-full mt-4">
          <div className="p-4 bg-gradient-to-r from-[#311801] via-[#1b0d01] to-[#141414] text-white">
            <p className="text-xl">
              Love Spell Cake <i>2024</i>
            </p>
            <p className="text-lg">📽️ Directed by Toheed Chaudhry</p>
            <p className="text-lg">✂️ Edited by Sana Tauqir</p>
            <p className="text-lg">⭐️ All of Them</p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/7ZMfsTgxm0M?si=bid8k3CtFuEH8yGu"
            className="w-1/4 aspect-[16/9] block"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ minWidth: 0 }}
          ></iframe>
          <Image
            src="/stills/lg_lovespellcake_1.jpg"
            alt="Mock 1"
            width={640}
            height={360}
            className="w-1/4 aspect-[16/9] object-cover"
            sizes="25vw"
          />
          <Image
            src="/stills/lg_lovespellcake_2.jpg"
            alt="Mock 2"
            width={640}
            height={360}
            className="w-1/4 aspect-[16/9] object-cover"
            sizes="25vw"
          />
        </div>
      </div>
      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          imageUrl={`/stills/lg_${image}`}
          altText="Enlarged still"
        />
      )}
      <p className="text-3xl">OPTION #3 with Accordion</p>
      <div className="mt-8 space-y-4">
        {[
          {
            title: 'Narrative',
            content:
              'Narrative editing is the art of shaping story, emotion, and rhythm. It involves collaboration, creativity, and technical skill to bring a director’s vision to life.',
          },
          {
            title: 'Music Video',
            content:
              'Utilizing DaVinci Resolve, Premiere Pro, and After Effects, the workflow is streamlined for efficiency and creative flexibility. Cloud collaboration and AI-assisted editing are integrated for futuristic results.',
          },
          {
            title: 'Just For Fun ',
            content:
              'Open to new projects and creative partnerships. Reach out to discuss your narrative vision and how we can bring it to the screen together.',
          },
        ].map((accordion, idx) => (
          <Accordion key={idx} title={accordion.title}>
            <div className="flex flex-row mb-2">
              <button
                key="/stills/lg_lovespellcake_1.jpg"
                type="button"
                onClick={() => setContentOpen(true)}
                className="hover:cursor-pointer hover:opacity-55"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <p className="text-white">Love Spell Cake 2024</p>
                <Image
                  src="/stills/lg_lovespellcake_1.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Mock 1"
                  className="w-full"
                />
              </button>
              <button
                key="/stills/lg_lovespellcake_2.jpg"
                type="button"
                onClick={() => setContentOpen(true)}
                className="hover:cursor-pointer hover:opacity-55"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <p className="text-white">Different Movie 2024</p>
                <Image
                  src="/stills/lg_lovespellcake_2.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Mock 1"
                  className="w-full"
                />
              </button>
              <button
                key="/stills/lg_lovespellcake_3.jpg"
                type="button"
                onClick={() => setContentOpen(true)}
                className="hover:cursor-pointer hover:opacity-55"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <p className="text-white">The Best Movie 2024</p>
                <Image
                  src="/stills/lg_lovespellcake_3.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Mock 1"
                  className="w-full"
                />
              </button>
            </div>
          </Accordion>
        ))}
        {contentOpen && (
          <ContentModal
            isOpen={contentOpen}
            onClose={() => setContentOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Narrative;
