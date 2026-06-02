import type { Metadata } from 'next';
import CreditsClient from './CreditsClient';

export const metadata: Metadata = {
  title: 'Credits',
  description: 'Full production credits for Toheed Chaudhry — editing, camera, and on-set roles across film and video projects.',
  openGraph: {
    title: 'Credits | Toheed Chaudhry',
    description: 'Full production credits for Toheed Chaudhry — editing, camera, and on-set roles across film and video projects.',
  },
};

type OnSet = {
  category: string;
  documentId: string;
  projects?: Project[];
};

type Project = {
  url?: string;
  title: string;
  length: string;
  description: string;
  accolades: string;
  additionalInfo?: string;
};

type SetData = {
  data: OnSet[];
};

async function getCredits(): Promise<SetData> {
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

    const path = '/api/onsets?sort=numberForOrder:asc';
    const url = new URL(path, baseUrl);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch credits data:', res.status);
      return { data: [] };
    }

    const data = await res.json();
    return data || { data: [] };
  } catch (error) {
    console.error('Error fetching credits:', error);
    return { data: [] };
  }
}

export default async function Credits() {
  const onset = await getCredits();

  return <CreditsClient onset={onset} />;
}
