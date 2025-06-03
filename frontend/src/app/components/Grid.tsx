"use client";
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';

const photos = [
  '/toheedcamera.png',
  '/coolcamera.png',
  '/actcasual.jpg',
  '/leaning.jpg',
  '/umbrella.jpg',
  '/carcamera.jpg',
  '/greenbackground.jpg',
  '/cat.png',
  '/scene.jpg'
]

const Grid: React.FC = () => {

  return (
    <div className="columns-2 md:columns-3 gap-3 w-full mb-6">
      {photos.map((photo: string, index) => (
        <div
          key={index}
          className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center"
        >
        <Image
            src={photo}
            alt={"Photo"}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto object-cover block"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;