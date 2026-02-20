import React, { useEffect, useRef } from 'react';
import './VideoTransition.css';

const VideoTransition = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Play video when component mounts
      video.play().catch(err => {
        console.log('Autoplay prevented:', err);
        // If autoplay fails, complete transition immediately
        setTimeout(() => onComplete(), 100);
      });
      
      // When video ends, call onComplete callback
      const handleEnded = () => {
        onComplete();
      };
      
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [onComplete]);

  return (
    <div className="video-transition-overlay">
      <video
        ref={videoRef}
        className="transition-video"
        autoPlay
        muted
        playsInline
      >
        <source src="/transition-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoTransition;
