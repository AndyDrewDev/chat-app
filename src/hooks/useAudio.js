import { useRef, useState, useEffect } from "react";

/**
 * Хук для роботи з аудіо сповіщеннями, який вирішує проблеми на iOS пристроях
 * @param {string} soundUrl URL аудіофайлу
 * @returns {Object} Об'єкт з методом для відтворення звуку
 */
export const useAudio = (soundUrl) => {
  const audioRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Ініціалізація аудіо після завантаження компонента
  useEffect(() => {
    // Створити аудіо елемент один раз
    audioRef.current = new Audio(soundUrl);

    // Для iOS потрібна взаємодія користувача
    const initAudio = () => {
      // Спроба відтворити і одразу зупинити для ініціалізації на iOS
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setAudioInitialized(true);
        })
        .catch((err) => {
          console.log("Аудіо не ініціалізовано:", err);
        });

      // Видаляємо обробник після першої взаємодії
      document.removeEventListener("click", initAudio);
      document.removeEventListener("touchstart", initAudio);
    };

    // Додаємо обробники для подій користувача
    document.addEventListener("click", initAudio);
    document.addEventListener("touchstart", initAudio);

    return () => {
      // Очищаємо обробники при розмонтуванні
      document.removeEventListener("click", initAudio);
      document.removeEventListener("touchstart", initAudio);
    };
  }, [soundUrl]);

  // Функція для відтворення звуку
  const playSound = () => {
    if (audioRef.current && audioInitialized) {
      // Перезапускаємо аудіо перед відтворенням
      audioRef.current.currentTime = 0;

      // Відтворюємо звук і обробляємо помилки
      audioRef.current.play().catch((err) => {
        console.log("Помилка відтворення:", err);
      });
    }
  };

  return { playSound, isInitialized: audioInitialized };
};

export default useAudio;
