import React from 'react'
import Link from 'next/link'

interface Job {
  Director: string;
  Editor: string;
  Title: string;
  Year: string;
  documentId: string;
  Accolades: string;
  Url: string;
}

async function getNarrative() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/narratives?sort=Order:asc";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on narrative jobs");

  const data = await res.json();
  return data;
}

const Narrative = async () => {
  const narrativeJobs = await getNarrative();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase mb-4">Narrative</h1>

      <ul className="md:flex gap-1 list-none p-0">
        {narrativeJobs.data.map((job: Job) => (
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