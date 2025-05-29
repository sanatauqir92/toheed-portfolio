import React from 'react'
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface MusicVideo {
  Title: string;
  Director: string;
  Editor: string;
  Notes: string;
  documentId: string;
}

async function getMusicVideos() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/music-videos?populate=*";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch music videos");

  const data = await res.json();
  return data;
}

const MusicVideo = async() => {
  const musicVideos = await getMusicVideos();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Music Videos</h1>
      <ul>
        {musicVideos.data.map((video: MusicVideo) => (
          <li key={video.documentId} className="mt-4">
            <p className="text-2xl">{video.Title}</p>
            <p className="text-xl">Director: {video.Director}</p>
            <p className="text-xl">Editor: {video.Editor}</p>
            <p className="text-lg">{video.Notes}</p>
          </li>))}
      </ul>
    </>
  )
}

export default MusicVideo