"use client";
import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { hasData } from "@/utils/hasData";
import { clsx } from "clsx";
import { useFundContext } from "../contexts/FundProvider";
import { TextView } from "../ui/TextView";
import { Fragment } from "react";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { ROUTE_PATHS } from "@/shared/routes";

const OverviewPage = () => {
  const { data: fund } = useFundContext();

  return (
    <Fragment>
      <Wrapper classNameContainer={clsx(stylesSpace.Spacing__Outer_80x80)}>
        <div
          className={clsx(
            stylesLayout.Grid,
            stylesLayout.JCSB,
            stylesLayout.AIC,
            stylesLayout.Grid__Col_2_content,
          )}
        >
          <div>
            {fund?.manager?.name && (
              <Typography as="h2" spacing="xs">
                {fund?.manager.name}
              </Typography>
            )}

            {fund?.manager?.overview && (
              <Typography spacing="xs" as="p" color="primary-70">
                {fund.manager.overview}
              </Typography>
            )}

            {fund?.manager?.slug && <ButtonOrLink color="accent" underline="bottom" asTag="a" href={ROUTE_PATHS.FIRM_BY_ID.BASE(fund?.manager.slug)}>
              <Typography>
                More about the Firm
              </Typography>
            </ButtonOrLink>}


          </div>

          <div
            className={clsx(
              stylesLayout.Grid,
              stylesLayout.Grid__Col_3,
              stylesLayout.Gap_32,
            )}
          >
            {
              fund?.manager?.features?.map((feature) => (
                <div key={feature.value}>
                  <Typography spacing="xxs" as="h2" color="active">
                    {feature.value}
                  </Typography>
                  {feature?.caption && (
                    <Typography size="xs" as="p" color="primary-70">
                      {feature?.caption}
                    </Typography>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </Wrapper>

      <Wrapper bg={EBackgroundColor.Secondary} classNameContainer={clsx(stylesSpace.Spacing__Outer_80x80, stylesSpace.Spacing__Inner_64x72,)}>
        <div
          className={clsx(
            stylesLayout.Grid,
            stylesLayout.JCSB,
            stylesLayout.AIC,
            stylesLayout.Grid__Col_2_content,
          )}
        >
          <div>
            {fund?.name && (
              <Typography as="h2" spacing="xs">
                {fund?.name}
              </Typography>
            )}

            {fund?.overview && (
              <Typography as="p" color="primary-70">
                {fund.overview}
              </Typography>
            )}
          </div>

          <div
            className={clsx(
              stylesLayout.Grid,
              stylesLayout.Grid__Col_3,
              stylesLayout.Gap_32,
            )}
          >
            {
              fund?.features?.map((feature) => (
                <div key={feature.value}>
                  <Typography spacing="xxs" as="h2" color="accent">
                    {feature.value}
                  </Typography>
                  {feature?.caption && (
                    <Typography size="xs" as="p" color="primary-70">
                      {feature?.caption}
                    </Typography>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </Wrapper>

      {hasData(fund?.reasons?.items) && (
        <Wrapper
          classNameContainer={[
            stylesSpace.Spacing__Outer_80x80,
          ]}
        >
          {(fund?.reasons?.title || fund?.reasons?.description) && (
            <Typography spacing="l" as="div">
              <Typography as="h2" spacing="xs">
                {fund?.reasons?.title}
              </Typography>
              <Typography as="p" color="primary-70">
                {fund?.reasons?.description}
              </Typography>
            </Typography>
          )}

          <ol
            className={clsx(
              stylesLayout.Grid,
              stylesLayout.Grid__Col_3,
              stylesLayout.Gap_40,
            )}
          >
            {fund?.reasons?.items?.map((op, index) => (
              <li key={index}>
                <Typography spacing="xs" as="h3">
                  {op.title}
                </Typography>
                <Typography color="primary-70" as="p">
                  {op.text}
                </Typography>
              </li>
            ))}
          </ol>
        </Wrapper>
      )}

      <Wrapper classNameContainer={[stylesSpace.Spacing__Outer_80x80]}>
        <TextView
          content={fund?.considerations?.content}
          type={fund?.considerations?.type}
        />
      </Wrapper>
    </Fragment>
  );
};

export default OverviewPage;
