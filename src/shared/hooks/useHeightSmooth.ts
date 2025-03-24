import {
  type MutableRefObject,
  useEffect,
  useState,
} from "react";

interface UseHeightSmoothProps {
  ref: MutableRefObject<HTMLElement | null>;
  active: boolean;
  duration: number;
  scrollHeight?: number;
  cb?: (isOpen: boolean) => void;
}

export const useHeightSmooth = ({
  ref,
  active,
  duration,
  scrollHeight,
  cb,
}: UseHeightSmoothProps) => {
  const [height, setHeight] = useState<number | string>(0);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    element.style.transition = `height ${duration}ms ease-in-out`;

    if (active) {
      const contentHeight = scrollHeight ?? element.scrollHeight;
      setHeight(contentHeight);

      const timeoutId = setTimeout(() => {
        setHeight("auto");
        if (cb) cb(true);
      }, duration);

      return () => clearTimeout(timeoutId);
    } else {
      const contentHeight = scrollHeight ?? element.scrollHeight;
      setHeight(contentHeight);

      const timeoutId = setTimeout(() => {
        setHeight(0);
        if (cb) cb(false);
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [active, duration, ref, cb]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height =
        typeof height === "number" ? `${height}px` : height;
    }
  }, [height, ref]);
};
