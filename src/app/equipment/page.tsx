import React from 'react'

interface Role {
  Category: string;
  Items: {items:[]};
  Photo: {
    url: string;
    alternativeText: string;
  };
  documentId: string;
}

async function getEquipment() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/equipments?populate=*";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on equipment");

  const data = await res.json();

  return data;
}

function generateImageUrl(url: string ) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  return `${baseUrl}${url}`;
}

const Equipment = async() => {
  const equipmentCategories = await getEquipment();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Equipment</h1>
      <ul className="flex flex-col lg:flex-row">
        {equipmentCategories.data.map((role: Role) => (
          <li key={role.documentId} className="mt-4 lg:w-1/3">
            <img src={generateImageUrl(role.Photo.url)} alt={role.Photo.alternativeText} className="w-50 h-70 mb-2" />
            <p className="text-2xl">{role.Category}</p>
            {role.Items.items.map(item => (<p key={item}>- {item}</p>))}
          </li>))}
      </ul>
    </>
  )
}

export default Equipment