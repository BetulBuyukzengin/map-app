import Link from "next/link";

const navigations = [
  { id: 1, href: "/addLocation", title: "Add Location" },
  { id: 3, href: "/listLocations", title: "List Locations" },
  { id: 2, href: "/editLocation", title: "Edit Location" },
  { id: 4, href: "/routeCreate", title: "Route Create" },
];

function Navigation() {
  return (
    <nav className="z-10 text-base lg:text-xl w-full lg:w-auto">
      <ul className="flex flex-col lg:flex-row gap-5 lg:gap-16 items-center">
        {navigations.map((navigate) => (
          <li key={navigate.id}>
            <Link
              href={navigate.href}
              className=" hover:text-slate-300 text-slate-100 transition-colors text-2xl  font-serif"
            >
              {navigate.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
