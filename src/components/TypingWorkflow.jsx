import { useState } from "react";

import { useEffect, useState } from "react";


function TypingText({
  text,
  delay = 0,
  speed = 30,
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
  }, [text, delay, speed, onDone]);

  return <div className={className}>{displayed}</div>;
}
