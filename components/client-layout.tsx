"use client";

import { useEffect, useState } from 'react';
import ScrollIndicator from './scroll-indicator';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import ThemeToggle from './theme-toggle';
import { Button } from "@/components/ui/button";
import { MobileMenu } from './mobile-menu';
import { usePathname } from 'next/navigation';

type ClientLayoutProps = {
  children: React.ReactNode;
};

export function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <div className="relative">
      <ScrollIndicator />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <span className="font-bold text-lg sm:text-xl mr-4 sm:mr-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MEDIA METAS
          </span>
          <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm font-medium">
            {menuItems.map(({ href, label }) => (
              <Link 
                key={href}
                href={href} 
                className={`transition-colors hover:text-foreground/80 whitespace-nowrap ${
                  pathname === href ? "text-foreground" : "text-foreground/60"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden sm:inline-flex text-xs sm:text-sm hover:bg-pink-500/10 whitespace-nowrap px-2 sm:px-4"
              onClick={() => window.open("https://whop.com/media-metas-f4/?a=digitalartlab", "_blank")}
            >
              Sign Up
            </Button>
            <MobileMenu />
          </div>
        </div>
      </header>

      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t">
          <div className="container py-8">
            <div className="flex flex-col items-center space-y-8">
              {/* Navigation Links */}
              <nav className="grid grid-cols-2 sm:flex sm:space-x-8 gap-4 text-sm font-medium">
                {menuItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Affiliate Disclaimer */}
              <div className="max-w-3xl text-center text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">⚠️ Affiliate Disclosure</p>
                <p>
                  This is an independent affiliate marketing website. We are not the official Media Metas website 
                  and are not directly affiliated with Media Metas or its parent company. This website serves as 
                  an informational guide. When you make a purchase through our affiliate links, we may receive a 
                  commission at no additional cost to you.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                <a href="https://www.tiktok.com/@mussy.02" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500">
                  <FaTiktok />
                </a>
                <a href="https://www.instagram.com/mussy.02/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@MussyMakesMoney" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pink-500">
                  <FaYoutube />
                </a>
              </div>

              {/* Links and Copyright */}
              <div className="text-center text-sm text-muted-foreground">
                <div className="flex justify-center space-x-4 mb-4">
                  <Link href="/privacy-policy" className="hover:text-primary whitespace-nowrap">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  {mounted && (
                    <p>{new Date().getFullYear()} | Independent Media Metas Affiliate Site</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
