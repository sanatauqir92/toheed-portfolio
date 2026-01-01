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
  try {
    let baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_STRAPI_API_URL is not defined, returning empty data');
      return { data: [] };
    }

    // Ensure baseUrl has a protocol
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }

    const path = '/api/narratives?sort=Order:asc';
    const url = new URL(path, baseUrl);

    const res = await fetch(url.toString(), {
      next: { revalidate: 1800 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch narrative data:', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data || { data: [] };
  } catch (error) {
    console.error('Error fetching narrative:', error);
    return { data: [] };
  }
}

export default async function Narrative() {
  const narrative = await getNarrative();

  return <NarrativeClient narrative={narrative} />;
}