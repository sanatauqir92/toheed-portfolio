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
  const path = "/api/narratives?sort=Year:desc";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on equipment");

  const data = await res.json();
  return data;
}

const Narrative = async () => {
  const narrativeJobs = await getNarrative();
  console.log(narrativeJobs)

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Narrative</h1>
      <ul>
        {narrativeJobs.data.map((job: Job) => (
          <li key={job.documentId} className="mt-4">
            <p className="text-2xl">{job.Title} <i>{job.Year}</i></p>
            <p className="text-xl">Directed by {job.Director}</p>
            <p className="text-xl">{job.Editor}</p>
            <p className="text-xl">{job.Accolades}</p>
            {job.Url && <Link href={job.Url} target='_blank' className="link link-secondary">WATCH IT HERE</Link>}
          </li>))}
      </ul>
    </>
  )
}

export default Narrative