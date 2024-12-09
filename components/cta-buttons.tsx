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
        className="w-full text-xs sm:text-sm lg:text-base font-medium px-3 sm:px-4 py-2 h-auto min-h-[40px] whitespace-normal text-center break-words"
        onClick={() => window.open(affiliateLink, '_blank')}
      >
        {cta1}
      </Button>
      <Button 
        variant="outline" 
        className="w-full text-xs sm:text-sm lg:text-base font-medium px-3 sm:px-4 py-2 h-auto min-h-[40px] whitespace-normal text-center break-words"
        onClick={() => window.open(affiliateLink, '_blank')}
      >
        {cta2}
      </Button>
    </div>
  );
}
