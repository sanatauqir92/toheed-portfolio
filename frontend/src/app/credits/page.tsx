import CreditsClient from './CreditsClient';

type OnSet = {
  category: string;
  documentId: string;
  projects: Project[];
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
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const path = '/api/onsets?sort=numberForOrder:asc';
  const url = new URL(path, baseUrl);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch credits data');
  }

  return res.json();
}

export default async function Credits() {
  const onset = await getCredits();

  return <CreditsClient onset={onset} />;
}
