import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Toheed Chaudhry — film editor based in the Orange County / Los Angeles area.',
  openGraph: {
    title: 'Contact | Toheed Chaudhry',
    description: 'Get in touch with Toheed Chaudhry — film editor based in the Orange County / Los Angeles area.',
  },
};

type ProfileData = {
  data: {
    instagram: string;
    letterboxd: string;
    email: string;
  };
};

async function getProfile(): Promise<ProfileData | null> {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    if (!baseUrl) return null;
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }
    const res = await fetch(new URL('/api/profile?populate=*', baseUrl).toString(), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const Contact = async () => {
  const profile = await getProfile();

  return (
    <>
      <h1 className="text-xl font-bold uppercase">Contact</h1>
      <div className="mt-3">
        {profile?.data?.email && (
          <p>
            Email: {' '}
            <a href={`mailto:${profile.data.email}`} className="hover:underline">
              {profile.data.email}
            </a>
          </p>
        )}
        <p>Location: Orange County / Los Angeles Area</p>
      </div>
      <ContactForm />
    </>
  );
};

export default Contact;
