"use client"

import { useState, useEffect } from 'react';

interface ThumbnailSlideshowProps {
  thumbnails: string[];
  isActive?: boolean;
  className?: string;
}

export default function ThumbnailSlideshow({ thumbnails, isActive = false, className }: ThumbnailSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive || thumbnails.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, thumbnails.length]);

  if (!thumbnails.length) {
    return null;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <img
        src={thumbnails[currentIndex]}
        alt={`Thumbnail ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
