"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: "/", label: "होम", color: "text-pink-500" },
    { href: "/events", label: "इवेंट्स", color: "text-yellow-400" },
    { href: "/fariyaad", label: "फरियाद", color: "text-green-400" },
    { href: "/manavadhikar", label: "मानवाधिकार", color: "text-purple-400" },
    { href: "/vividh", label: "विविध", color: "text-orange-400" },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`bg-gradient-to-r from-sky-700 to-sky-800 fixed top-0 left-0 right-0 z-50 shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top: Title and Tagline */}
        <div className="text-center mb-4">
          <h1 className="text-pink-600 text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-md">
            श्रुति नागवंशी
          </h1>
          <p className="text-amber-600 text-sm sm:text-base font-medium mt-1">
            मानवाधिकार कार्यकर्ता एवं समाजसेविका
          </p>
        </div>

        {/* Bottom: Navigation Items */}
        <div className="flex justify-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-sky-600 hover:shadow-md ${
                isActive(item.href)
                  ? `bg-sky-900 ${item.color} shadow-md border-b-2 border-sky-400`
                  : `${item.color} hover:scale-105`
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
