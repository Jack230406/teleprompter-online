import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
  accentClassName?: string;
};

export function BrandMark({
  className,
  iconClassName,
  accentClassName
}: BrandMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white shadow-sm",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className={cn("h-5 w-5", iconClassName)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="14" y="16" width="28" height="5.5" rx="2.75" fill="currentColor" opacity="0.96" />
        <rect x="14" y="28.5" width="20" height="5.5" rx="2.75" fill="currentColor" opacity="0.92" />
        <rect x="14" y="41" width="28" height="5.5" rx="2.75" fill="currentColor" opacity="0.88" />
        <path
          d="M42 28.5L51 34L42 39.5V28.5Z"
          className={cn("fill-[#22c55e]", accentClassName)}
        />
      </svg>
    </span>
  );
}
