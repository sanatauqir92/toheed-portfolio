import Image from 'next/image';
import React from 'react';

type Role = {
  Category: string;
  Items: { items: [] };
  documentId: string;
};

type EquipmentData = {
  data: [Role];
};

async function getEquipment(): Promise<EquipmentData> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const path = '/api/equipments?populate=*';
  const url = new URL(path, baseUrl);

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch equipment data');
  }

  return res.json();
}

const Equipment = async () => {
  const equipment = await getEquipment();

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
