import { useEffect, useRef, MutableRefObject } from 'react';

export const useOnOutsideClick = (handleOutsideClick: () => void) => {
  const innerBorderRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const onClick = (event: MouseEvent) => {
    if (innerBorderRef.current && !innerBorderRef.current.contains(event.target as Node)) {
      handleOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return { innerBorderRef };
};
