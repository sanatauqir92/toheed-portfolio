import Link from "next/link";

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


export default function Navbar () {
  return (
    <div>
      <div className="dropdown flex justify-center">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {routes.map((route) => (
          <Link href={route.path} key={route.name} className="px-2 link-primary">
            {route.name} 
          </Link>
        ))} 
        </ul>
      </div>
      <ul className="hidden lg:flex flex-row justify-between text-xl mt-8">
        {routes.map((route) => (
          <Link href={route.path} key={route.name} className="link-primary">
            {route.name} 
          </Link>
        ))}
      </ul>
    </div>
  )
}