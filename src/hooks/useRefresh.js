import { useEffect, useRef, useCallback } from "react";

export default (action, interval) => {
  const intervalRef = useRef(null);

  useEffect(() => {   
    window.addEventListener("focus", doAction);
    window.addEventListener("blur", cancel);

    return () => {
      window.removeEventListener("focus", doAction);
      window.removeEventListener("blur", cancel);
    };
  }, []);

  const doAction = () => {
    action();
    refresh();
  }

  const refresh = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      // console.log("refreshing");
      action();
    }, interval);
  }, [action, interval]);

  const cancel = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }

    // console.log("cancelling refresh");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [intervalRef]);

  return { refresh, cancel };
};
