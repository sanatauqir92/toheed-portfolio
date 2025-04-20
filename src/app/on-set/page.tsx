import React from 'react'

interface OnSet {
  Category: string;
  documentId: string;
}

async function getOnset() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/onsets";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on set categories");

  const data = await res.json();
  return data;
}

const OnSet = async() => {
  const onSetCategories = await getOnset();
  console.log(onSetCategories)

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">ON SET</h1>
      <ul>
        {onSetCategories.data.map((option: OnSet) => (<li key={option.documentId} className="text-2xl mt-2">{option.Category}</li>))}
      </ul>
    </>
  )
}

export default OnSet