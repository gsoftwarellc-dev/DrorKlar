import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Shared max-width + responsive gutters, so every section aligns to one grid. */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
