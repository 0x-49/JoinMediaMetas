'use client';

import { Button } from "@/components/ui/button";

interface CTAButtonsProps {
  cta1: string;
  cta2: string;
}

export function CTAButtons({ cta1, cta2 }: CTAButtonsProps) {
  const affiliateLink = 'https://whop.com/media-metas-f4/?a=digitalartlab';

  return (
    <>
      <Button className="w-full" onClick={() => window.open(affiliateLink, '_blank')}>
        {cta1}
      </Button>
      <Button variant="outline" className="w-full" onClick={() => window.open(affiliateLink, '_blank')}>
        {cta2}
      </Button>
    </>
  );
}
