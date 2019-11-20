import { useEffect, useRef, useCallback } from 'react';
import { ipcRenderer } from 'electron';

export default (action, interval) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    ipcRenderer.on("app:focus", () => {
      // console.log("starting refresh");
      action();
      refresh();
    });

    ipcRenderer.on("app:blur", () => {
      // console.log("cancelling refresh");
      cancel();
    });

    return () => {
      ipcRenderer.removeListener("app:focus");
      ipcRenderer.removeListener("app:blur");
    }
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
}