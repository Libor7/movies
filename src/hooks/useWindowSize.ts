import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const windowResizeHandler = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  return {
    isExtraSmall: windowWidth < 320,
    isSmall: windowWidth >= 320 && windowWidth < 480,
    isMedium: windowWidth >= 480 && windowWidth < 900,
    isLarge: windowWidth >= 900 && windowWidth < 1200,
    isExtraLarge: windowWidth >= 1200,
  };
};

export default useWindowSize;
