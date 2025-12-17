import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

type ProfileData = {
  data: {
    instagram: string;
    letterboxd: string;
    email: string;
  };
};

async function getProfile(): Promise<ProfileData> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const path = '/api/profile?populate=*';
  const url = new URL(path, baseUrl);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch profile data');
  }

  return res.json();
}

const Contact = async () => {
  const profile = await getProfile();

  return (
    <>
      <h1 className="text-3xl font-bold uppercase">Contact Me</h1>
      <div className="lg:flex lg:flex-row mt-4">
        <Image
          src="/toheed_profile.jpg"
          height={400}
          width={400}
          sizes="(max-width: 768px) 50vw, 25vw"
          alt="Profile picture"
          className="mb-4 w-1/2 md:w-1/4 h-auto"
        />
        <div className="lg:ml-6">
          <div className="flex flex-row">
            <Link
              href={profile.data.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/ig_icon.png"
                width={50}
                height={50}
                alt="Instagram profile"
              />
            </Link>
            <Link
              href={profile.data.letterboxd}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <Image
                src="/letterboxd_icon.png"
                width={50}
                height={50}
                alt="Letterboxd profile"
              />
            </Link>
          </div>
          <p className="mt-4">
            Email me at:{' '}
            <a href={`mailto:${profile.data.email}`}>{profile.data.email}</a>
          </p>
          <p className="mt-4">
            Located in the Orange County / Los Angeles Area
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
