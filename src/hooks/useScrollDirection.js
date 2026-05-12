import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const [show, setShow] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY = window.scrollY;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return show;
}
