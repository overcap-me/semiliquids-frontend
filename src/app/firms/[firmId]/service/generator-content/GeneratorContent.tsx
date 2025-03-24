import { Fragment, type FC } from "react";
import clsx from "clsx";
import { type EBackgroundColor, Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";
import { Typography } from "@/components/Typography";

import styles from "./GeneratorContent.module.css";
import type { FirmResponse } from "@/types/schema/firms";

// TODO: Implement GeneratorContent
type GeneratorContentProps = {
  content: FirmResponse;
  background?: Lowercase<keyof typeof EBackgroundColor>;

  schema?: Record<string, unknown>;
};

type ContentWithMainGoalProps = {} & GeneratorContentProps;

const Goal = ({ title, text }: { title: string; text: string }) => {
  return (
    <div>
      {title && (
        <Typography spacing="xxs" as="h2" color="accent">
          {title}
        </Typography>
      )}
      {text && (
        <Typography size="xs" as="p" color="primary-70">
          {text}
        </Typography>
      )}
    </div>
  );
};

const MainGoals = ({ content }) => {
  return (
    <div
      className={clsx(
        stylesLayout.Grid,
        stylesLayout.Grid__Col_3,
        stylesLayout.Gap_32
      )}
    >
      {content.features?.map((feature, index) => (
        <Goal
          key={`${feature.value}-${index}`}
          title={feature.value}
          text={feature.caption}
        />
      ))}
    </div>
  );
};

const ContentWithMainGoal: FC<ContentWithMainGoalProps> = ({ content }) => {
  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x80}>
      {/* TODO: might change styles */}
      <div
        className={clsx(
          stylesLayout.Grid,
          stylesLayout.JCSB,
          stylesLayout.AIC,
          stylesLayout.Grid__Col_2_content
        )}
      >
        <Typography as="div">
          {content?.name && (
            <Typography as="h2" spacing="xs">
              {content?.name}
            </Typography>
          )}

          {content?.overview && (
            <Typography as="p" color="primary-70">
              {content?.overview}
            </Typography>
          )}
        </Typography>

        <MainGoals content={content} />
      </div>
    </Wrapper>
  );
};

type ContentWithListProps = {
  mode: "ordered" | "unordered";
} & GeneratorContentProps;

const ContentWithList: FC<ContentWithListProps> = ({
  content,
  mode,
  background,
}) => {
  const List = mode === "ordered" ? "ol" : "ul";

  if (!content?.reasons?.items.length) {
    return null;
  }

  return (
    <Wrapper
      classNameContainer={clsx(
        stylesSpace.Spacing__Outer_80x80,
        stylesSpace.Spacing__Inner_64x72
      )}
      bg={background}
    >
      <Typography spacing="l" as="div">
        <Typography as="h2" spacing="xs">
          {content?.reasons?.title}
        </Typography>
        <Typography as="p" color="primary-70">
          {content?.reasons?.description}
        </Typography>
      </Typography>

      <List
        className={clsx(
          stylesLayout.Grid,
          stylesLayout.Grid__Col_3,
          stylesLayout.Gap_40,
          styles.list
        )}
      >
        {content?.reasons?.items.map((op, index) => (
          <li key={index}>
            <Typography spacing="xs" as="h3">
              {op.title}
            </Typography>
            <Typography color="primary-70" as="p">
              {op.text}
            </Typography>
          </li>
        ))}
      </List>
    </Wrapper>
  );
};

export const GeneratorContent: FC<GeneratorContentProps> = ({
  content,
  schema,
}) => {
  return (
    <Fragment>
      <ContentWithMainGoal content={content} />

      <ContentWithList
        content={content}
        mode="ordered"
        background="secondary"
      />
    </Fragment>
  );
};
