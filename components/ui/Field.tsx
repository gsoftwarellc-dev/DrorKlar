import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-[0.9375rem] text-black " +
  "placeholder:text-neutral-500 transition-[border-color,box-shadow] duration-200 " +
  "focus:outline-none focus:border-black focus:ring-1 focus:ring-black " +
  "disabled:bg-neutral-50 disabled:text-neutral-500";

const controlBorder = (invalid?: boolean) =>
  invalid ? "border-black ring-1 ring-black" : "border-neutral-300 hover:border-neutral-400";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
};

export function FieldLabel({ htmlFor, children, required, optional }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8125rem] font-medium tracking-tight text-black"
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-black" aria-hidden="true">
          *
        </span>
      ) : null}
      {optional ? (
        /* neutral-500 keeps this legible at AA against white; lighter greys fail. */
        <span className="ml-1.5 font-normal text-black">(optional)</span>
      ) : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.8125rem] text-black">
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="10.75" r="0.75" fill="currentColor" />
      </svg>
      <span>{message}</span>
    </p>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function TextInput({ invalid, className = "", ...props }: TextInputProps) {
  return <input className={`${controlBase} ${controlBorder(invalid)} ${className}`} {...props} />;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export function Select({ invalid, className = "", children, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`${controlBase} ${controlBorder(invalid)} appearance-none pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
      >
        <path
          d="m4 6 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export function TextArea({ invalid, className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`${controlBase} ${controlBorder(invalid)} resize-y ${className}`}
      {...props}
    />
  );
}
