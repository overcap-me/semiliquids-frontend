import { ButtonOrLink } from "@/components/ButtonOrLink";
import { type TagVariants, Typography } from "@/components/Typography";
import { toKebabCase } from "@/utils/toKebabCase";
import { Fragment, type FC } from "react";
import Image from 'next/image'

type TextViewProps = {
  content: unknown;
};

const renderElement = (item, index) => {
  switch (item.type) {
    case 'heading':
      return (
        <Typography
          key={index}
          id={toKebabCase(item?.content?.[0].text)}
          as={`h${item?.attrs?.level}` as TagVariants}
          className={item?.attrs?.class}
          // style={item?.attrs?.style}
          spacing="sm"
        >
          {item.content && item.content.map((child, i) => renderElement(child, i))}
        </Typography>
      );
    case 'paragraph':
      return (
        <Typography
          spacing="sm"
          as="p"
          key={index}
          className={item?.attrs?.class}
        // style={item?.attrs?.style}
        >
          {item?.content && item?.content?.map((child, i) => renderElement(child, i))}
        </Typography>
      );
    case 'text':
      let textContent = <Fragment key={index}>{item.text}</Fragment>;

      if (item.marks) {
        for (const mark of item.marks) {
          switch (mark.type) {
            case 'bold':
              textContent = <strong key={index}>{textContent}</strong>;
              break;
            case 'italic':
              textContent = <em key={index}>{textContent}</em>;
              break;
            case 'link':
              textContent = (
                <ButtonOrLink
                  color="accent"
                  asTag="a"
                  key={index}
                  href={mark.attrs?.href}
                  target={mark.attrs?.target || '_self'}
                  className={mark.attrs?.class}
                // style={mark.attrs?.style}
                >
                  {textContent}
                </ButtonOrLink>
              );
              break;
          }
        }
      }
      return textContent;
    case 'listItem':
      return (
        <li
          key={index}
          className={item?.attrs?.class}
        // style={item?.attrs?.style}
        >
          {item.content && item.content.map((child, i) => renderElement(child, i))}
        </li>
      );
    case 'bulletList':
      return (
        <ul
          key={index}
          className={item?.attrs?.class}
        // style={item?.attrs?.style}
        >
          {item.content && item.content.map((child, i) => renderElement(child, i))}
        </ul>
      );
    case 'orderedList':
      return (
        <ol
          key={index}
          className={item?.attrs?.class}
        // style={item?.attrs?.style}
        >
          {item.content && item.content.map((child, i) => renderElement(child, i))}
        </ol>
      );
    case "hardBreak":
      return <br key={index} />
    case "image":
      return (
        <Image
          key={index}
          src={item.attrs?.src}
          alt={item.attrs?.alt}
          width={item.attrs?.width}
          height={item.attrs?.height}
          className={item.attrs?.class}
        // style={item.attrs?.style}
        />
      );
    case "blockquote":
      return <blockquote key={index}>
        {item.content && item.content.map((child, i) => renderElement(child, i))}
      </blockquote>
    default:
      return null;
  }
};

export const TextView: FC<TextViewProps> = ({ content }) => {
  return <>{content && content?.map((item, index) => renderElement(item, index))}</>;
};
