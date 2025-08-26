import Link from 'next/link';
import { useState } from 'react';

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Editing',
    path: '/narrative',
  },
  {
    name: 'On Set',
    path: '/on-set',
  },
  {
    name: 'Equipment',
    path: '/equipment',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative z-20">
      {/* Hamburger button - centered on mobile */}
      <div className="lg:hidden flex justify-center">
        <button
          className="btn btn-ghost"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
 
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#211814] w-full p-6 flex flex-col gap-2 mt-2 rounded-lg shadow-lg">
          {routes.map((route) => (
            <Link
              href={route.path}
              key={route.name}
              className="text-xl link-primary py-2 hover:bg-base-200 px-2 rounded transition-colors"
              onClick={() => setOpen(false)}
            >
              {route.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop menu */}
      <ul className="hidden lg:flex flex-row justify-between text-xl mt-8">
        {routes.map((route) => (
          <Link href={route.path} key={route.name} className="link-primary">
            {route.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}