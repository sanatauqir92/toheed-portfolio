import Image from "next/image";

interface Photo {
  documentId: number; 
  url: string; 
  alternativeText: string;
}

interface GridResponse {
  data: {
    grid: Photo[];
  }
}
  

function generateImageUrl(url: string ) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  return `${baseUrl}${url}`;
}

async function getPhotos() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:1337";
  const path = "/api/grid?populate=*";

  const url = new URL(path, baseUrl);

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch grid photos");

  const data: GridResponse = await res.json();

  const grid: Photo[] = data.data.grid.map((item: any) => ({
      alternativeText: item.alternativeText,
      url: generateImageUrl(item.url),
      documentId: item.documentId,
    }))
  return grid;
}

async function Grid () {
    const photos = await getPhotos();

  return (
    <div className="columns-2 md:columns-3 gap-3 w-full mb-6">
      {photos.map((photo: Photo, idx: any) => (
        <div
          key={photo.documentId ?? idx}
          className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center"
        >
          <Image
            src={photo.url}
            alt={photo.alternativeText ?? "Photo"}
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