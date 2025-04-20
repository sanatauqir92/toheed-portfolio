"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Narrative",
    path: "/narrative",
  },
  {
    name: "On Set",
    path: "/on-set",
  },
  {
    name: "Music Videos",
    path: "/music-videos",
  },
  {
    name: "Equipment",
    path: "/equipment",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Header() {
  
  return (
    <header className="w-full h-56 flex items-center bg-[#211814]">
      <div className="flex flex-row w-2/3 mx-auto my-0">
        <div className="navbar shadow-sm pl-0">
        <div className="navbar-start">
          <div className="flex flex-col">
            <p className="lg:text-6xl sm:text-lg font-bold">Toheed Chaudhry</p>
            <p className="lg:text-2xl sm:text-lg font-bold">Editor | DIT | 2nd AC</p>
          </div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {routes.map((route) => (
                <Link className="link-primary" href={route.path} key={route.name}>
                  {route.name} 
                </Link>
                ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-xl">
            {routes.map((route) => (
              <Link href={route.path} key={route.name} className="px-2 link-primary">
                {route.name} 
              </Link>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </header>
  );
}