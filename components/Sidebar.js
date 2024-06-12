"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  UsersIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "For You", path: "/foryou", icon: HeartIcon },
    { name: "Explore", path: "/explore", icon: SearchIcon },
    { name: "Friends", path: "/friends", icon: UsersIcon },
    { name: "Profile", path: "/profile", icon: UserIcon },
  ];

  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="p-4 font-bold text-xl">BizSocial</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                  pathname === item.path ? "bg-gray-200" : ""
                }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
