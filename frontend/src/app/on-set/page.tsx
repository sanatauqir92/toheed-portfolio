"use client";
import React from 'react'
import { useEffect, useState } from 'react';

type OnSet = {
  category: string;
  documentId: string;
  projects: {string: string};
}

type SetData = {
  data: [OnSet]
};

const OnSet: React.FC = () => {
  const [onset, setOnset] = useState<SetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const path = "/api/onsets?sort=numberForOrder:asc";
        const url = new URL(path, baseUrl);
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch on set data");
        const data = await res.json();
        setOnset(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !onset) return <div>Error: {error ?? "No On Set data"}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">ON SET</h1>
      <ul className="flex flex-col lg:flex-row justify-between gap-2">
        {onset.data.map((option: OnSet) => (
          <li key={option.documentId} className="text-3xl lg:1/3 mt-2 justify-between uppercase">{option.category}
          {option.projects && 
            <div className="flex flex-col text-lg gap-1">
              {Object.values(option.projects).map((value, index) => (
                <ul className="border-2 border-dotted p-4 mt-2 xl:h-40" key={index}>
                  <li className="font-bold text-wrap">{value[0]}</li>
                  <li>{value[1]}</li>
                  <li>{value[2]}</li>
                  <li className="font-bold">{value[3]}</li>
                </ul>
              ))}
            </div>}
          </li>))}
      </ul>
    </>
  )
}

export default OnSet