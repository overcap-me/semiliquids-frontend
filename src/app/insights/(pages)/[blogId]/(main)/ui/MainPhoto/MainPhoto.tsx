import type { FC } from "react";
import styles from "./MainPhoto.module.css";
import Image from "next/image";

type TProps = {
  media: unknown;
};

export const MainPhoto: FC<TProps> = ({ media }) => {
  if (!media?.url) {
    return null;
  }

  return (
    <div className={styles.PictureContainer}>
      <picture className={styles.Picture}>
        <Image className={styles.Image} width={600} height={400} src={media?.url} alt="" />
      </picture>
    </div>
  );
};
