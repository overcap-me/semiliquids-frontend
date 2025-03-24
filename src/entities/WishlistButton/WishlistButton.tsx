"uce client";
import { useEffect, useState, type FC } from "react";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";

import styles from "./WishlistButton.module.css";

import InList from "@/assets/icons/wishlist/InList.svg";
import AddToList from "@/assets/icons/wishlist/AddToList.svg";
import RemoveFromList from "@/assets/icons/wishlist/RemoveFromList.svg";
import { type ClassValue, clsx } from "clsx";
import { useActionWishlist } from "./useActionWishlist";
import { TOOLTIP_ID } from "../TooltipProvider";
import type { ClassDetail } from "@/types/schema/funds";
import { SIZE_PROPS } from "@/shared/lib/icons";

type WishlistButtonProps = {
  mode: "minimal" | "regular";
  /**
   * The prop turn on
   * for remove action from my list
   *
   * Default is false
   */
  remove?: boolean;

  /**
   * Default is false
   */
  tooltip?: boolean;

  classDetails: ClassDetail;

  bg?: "accent-8";

  /**
   *
   * This function is used to remove the row from the table in favorites
   *
   */
  removeRow?: (id: string) => void;

  className?: ClassValue;
};

const DenotationTitle = {
  in: "in my list",
  add: "Add to My List",
  delete: "Delete from My List",
};

export const WishlistButton: FC<WishlistButtonProps> = ({
  mode,
  classDetails,
  tooltip = false,
  remove = false,
  removeRow,
  bg,
  className,
}) => {
  const [inWishlist, setInWishlist] = useState(classDetails?.in_wishlist);

  const classId = classDetails?.id;

  const handleWishlist = useActionWishlist(classId, inWishlist, remove);

  const handleChangeWishlist = (event) => {
    handleWishlist(event);

    /**
     * Case 1: This condition is used to remove the row from the table in favorites
     * Case 2: This condition is used to change the state of the button
     * Case 3: This condition is used to add the row to the table in fund by id
     */
    if (removeRow) {
      removeRow(classId);
    } else if (remove) {
      setInWishlist((prev) => !prev);
    } else if (!inWishlist) {
      setInWishlist((prev) => !prev);
    }
  };

  const tooltipOptions = tooltip
    ? {
        "data-tooltip-id": TOOLTIP_ID,
        "data-tooltip-content": inWishlist
          ? DenotationTitle.delete
          : DenotationTitle.add,
        "data-tooltip-place": "top",
      }
    : null;

  useEffect(() => {
    setInWishlist(classDetails?.in_wishlist);
  }, [setInWishlist, classDetails?.in_wishlist]);

  return (
    <ButtonOrLink
      asTag="button"
      className={clsx(
        styles.button,
        {
          [styles.regular]: mode === "regular",
          [styles.minimal]: mode === "minimal",
          [styles.accent8]: bg === "accent-8",
        },
        className
      )}
      onClick={handleChangeWishlist}
      {...tooltipOptions}
    >
      <span className={styles.icon}>
        {remove ? (
          inWishlist ? (
            <RemoveFromList {...SIZE_PROPS} />
          ) : (
            <AddToList {...SIZE_PROPS} />
          )
        ) : inWishlist ? (
          <InList {...SIZE_PROPS} />
        ) : (
          <AddToList {...SIZE_PROPS} />
        )}
      </span>

      {mode === "regular" && (
        <Typography
          fontFamily="manrope"
          fontWeight="800"
          textTransform="uppercase"
          as="h6"
        >
          {inWishlist ? DenotationTitle.in : DenotationTitle.add}
        </Typography>
      )}
    </ButtonOrLink>
  );
};
