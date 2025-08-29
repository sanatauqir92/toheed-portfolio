'use client';
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

type Role = {
  Category: string;
  Items: { items: [] };
  documentId: string;
};

type EquipmentData = {
  data: [Role];
};

const Equipment: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const path = '/api/equipments?populate=*';
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch equipment data');
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
  if (error || !equipment)
    return <div>Error: {error ?? 'No Equipment data'}</div>;

  return (
    <>
      <h1 className="text-3xl font-bold uppercase">Equipment</h1>
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div className="relative w-full h-48 md:w-1/3 md:h-64">
          <Image
            src="/allEquipment.jpg"
            alt="Equipment 1"
            fill={true}
            objectFit="contain"
          />
        </div>
        <ul className="flex flex-col gap-4">
          {equipment.data.map((role: Role) => (
            <li key={role.documentId}>
              <p className="text-2xl">{role.Category}</p>
              <div className="flex flex-row gap-2 flex-wrap">
                {role.Items.items.map((item) => (
                  <p
                    className="rounded-4xl bg-green-400 py-1 px-3 text-lg"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Equipment;
