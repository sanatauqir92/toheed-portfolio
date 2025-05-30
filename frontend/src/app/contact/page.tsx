"use client";
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
type ProfileData = {
  data: {
    image: { url: string };
    instagram: string;
    letterboxd: string;
    email: string;
  };
};

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const baseUrl = process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337";
        const path = "/api/profile?populate=*";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch profile data");
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !profile) return <div>Error: {error ?? "No profile data"}</div>;

  const imageUrl = `${process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337"}${profile.data.image.url}`;

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Contact Me</h1>
      <div className="lg:flex lg:flex-row mt-4">
        <Image
          src={imageUrl}
          height={0}
          width={0}
          sizes="100vw"
          alt="Profile picture"
          className="mb-4 w-1/2 md:w-1/4 md:h-1/4"
        />
        <div className="lg:ml-6">
          <div className="flex flex-row">
            <Link href={profile.data.instagram} target="_blank" rel="noopener noreferrer">
              <Image
                src="/ig_icon.png"
                width={50}
                height={50}
                alt="Instagram profile"
              />
            </Link>
            <Link href={profile.data.letterboxd} target="_blank" rel="noopener noreferrer" className="ml-2">
              <Image
                src="/letterboxd_icon.png"
                width={50}
                height={50}
                alt="Letterboxd profile"
              />
            </Link>
          </div>
          <p className="mt-4">Email me at: <a href={`mailto:${profile.data.email}`}>{profile.data.email}</a></p>
          <p className="mt-4">Located in the Orange County / Los Angeles Area</p>
        </div>
      </div>
    </>
  );
};

export default Contact