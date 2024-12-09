"use client"

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
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
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    if (isPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      setControlsTimeout(timeout);
    }
  };

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
      setShowControls(true);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      showControlsTemporarily();
    };
    const handlePause = () => {
      setIsPlaying(false);
      setShowControls(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, []);

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
      } else {
        setError(null);
        setIsEnded(false);
        try {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (playError) {
          if (isTouchDevice) {
            const playOnTouch = async () => {
              try {
                await videoRef.current?.play();
                document.removeEventListener('touchend', playOnTouch);
              } catch (e) {
                setError('Failed to play video on mobile');
              }
            };
            document.addEventListener('touchend', playOnTouch);
          } else {
            setError('Failed to play video');
          }
        }
      }
    } catch (e) {
      setError('Video playback error');
    }
  };

  const handleVideoClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPlaying) {
      showControlsTemporarily();
    } else {
      togglePlay(e);
    }
  };

  return (
    <div 
      className="relative w-full aspect-video rounded-lg overflow-hidden bg-black group"
      onMouseMove={showControlsTemporarily}
      onTouchStart={showControlsTemporarily}
    >
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
          <p>{error}</p>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        onClick={handleVideoClick}
        onTouchEnd={handleVideoClick}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Initial play button (center, only shows before first play) */}
      {!isPlaying && !isEnded && showControls && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-0 w-full h-full bg-black/30 hover:bg-black/40 rounded-none"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
        </Button>
      )}

      {/* Floating play/pause button (bottom right) */}
      {(isPlaying || isEnded) && showControls && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-opacity duration-300"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </Button>
      )}

      {thumbnails && thumbnails.length > 0 && isEnded && (
        <div className="absolute inset-0">
          <ThumbnailSlideshow thumbnails={thumbnails} />
        </div>
      )}
    </div>
  );
}
