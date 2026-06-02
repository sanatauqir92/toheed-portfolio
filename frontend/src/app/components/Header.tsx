import Image from 'next/image';
import Navbar from './Navbar';

type ProfileData = {
  data: {
    instagram: string;
    letterboxd: string;
    email: string;
  };
};

async function getProfile(): Promise<ProfileData | null> {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    if (!baseUrl) return null;
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }
    const res = await fetch(
      new URL('/api/profile?populate=*', baseUrl).toString(),
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Header() {
  const profile = await getProfile();

  return (
    <header
      className="w-full bg-[#211814] shadow-lg"
      style={{ colorScheme: 'dark' }}
    >
      <div className="mx-auto pt-4 pb-2 lg:pt-10 lg:pb-0 w-9/10 lg:w-2/3 text-white">
        <div className="mb-3 text-center">
          <p className="text-3xl lg:text-5xl font-bold">Toheed Chaudhry</p>
          <p className="text-xl lg:text-2xl font-bold">Editor | DIT | 2nd AC</p>
          {profile?.data && (
            <div className="flex justify-center gap-3 mt-2 bg-white/5 rounded-lg w-max px-3 py-1 mx-auto">
              <a
                href={profile.data.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center"
              >
                <Image
                  src="/ig_icon.png"
                  width={22}
                  height={22}
                  alt="Instagram"
                />
              </a>
              <a
                href={profile.data.letterboxd}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Letterboxd"
                className="flex items-center justify-center"
              >
                <Image
                  src="/letterboxd_icon.png"
                  width={22}
                  height={22}
                  alt="Letterboxd"
                />
              </a>
            </div>
          )}
        </div>
        <Navbar />
      </div>
    </header>
  );
}
