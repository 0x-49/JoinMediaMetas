"use client"

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

interface VimeoPlayerProps {
  videoId: string;
  thumbnails: string[];
  onPlayingChange?: (playing: boolean) => void;
}

declare global {
  interface Window {
    Vimeo?: {
      Player: any;
    };
  }
}

export default function VimeoPlayer({ videoId, thumbnails, onPlayingChange }: VimeoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  // Preload the iframe when the component mounts
  useEffect(() => {
    const preloadIframe = document.createElement('link');
    preloadIframe.rel = 'preload';
    preloadIframe.as = 'iframe';
    preloadIframe.href = `https://player.vimeo.com/video/${videoId}?api=1&background=0&autoplay=0&muted=0&controls=0`;
    document.head.appendChild(preloadIframe);

    return () => {
      document.head.removeChild(preloadIframe);
    };
  }, [videoId]);

  // Load Vimeo SDK
  useEffect(() => {
    if (window.Vimeo) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.id = 'vimeo-player-script';

    // Check if script already exists
    const existingScript = document.getElementById('vimeo-player-script');
    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      // Safely remove script if it exists and is a child of body
      const scriptToRemove = document.getElementById('vimeo-player-script');
      if (scriptToRemove && scriptToRemove.parentNode === document.body) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting && isPlaying) {
          handlePause();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  const initializePlayer = async () => {
    if (!iframeRef.current || !window.Vimeo || playerRef.current) return null;
    
    try {
      const player = new window.Vimeo.Player(iframeRef.current, {
        id: videoId,
        background: false,
        responsive: true,
        controls: false,
        autoplay: false,
        muted: false,
        loop: false,
        speed: true,
        quality: 'auto'
      });

      await player.ready();
      
      player.on('ended', () => {
        setIsPlaying(false);
        setShowThumbnail(true);
        onPlayingChange?.(false);
      });

      player.on('play', () => {
        // Only remove loading state and thumbnail after video is actually playing
        setTimeout(() => {
          setIsLoading(false);
          setShowThumbnail(false);
        }, 100); // Small delay to ensure video is visible
        setIsPlaying(true);
      });

      player.on('pause', () => {
        setIsPlaying(false);
        setIsLoading(false);
      });

      player.on('loaded', () => {
        // Don't clear loading here, wait for actual playback
      });

      player.on('error', () => {
        setIsLoading(false);
        setIsPlaying(false);
        setShowThumbnail(true);
      });

      playerRef.current = player;
      return player;
    } catch (error) {
      console.error("Error initializing player:", error);
      setIsLoading(false);
      return null;
    }
  };

  const handlePlay = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      let player = playerRef.current;
      if (!player) {
        player = await initializePlayer();
        if (!player) {
          setIsLoading(false);
          return;
        }
      }

      await player.play();
      setIsLoading(false);  
      onPlayingChange?.(true);
    } catch (error) {
      console.error("Error playing video:", error);
      setIsLoading(false);
      setIsPlaying(false);
      setShowThumbnail(true);
      onPlayingChange?.(false);
    }
  };

  const handlePause = async () => {
    if (!playerRef.current || isLoading) return;
    
    try {
      await playerRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
      setShowThumbnail(true);
      onPlayingChange?.(false);
    } catch (error) {
      console.error("Error pausing video:", error);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full cursor-pointer group"
      onClick={togglePlayPause}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePlayPause(e as any);
        }
      }}
    >
      {/* Thumbnail with lazy loading */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-300 ${showThumbnail ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <img
          src={thumbnails[0]}
          alt="Video thumbnail"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Video iframe */}
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?api=1&background=0&autoplay=0&muted=0&controls=0&quality=auto`}
          className={`w-full h-full transition-opacity duration-300 ${showThumbnail ? 'opacity-0' : 'opacity-100'}`}
          allow="autoplay; fullscreen; picture-in-picture"
          title="Vimeo video player"
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* Play/Pause Button Overlay */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-200
          ${isPlaying ? 'bg-black bg-opacity-0 hover:bg-opacity-30' : 'bg-black bg-opacity-30 hover:bg-opacity-40'}
          ${isLoading ? 'pointer-events-none' : ''}`}
      >
        <div className={`transform transition-all duration-200 ${isPlaying ? 'opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100' : 'opacity-100 scale-100'}`}>
          {isPlaying ? (
            <Pause className="w-16 h-16 text-white" />
          ) : (
            <Play className="w-16 h-16 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
