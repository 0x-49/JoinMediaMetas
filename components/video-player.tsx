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

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);

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
    };
  }, [src]);

  // Handle play/pause with error handling
  const togglePlay = async () => {
    if (!videoRef.current || !canPlay) return;

    try {
      if (isPlaying) {
        await videoRef.current.pause();
      } else {
        // Reset error state when trying to play
        setError(null);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
      setIsPlaying(!isPlaying);
    } catch (e) {
      setError('Failed to play video');
      setIsPlaying(false);
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
          onClick={togglePlay}
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
        <div className="absolute inset-0 flex items-center justify-center">
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
              ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}
            `}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            disabled={!canPlay}
          >
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
            <div className="relative z-10">
              {isPlaying ? (
                <Pause className="h-10 w-10 drop-shadow-lg" />
              ) : (
                <div className="flex items-center justify-center w-10 h-10">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-full h-full fill-current"
                    style={{ 
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      transform: 'scale(1.2) translateX(2px)'
                    }}
                  >
                    <path d="M8 5.14v14.72L19 12 8 5.14z" />
                  </svg>
                </div>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
