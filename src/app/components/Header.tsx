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
    <header className="w-full h-56 flex items-center bg-[#211814] align-middle">
      <div className="lg:flex-row w-3/4 lg:w-2/3 mx-auto">
        <div className="navbar shadow-sm pl-0">
          <div className="lg:navbar-start navbar-center">
            <div className="flex flex-col mb-4 items-center sm:items-start">
              <p className="text-3xl lg:text-5xl font-bold">Toheed Chaudhry</p>
              <p className="text-xl lg:text-2xl font-bold">Editor | DIT | 2nd AC</p>
            </div>
            <div className="dropdown navbar-end">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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