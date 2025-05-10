import { useRef, useState, useEffect } from "react";

/**
 * Hook for working with audio notifications that solves problems on iOS devices
 * @param {string} soundUrl URL of the audio file
 * @returns {Object} Object with a method for playing sound
 */
export const useAudio = (soundUrl) => {
  const audioRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(soundUrl);

    // iOS requires user interaction
    const initAudio = () => {
      if (audioInitialized) {
        return;
      }

      document.removeEventListener("click", initAudio);
      document.removeEventListener("touchstart", initAudio);

      // Try to play and immediately stop for iOS initialization
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAudioInitialized(true);
        })
        .catch((err) => {
          console.log("Audio not initialized:", err);
          document.addEventListener("click", initAudio);
          document.addEventListener("touchstart", initAudio);
        });
    };

    if (!audioInitialized) {
      document.addEventListener("click", initAudio);
      document.addEventListener("touchstart", initAudio);
    }

    return () => {
      document.removeEventListener("click", initAudio);
      document.removeEventListener("touchstart", initAudio);
    };
  }, [soundUrl, audioInitialized]);

  const playSound = () => {
    if (audioRef.current && audioInitialized) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch((err) => {
        console.log("Playback error:", err);
      });
    }
  };

  return { playSound, isInitialized: audioInitialized };
};

export default useAudio;
