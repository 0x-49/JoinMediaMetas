'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface ThumbnailSlideshowProps {
  thumbnails: string[];
  videoSrc?: string;
  className?: string;
}

const ThumbnailSlideshow = ({ thumbnails, videoSrc, className = '' }: ThumbnailSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getNextIndex = useCallback(() => {
    if (thumbnails.length <= 1) return currentIndex;

    let next;
    do {
      next = Math.floor(Math.random() * thumbnails.length);
    } while (next === currentIndex);

    return next;
  }, [currentIndex, thumbnails.length]);

  useEffect(() => {
    if (thumbnails.length <= 1 || isPlaying) return;

    const delay = Math.floor(Math.random() * 5500) + 2500;

    const timer = setTimeout(() => {
      const next = getNextIndex();
      setNextIndex(next);
      setIsSliding(true);

      setTimeout(() => {
        setCurrentIndex(next);
        setIsSliding(false);
      }, 500);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, thumbnails.length, getNextIndex, isPlaying]);

  const handleClick = () => {
    if (!videoRef.current || !videoSrc) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!thumbnails.length) return null;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
      style={{ aspectRatio: '736/1316' }}
    >
      {/* Thumbnail Images */}
      {!isPlaying && (
        <>
          <img
            src={thumbnails[currentIndex]}
            alt="Current thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isSliding ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={thumbnails[nextIndex]}
            alt="Next thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isSliding ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}

      {/* Video Player */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          loop
          playsInline
          controls
        />
      )}

      {/* Play/Pause Indicator */}
      {videoSrc && (
        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'} hover:opacity-100`}>
          <div className="text-white text-4xl">
            {isPlaying ? '⏸️' : '▶️'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSlideshow;
