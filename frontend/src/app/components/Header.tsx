"use client";
import Navbar from './Navbar';

export default function Header() {
  
  return (
    <header className="w-full h-48 lg:h-56 bg-[#211814]">
      <div className="mx-auto mt-12 lg:w-2/3">
        <div className="mb-4">
            <p className="text-3xl lg:text-5xl font-bold justify-self-center">Toheed Chaudhry</p>
            <p className="text-xl lg:text-2xl font-bold justify-self-center">Editor | DIT | 2nd AC</p>
        </div>
        <Navbar/>
      </div>
    </header>
  );
}