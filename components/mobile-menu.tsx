"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <div className="sm:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 p-0"
        onClick={toggleMenu}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-end py-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 p-0"
                onClick={toggleMenu}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center space-y-6 text-lg font-medium">
              {menuItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname === href ? "text-foreground" : "text-foreground/60"
                  }`}
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}
              <Button 
                variant="default"
                className="mt-4"
                onClick={() => {
                  window.open("https://whop.com/media-metas-f4/?a=digitalartlab", "_blank");
                  toggleMenu();
                }}
              >
                Sign Up
              </Button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
