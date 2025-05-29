import React from 'react'
import { urlToHttpOptions } from 'url';
import onset from '../../../server/src/api/onset/controllers/onset';

interface OnSet {
  category: string;
  documentId: string;
  projects: {string: string};
}

async function getOnset() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/onsets?sort=numberForOrder:asc";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch on set categories");

  const data = await res.json();
  return data;
}

const OnSet = async() => {
  const onSetCategories = await getOnset();

  return (
    <>
      <h1 className="text-4xl font-bold uppercase">ON SET</h1>
      <ul className="flex flex-col lg:flex-row justify-between gap-2">
        {onSetCategories.data.map((option: OnSet) => (
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