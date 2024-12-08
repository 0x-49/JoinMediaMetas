"use client";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function HeaderButtons() {
  return (
    <div className="fixed top-4 right-4 z-[100] flex items-center gap-4 p-2 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-lg">
      <ThemeToggle />
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-sm hover:bg-pink-500/10"
        onClick={() => window.open("https://whop.com/media-metas-f4/?a=digitalartlab", "_blank")}
      >
        Sign Up
      </Button>
    </div>
  );
}
