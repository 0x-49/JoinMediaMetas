"use client"

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showPlayButton && (
        <button
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40"
          onClick={togglePlay}
        >
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
        </button>
      )}

      {!showPlayButton && !isPlaying && (
        <button
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center"
          onClick={togglePlay}
        >
          <Play className="w-5 h-5 text-white" />
        </button>
      )}

      {!showPlayButton && isPlaying && (
        <button
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={togglePlay}
        >
          <Pause className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}
