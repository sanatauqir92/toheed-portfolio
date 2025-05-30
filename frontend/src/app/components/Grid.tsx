"use client";
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

type Photo  = {
  documentId: number; 
  url: string; 
  alternativeText: string;
}

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function generateImageUrl(url: string ) {
    const baseUrl = process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337";
    return `${baseUrl}${url}`;
  }

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl = process.env.STRAPI_API_URL ?? "http://127.0.0.1:1337";
        const path = "/api/grid?populate=*";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch grid data");
        const data = await res.json();
        const grid = data.data.grid.map((item: Photo) => ({
          alternativeText: item.alternativeText,
          url: generateImageUrl(item.url),
          documentId: item.documentId,
        }))
        setGrid(grid);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !grid) return <div>Error: {error ?? "No grid data"}</div>;

  return (
    <div className="columns-2 md:columns-3 gap-3 w-full mb-6">
      {grid.map((photo: Photo) => (
        <div
          key={photo.documentId}
          className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center"
        >
        <Image
            src={photo.url}
            alt={photo.alternativeText ?? "Photo"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;