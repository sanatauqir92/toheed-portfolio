import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

async function getProfile() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/profile?populate=*";

  const url = new URL(path, baseUrl);
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch profile data");
  const data = await res.json();

  return data;
}

const Contact = async () => {

  const profile = await getProfile();
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337"
  }${profile.data.image.url}`;

  return (
    <>
    <h1 className="text-4xl font-bold uppercase">Contact Me</h1>
    <div className="lg:flex lg:flex-row mt-4">
      <img
        src={imageUrl}
        alt="Profile picture"
        className="mb-4 w-1/4 h-1/4"/>
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
        <p className="mt-4">Email me at: <a href="mailto:toheedch2004@gmail.com">{profile.data.email}</a></p>
        <p className="mt-4">Located in the Orange County / Los Angeles Area</p>
      </div>
    </div>
    </>
  )
}

export default Contact