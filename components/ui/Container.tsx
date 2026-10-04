import type { ComponentProps, ElementType } from "react";

type Props<T extends ElementType> = { as?: T } & ComponentProps<T>;

export default function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: Props<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${className}`}
      {...props}
    />
  );
}
