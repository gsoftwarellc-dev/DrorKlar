type ServiceCardProps = {
  index: number;
  title: string;
  description: string;
};

/** One service tile. Numbered, hairline-bordered, lifts subtly on hover. */
export default function ServiceCard({
  index,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="group relative flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lift sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.14em] text-neutral-500 transition-colors duration-300 group-hover:text-black">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="translate-y-1 text-black opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path
              d="M4.5 11.5 11.5 4.5m0 0H5.75m5.75 0v5.75"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h3 className="mt-8 text-balance text-xl font-semibold leading-snug tracking-tight text-black">
        {title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral-600">
        {description}
      </p>
    </div>
  );
}
