import React from 'react'

interface MusicVideo {
  Title: string;
  Director: string;
  Editor: string;
  Notes: string;
  documentId: string;
}

async function getMusicVideos() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/music-videos";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on set categories");

  const data = await res.json();
  return data;
}

const MusicVideos = async() => {
  const onSetCategories = await getMusicVideos();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Music Videos</h1>
      <ul>
        {onSetCategories.data.map((video: MusicVideo) => (
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

export default MusicVideos