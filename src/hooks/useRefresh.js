import { useEffect, useRef, useCallback } from "react";

export default (action, interval) => {
  const intervalRef = useRef(null);

  useEffect(() => {   
    window.addEventListener("focus", () => {
      // console.log("starting refresh");
      action();
      refresh();
    });

    window.addEventListener("blur", () => {
      // console.log("cancelling refresh");
      cancel();
    });

    return () => {
      window.removeEventListener("focus");
      window.removeEventListener("blur");
    };
  }, []);

  const refresh = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      // console.log("refreshing");
      action();
    }, interval);
  }, []);

  const cancel = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  });

  return { refresh, cancel };
};
