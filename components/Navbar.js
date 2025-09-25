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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div className="text-left">
            <h1 className="text-white text-lg sm:text-xl font-bold tracking-wide drop-shadow-md">
              श्रुति नागवंशी
            </h1>
          </div>

          {/* Right: Navigation Items */}
          <div className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-slate-600 hover:text-white hover:shadow-md ${
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
      </div>
    </nav>
  );
}
