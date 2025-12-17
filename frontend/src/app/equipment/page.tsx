import Image from 'next/image';
import React from 'react';

type Role = {
  Category: string;
  Items: { items: [] };
  documentId: string;
};

type EquipmentData = {
  data: Role[];
};

async function getEquipment(): Promise<EquipmentData | null> {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!baseUrl) {
      console.warn('NEXT_PUBLIC_STRAPI_API_URL is not defined');
      return null;
    }

    // Ensure baseUrl has a protocol
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }

    const path = '/api/equipments?populate=*';
    const url = new URL(path, baseUrl);

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch equipment data:', res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return null;
  }
}

const Equipment = async () => {
  const equipment = await getEquipment();

  if (!equipment || !equipment.data || equipment.data.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold uppercase">Equipment</h1>
        <p className="text-lg mt-4">No equipment data available.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold uppercase">Equipment</h1>
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div className="relative w-full h-48 md:w-1/3 md:h-64">
          <Image
            src="/allEquipment.jpg"
            alt="Equipment 1"
            fill={true}
            className="object-contain"
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
