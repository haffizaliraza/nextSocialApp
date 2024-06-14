"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "For You", path: "/foryou", icon: FaHome },
    { name: "Following", path: "/following", icon: LuUsers },
    { name: "Explore", path: "/explore", icon: MdOutlineExplore },
    { name: "Profile", path: "/profile", icon: ImProfile },
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
                <item.icon className="mr-3" />
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
