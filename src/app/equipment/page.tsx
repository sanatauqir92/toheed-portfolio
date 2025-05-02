import React from 'react'

interface Role {
  Category: string;
  Items: {items:[]};
  documentId: string;
}

async function getEquipment() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/equipments";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on equipment");

  const data = await res.json();
  return data;
}


const Equipment = async() => {
  const equipmentCategories = await getEquipment();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">Equipment</h1>
      <ul>
        {equipmentCategories.data.map((role: Role) => (
          <li key={role.documentId} className="mt-4">
            <p className="text-2xl">{role.Category}</p>
            {role.Items.items.map(item => (<p>- {item}</p>))}
          </li>))}
      </ul>
    </>
  )
}

export default Equipment