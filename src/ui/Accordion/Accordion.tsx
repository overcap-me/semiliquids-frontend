"use client";
import Arrow from "@/assets/icons/ArrowLeft.svg";
import { type ClassValue, clsx } from "clsx";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.css";
import { SIZE_PROPS } from "@/shared/lib/icons";

type TProps = {
  header: ReactNode;
  headerClassName?: ClassValue;
  bodyClassName?: ClassValue;
  children?: ReactNode;
  hiddenArrow?: boolean
};

export const Accordion: FC<TProps> = ({
  header,
  headerClassName,
  bodyClassName,
  children,
  hiddenArrow = false
}) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // For smooth transition

  const contentRef = useRef(null);

  const handleToggle = () => setActive((prev) => !prev);

  useEffect(() => {
    if (active) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // Wait for the height to be set, then allow the transition
      setTimeout(() => {
        setHeight("auto");
        setIsTransitioning(false);
      }, 300); // Match this time to the CSS transition duration
    } else {
      // Set height to the content's scrollHeight first before collapsing
      setIsTransitioning(true);
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // Use a slight delay before setting the height to 0 for smooth transition
      setTimeout(() => {
        setHeight(0);
        setIsTransitioning(false);
      }, 10); // Small delay to start collapsing
    }

    return () => { };
  }, [active]);

  return (
    <div className={styles.Accordion}>
      <button
        onClick={handleToggle}
        type="button"
        className={clsx(styles.Header, headerClassName)}
      >
        {header}
        <div hidden={hiddenArrow} className={styles.WrapperIcon}>
          <Arrow
            className={clsx(styles.Icon, {
              [styles.Active]: active,
            })}
            {...SIZE_PROPS}
          />
        </div>
      </button>
      <div
        className={styles.Content}
        style={{
          height: isTransitioning ? `${height}px` : height,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
        ref={contentRef}
      >
        <div className={clsx(styles.Body, bodyClassName)}>{children}</div>
      </div>
    </div>
  );
};
