"use client";

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsVisible(progress < 98); // Hide when near bottom
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center animate-bounce">
      <div className="bg-pink-500 dark:bg-pink-400 rounded-full p-2 shadow-lg cursor-pointer hover:bg-pink-600 dark:hover:bg-pink-500 transition-colors">
        <ChevronDown className="h-6 w-6 text-white" />
      </div>
      <span className="text-xs mt-1 text-gray-600 dark:text-gray-400 font-medium">
        Keep scrolling
      </span>
    </div>
  );
}
