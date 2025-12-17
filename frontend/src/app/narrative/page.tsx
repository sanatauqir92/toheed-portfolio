import NarrativeClient from './NarrativeClient';

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

async function getNarrative(): Promise<NarrativeData> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const path = '/api/narratives?sort=Order:asc';
  const url = new URL(path, baseUrl);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch narrative data');
  }

  return res.json();
}

export default async function Narrative() {
  const narrative = await getNarrative();

  return <NarrativeClient narrative={narrative} />;
}