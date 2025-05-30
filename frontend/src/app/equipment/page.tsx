"use client";
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

type Role = {
  Category: string;
  Items: {items:[]};
  Photo: {
    url: string;
    alternativeText: string;
  };
  documentId: string;
}

type EquipmentData = {
  data: [Role]
};


const Equipment: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl = process.env.STRAPI_API_URL;
        const path = "/api/equipments?populate=*";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch equipment data");
        const data = await res.json();
        setEquipment(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  function generateImageUrl(url: string ) {
    const baseUrl = process.env.STRAPI_API_URL;
    return `${baseUrl}${url}`;
  }

  if (loading) return <div>Loading...</div>;
  if (error || !equipment) return <div>Error: {error ?? "No Equipment data"}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Equipment</h1>
      <ul className="flex flex-col gap-4 md:flex-row">
        {equipment.data.map((role: Role) => (
          <li key={role.documentId} className="mt-4 lg:w-1/3">
            <Image src={generateImageUrl(role.Photo.url)} alt={role.Photo.alternativeText} 
              width={0}
              height={0}
              sizes="100vw"
              className="w-50 h-70 mb-2" />
            <p className="text-2xl">{role.Category}</p>
            {role.Items.items.map(item => (<p key={item}>- {item}</p>))}
          </li>))}
      </ul>
    </>
  )
}

export default Equipment