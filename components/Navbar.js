"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "होम" },
    { href: "/events", label: "इवेंट्स" },
    { href: "/fariyaad", label: "फरियाद" },
    { href: "/manavadhikar", label: "मानवाधिकार" },
    { href: "/vividh", label: "विविध" },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Title Section */}
        <div className="text-center mb-4">
          <h1 className="text-white text-2xl lg:text-3xl font-bold tracking-wide drop-shadow-md">
            श्रुति नागवंशी
          </h1>
          <p className="text-slate-200 text-sm lg:text-base font-medium mt-1 tracking-wider">
            दबे-कुचले लोगों की मसीहा
          </p>
        </div>

        {/* Menu Section */}
        <div className="flex justify-between w-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-slate-600 hover:text-white hover:shadow-md hover:scale-105 ${
                isActive(item.href)
                  ? "bg-slate-700 text-white shadow-md border-b-2 border-slate-400"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
