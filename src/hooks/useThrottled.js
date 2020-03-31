import { useRef, useEffect, useCallback } from "react";

export default (callback, delay, dependencies = []) => {
  const throttleRef = useRef(false);
  const callbackRef = useRef(callback);

  // Update the callback to be used, if it ever changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    if (throttleRef.current) {
      console.log("too soon!")
      return;
    }

    console.log("OK!")
    throttleRef.current = true;
    callbackRef.current(...args);
    setTimeout(() => {
      console.log("resetting");
      throttleRef.current = false;
    }, delay);
  }, [delay, ...dependencies]);
};
