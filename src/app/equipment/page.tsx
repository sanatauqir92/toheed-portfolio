import React from 'react'

interface Role {
  category: string;
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
      <ul className="flex flex-col lg:flex-row">
        {equipmentCategories.data.map((role: Role) => (
          <li key={role.documentId} className="mt-4 lg:w-1/3">
            <p className="text-2xl">{role.category}</p>
            {role.Items.items.map(item => (<p key={item}>- {item}</p>))}
          </li>))}
      </ul>
    </>
  )
}

export default Equipment