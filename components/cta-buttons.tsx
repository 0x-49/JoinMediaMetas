'use client';

import { Button } from "@/components/ui/button";

interface CTAButtonsProps {
  cta1: string;
  cta2: string;
}

export function CTAButtons({ cta1, cta2 }: CTAButtonsProps) {
  const affiliateLink = 'https://whop.com/media-metas-f4/?a=digitalartlab';

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button 
        className="w-full text-[10px] sm:text-xs lg:text-sm font-medium px-2 sm:px-3 py-2 h-auto min-h-[36px] whitespace-normal text-center break-words leading-tight sm:leading-normal"
        onClick={() => window.open(affiliateLink, '_blank')}
      >
        {cta1}
      </Button>
      <Button 
        variant="outline" 
        className="w-full text-[10px] sm:text-xs lg:text-sm font-medium px-2 sm:px-3 py-2 h-auto min-h-[36px] whitespace-normal text-center break-words leading-tight sm:leading-normal"
        onClick={() => window.open(affiliateLink, '_blank')}
      >
        {cta2}
      </Button>
    </div>
  );
}
