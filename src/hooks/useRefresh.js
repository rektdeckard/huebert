import { useEffect, useRef, useCallback } from "react";

export default (action, interval) => {
  const intervalRef = useRef(null);

  const refresh = useCallback(() => {
    if (intervalRef.current !== null) 
      return;

    action();
    intervalRef.current = setInterval(() => {
      console.log("refreshing");
      action();
    }, interval);
  }, [action, interval]);

  const cancel = useCallback(() => {
    if (intervalRef.current === null)
      return;

    console.log("cancelling refresh");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [intervalRef]);

  useEffect(() => {
    window.addEventListener("focus", refresh);
    window.addEventListener("blur", cancel);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("blur", cancel);
    };
  }, [refresh, cancel]);

  return [ refresh, cancel ];
};
