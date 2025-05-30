'use client'
import React from 'react'
import { useEffect, useState } from 'react';

type MusicVideo = {
  Title: string;
  Director: string;
  Editor: string;
  Notes: string;
  documentId: string;
}

type VideoData = {
  data: [MusicVideo]
};


const MusicVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const path = "/api/music-videos?populate=*";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch music video data");
        const data = await res.json();
        setVideos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !videos) return <div>Error: {error ?? "No Music Video data"}</div>;


  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Music Videos</h1>
      <ul>
        {videos.data.map((video: MusicVideo) => (
          <li key={video.documentId} className="mt-4">
            <p className="text-2xl">{video.Title}</p>
            <p className="text-xl">📽️ Director: {video.Director}</p>
            <p className="text-xl">✏️ Editor: {video.Editor}</p>
            <p className="text-lg">{video.Notes}</p>
          </li>))}
      </ul>
    </>
  )
}

export default MusicVideos