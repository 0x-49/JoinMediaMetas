"use client";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`
        fixed top-20 sm:top-24 right-4 sm:right-6 z-[40] 
        flex items-center gap-2 sm:gap-4 
        p-2 rounded-full bg-white/10 backdrop-blur 
        border border-white/20 shadow-lg
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'pr-4' : 'pr-2 hover:pr-4'}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ThemeToggle />
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-[72px] opacity-100' : 'w-0 opacity-0'}
        `}
      >
        <Button 
          variant="ghost" 
          size="sm"
          className="text-sm hover:bg-pink-500/10 whitespace-nowrap min-w-[72px]"
          onClick={() => window.open("https://whop.com/media-metas-f4/?a=digitalartlab", "_blank")}
        >
          Sign Up
        </Button>
      </div>
      <ChevronLeft 
        className={`
          w-4 h-4 transition-all duration-300
          ${isExpanded ? 'rotate-180' : ''}
          ${isExpanded ? 'opacity-50' : 'opacity-30'}
        `}
      />
    </div>
  );
}
