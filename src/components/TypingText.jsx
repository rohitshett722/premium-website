import { useEffect, useState } from "react";

export default function TypingText({
  text,
  speed = 30,
  delay = 0,
  className = "",
  onDone,
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i === text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onDone]);

  return <div className={className}>{displayed}</div>;
}
