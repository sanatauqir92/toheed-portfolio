"use client";
import React from 'react';
import { useEffect, useState } from 'react';

type Job = {
  Director: string;
  Editor: string;
  Title: string;
  Year: string;
  documentId: string;
  Accolades: string;
  Url: string;
}


type NarrativeData = {
  data: [Job]
};


const Narrative: React.FC = () => {
  const [narrative, setNarrative] = useState<NarrativeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNarrative = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const path = "/api/narratives?sort=Order:asc";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch narrative data");
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

  if (loading) return <div>Loading...</div>;
  if (error || !narrative) return <div>Error: {error ?? "No Equipment data"}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold uppercase mb-4">Narrative</h1>

      <ul className="md:flex gap-1 list-none p-0">
        {narrative.data.map((job: Job) => (
          <li key={job.documentId} className="flex-none w-full md:w-1/3 flex mb-4">
              <div className="w-full">
                {job.Url !== "" && (
                  <iframe
                    src={job.Url}
                    className="w-full aspect-video block mb-2"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
                <p className="text-xl">{job.Title} <i>{job.Year}</i></p>
                <p className="text-lg">📽️ Directed by {job.Director}</p>
                <p className="text-lg">✏️ {job.Editor}</p>
                <p className="text-lg">{job.Accolades}</p>
              </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Narrative