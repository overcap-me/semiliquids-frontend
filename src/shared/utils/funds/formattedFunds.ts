import type {
  AccessorFundFormatted,
  ClassDetail,
  FundResponse,
} from "@/types/schema/funds";

/**
 * Explanation:
 *
 *
 */
export const formattedFunds = (
  funds: FundResponse[]
): AccessorFundFormatted[] => {
  return funds?.map((fund) => {
    const { classes, ...fundWithoutClasses } = fund;

    const [firstOfClass = null, ...otherClasses] = classes as ClassDetail[];

    const {
      name,
      abbreviation,
      asset_classes,
      strategies,
      industries,
      focuses,
      investment_types,
      ...fundWithoutNameAndAbbr
    } = fundWithoutClasses;

    return {
      ...firstOfClass,
      __fund: { ...fundWithoutClasses },

      classes: otherClasses?.map((cls) => ({
        ...cls,
        __fund: { ...fundWithoutNameAndAbbr, __name: name },
      })),
    };
  });
};
