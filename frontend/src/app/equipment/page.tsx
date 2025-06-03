"use client";
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

type Role = {
  Category: string;
  Items: {items:[]};
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
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
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

  if (loading) return <div>Loading...</div>;
  if (error || !equipment) return <div>Error: {error ?? "No Equipment data"}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Equipment</h1>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="flex">
          <Image
            src="/slatecut.png"
            alt="Equipment 1"
          height={150}
          width={200}
            className="rounded shadow"
          />
        </div>
        <div className="flex">
          <Image
            src="/laptop.png"
            alt="Equipment 2"
         height={150}
          width={200}
            className="rounded shadow"
          />
        </div>
      </div>
      <ul className="flex flex-col gap-4 md:flex-row">
        {equipment.data.map((role: Role) => (
          <li key={role.documentId} className="mt-4 lg:w-1/3">
            <p className="text-2xl">{role.Category}</p>
            {role.Items.items.map(item => (<p key={item}>- {item}</p>))}
          </li>))}
      </ul>
    </>
  )
}

export default Equipment