import Image from 'next/image';
import React from 'react'

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
  console.log(profile);
  const imageUrl = `${
    process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337"
  }${profile.data.image.url}`;

  return (
    <>
    <h1 className="text-4xl font-bold uppercase">Contact Me</h1>
    <div className="lg:flex lg:flex-row mt-4">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Profile picture"
        className="mb-4"/>
      <div className="lg:ml-6">
        <div className="flex flex-row">
          <Image
            src="/ig_icon.png"
            width={50}
            height={50}
            alt="Profile picture"/>
          <Image
            src="/letterboxd_icon.png"
            width={50}
            height={50}
            alt="Profile picture"
            className="ml-2"/>
          </div>
        <p className="mt-4">Email me at: <a href="mailto:toheedch2004@gmail.com">{profile.data.email}</a></p>
        <p className="mt-4">Located in the Orange County / Los Angeles Area</p>
      </div>
    </div>
    </>
  )
}

export default Contact