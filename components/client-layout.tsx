"use client";

import { useEffect, useState } from 'react';
import HeaderButtons from './header-buttons';
import ScrollIndicator from './scroll-indicator';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

type ClientLayoutProps = {
  children: React.ReactNode;
};

export function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <HeaderButtons />
      <ScrollIndicator />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <span className="font-bold text-xl mr-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            MEDIA METAS
          </span>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 whitespace-nowrap">
              Home
            </Link>
            <Link href="/features" className="transition-colors hover:text-foreground/80 whitespace-nowrap">
              Features
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80 whitespace-nowrap">
              Pricing
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end">
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
                <div className="mt-4 space-y-2">
                  <p>
                    <a 
                      href="https://whop.com/media-metas-f4/?a=digitalartlab" 
                      className="text-primary hover:underline whitespace-nowrap"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Official Media Metas Page on Whop.com
                    </a>
                  </p>
                  <p className="text-xs">
                    All trademarks, logos, and brand names are the property of their respective owners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
