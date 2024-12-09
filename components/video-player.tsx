"use client"

import { useRef, useState, useEffect } from "react";
import { Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThumbnailSlideshow from "./thumbnail-slideshow";

interface VideoPlayerProps {
  src: string;
  thumbnails?: string[];
}

export default function VideoPlayer({ src, thumbnails = [] }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle video loading and errors
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setCanPlay(true);
    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      setError(target.error?.message || 'Error loading video');
      setCanPlay(false);
    };
    const handleStalled = () => setError('Video playback stalled');
    const handleWaiting = () => setCanPlay(false);
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', () => setIsPlaying(false));

    // Preload video metadata
    try {
      video.load();
    } catch (e) {
      setError('Failed to load video');
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [src]);

  // Handle play/pause with error handling
  const togglePlay = async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!videoRef.current || !canPlay) return;

    try {
      if (isPlaying) {
        await videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset error state and isEnded when trying to play
        setError(null);
        setIsEnded(false);
        try {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (playError) {
          // On mobile, we need to try playing on user interaction
          const playOnTouch = async () => {
            try {
              await videoRef.current?.play();
              setIsPlaying(true);
              document.removeEventListener('touchend', playOnTouch);
            } catch (e) {
              setError('Failed to play video on mobile');
            }
          };
          document.addEventListener('touchend', playOnTouch, { once: true });
        }
      }
    } catch (e) {
      setError('Failed to play video');
      setIsPlaying(false);
    }
  };

  // Handle touch events
  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isPlaying && !isEnded) {
      togglePlay(e);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: '736/1316' }}>
      {/* Fallback for browsers that don't support aspect-ratio */}
      <div className="pb-[178.8%]" /> 
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-lg"
          playsInline // iOS compatibility
          webkit-playsinline="true" // Older iOS compatibility
          x-webkit-airplay="allow" // AirPlay support
          preload="metadata" // Efficient loading
          controlsList="nodownload noremoteplayback" // Prevent download and remote playback
          disablePictureInPicture // Prevent picture-in-picture
          loop
          muted
          onTouchStart={handleTouch}
          onClick={(e) => togglePlay(e)}
        >
          {/* Multiple source formats for maximum compatibility */}
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          <p className="text-center p-4">
            Your browser doesn't support HTML5 video. Here is a{' '}
            <a href={src} target="_blank" rel="noopener noreferrer">
              link to the video
            </a>{' '}
            instead.
          </p>
        </video>

        {/* Show thumbnails when video is not playing */}
        {!isPlaying && thumbnails && thumbnails.length > 0 && (
          <div className="absolute inset-0">
            <ThumbnailSlideshow thumbnails={thumbnails} className="absolute inset-0" />
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-4 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Centered play/pause button */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className={`
              transition-all duration-300
              bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400
              hover:from-purple-700 hover:via-pink-600 hover:to-orange-500
              border-3 border-white/80
              text-white
              rounded-full
              w-20 h-20
              flex items-center justify-center
              hover:scale-110 transform transition-transform
              shadow-[0_0_30px_rgba(168,85,247,0.5)]
              hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]
              backdrop-blur-sm
              group
              overflow-hidden
              relative
              ${isPlaying || isEnded ? 'opacity-0 pointer-events-none touch-none' : 'opacity-100'}
              ${isTouchDevice ? 'hover:opacity-0' : ''}
            `}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay(e);
            }}
            disabled={!canPlay || error !== null}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
