import { BrandMark } from "./brand-mark";

type BrandWordmarkProps = {
  subtitle: string;
  size?: "sm" | "md";
};

export function BrandWordmark({ subtitle, size = "md" }: BrandWordmarkProps) {
  const isSmall = size === "sm";

  return (
    <div className="inline-flex items-center gap-3">
      <BrandMark
        className={isSmall ? "h-9 w-9 rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl" : "h-10 w-10 rounded-2xl"}
      />
      <div className="min-w-0">
        <div
          className={isSmall
            ? "truncate font-display text-xl leading-none text-ink sm:text-2xl"
            : "font-display text-2xl leading-none text-ink"}
        >
          Teleprompter Online
        </div>
        <div className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
