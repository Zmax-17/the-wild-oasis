import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (
          ref.current &&
          !ref.current.contains(e.target)
        ) {
          handler();
        }
      }
      // By passing true as 3 arg, its allow listening events only on capturing phase (down on the DOM tree)
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener(
          "click",
          handleClick,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );
  return ref;
}