import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse";
type Size = "md" | "lg";

/* Note: `inline-flex` is intentionally omitted here so callers can hide a button
   with `hidden` (or swap the display at a breakpoint) without a specificity
   fight. Display is applied via `defaultDisplay` below and can be overridden. */
const base =
  "items-center justify-center gap-2 rounded-lg font-medium tracking-tight " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "motion-safe:active:translate-y-px select-none";

/* Flat black / flat white only — the two brand colors inverted against each other. */
const variants: Record<Variant, string> = {
  // Black fill, white label. Hover lifts with a soft shadow.
  primary:
    "bg-black text-white border border-black shadow-soft " +
    "hover:bg-neutral-800 hover:shadow-lift hover:-translate-y-0.5 " +
    "focus-visible:outline-black",
  // White fill, black label, black hairline border.
  secondary:
    "bg-white text-black border border-neutral-300 " +
    "hover:border-black hover:shadow-soft hover:-translate-y-0.5 " +
    "focus-visible:outline-black",
  // For use on a black section: white fill, black label.
  inverse:
    "bg-white text-black border border-white " +
    "hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-lift " +
    "focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Fires on activation — e.g. closing the mobile menu after navigating. */
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;

  // Callers that pass their own display utility (e.g. "hidden lg:inline-flex")
  // opt out of the default so the two never collide.
  const setsDisplay = /(^|\s)(hidden|flex|inline-flex|block|inline-block)(\s|$)/.test(
    className,
  );
  const defaultDisplay = setsDisplay ? "" : "inline-flex";

  const classes = `${defaultDisplay} ${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Destructure the presentational props out so only genuine button
  // attributes are spread onto the element.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    variant: _variant,
    size: _size,
    href: _href,
    className: _className,
    children: _children,
    ...buttonAttributes
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return (
    <button className={classes} {...buttonAttributes}>
      {children}
    </button>
  );
}
