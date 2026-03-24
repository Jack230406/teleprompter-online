import { type TeleprompterTheme } from "@/hooks/use-teleprompter-state";
import { type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ToolThemeClasses = {
  shell: string;
  muted: string;
  textarea: string;
  section: string;
  card: string;
  cardMuted: string;
  toggleActive: string;
  toggleIdle: string;
  primaryButton: string;
  secondaryButton: string;
  dangerButton: string;
  ghostButton: string;
  statusPill: string;
};

export function getToolTheme(theme: TeleprompterTheme): ToolThemeClasses {
  if (theme === "dark") {
    return {
      shell: "border-slate-800 bg-slate-950 text-slate-100",
      muted: "text-slate-400",
      textarea:
        "border-slate-800 bg-slate-900 text-slate-50 placeholder:text-slate-500",
      section: "border-slate-800 bg-slate-900/60",
      card: "border-slate-800 bg-slate-900",
      cardMuted: "border-slate-800 bg-slate-900/60",
      toggleActive: "bg-white text-slate-950",
      toggleIdle: "text-slate-400 hover:bg-slate-800 hover:text-white",
      primaryButton: "bg-white text-slate-950 hover:bg-slate-200",
      secondaryButton:
        "border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white",
      dangerButton:
        "border-amber-500/30 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20",
      ghostButton: "text-slate-300 hover:bg-slate-800 hover:text-white",
      statusPill: "border-slate-700 bg-slate-900 text-slate-200"
    };
  }

  return {
    shell: "border-slate-200 bg-white text-slate-900",
    muted: "text-slate-500",
    textarea:
      "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",
    section: "border-slate-200 bg-slate-50/80",
    card: "border-slate-200 bg-white",
    cardMuted: "border-slate-200 bg-slate-50/80",
    toggleActive: "bg-ink text-white",
    toggleIdle: "text-slate-500 hover:bg-slate-200 hover:text-slate-900",
    primaryButton: "bg-ink text-white hover:bg-slate-800",
    secondaryButton:
      "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900",
    dangerButton:
      "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100",
    ghostButton: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    statusPill: "border-slate-200 bg-white text-slate-600"
  };
}

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  theme: TeleprompterTheme;
  formatValue: (value: number) => string;
  step?: number;
};

export function RangeControl({
  label,
  value,
  min,
  max,
  onChange,
  theme,
  formatValue,
  step = 1
}: RangeControlProps) {
  return (
    <label
      className={cn(
        "rounded-[1.5rem] border p-4",
        theme === "dark"
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-slate-50"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-slate-500">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand"
      />
    </label>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  theme: TeleprompterTheme;
};

export function MetricCard({ label, value, theme }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.5rem] border p-4",
        theme === "dark"
          ? "border-slate-800 bg-slate-900"
          : "border-slate-200 bg-slate-50"
      )}
    >
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div className="mt-3 font-display text-3xl leading-none">{value}</div>
    </div>
  );
}

type ToggleCardProps = {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  theme: TeleprompterTheme;
};

export function ToggleCard({
  title,
  description,
  enabled,
  onToggle,
  theme
}: ToggleCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-[1.5rem] border p-4 text-left transition",
        theme === "dark"
          ? enabled
            ? "border-slate-700 bg-slate-800"
            : "border-slate-800 bg-slate-900 hover:border-slate-700"
          : enabled
            ? "border-brand bg-brand-soft"
            : "border-slate-200 bg-slate-50 hover:border-slate-300"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div
            className={cn(
              "mt-1 text-sm",
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            )}
          >
            {description}
          </div>
        </div>
        <div
          className={cn(
            "inline-flex h-7 w-12 items-center rounded-full p-1 transition",
            enabled
              ? "justify-end bg-ink"
              : theme === "dark"
                ? "justify-start bg-slate-700"
                : "justify-start bg-slate-300"
          )}
        >
          <span className="h-5 w-5 rounded-full bg-white" />
        </div>
      </div>
    </button>
  );
}

type ThemeButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  activeClass: string;
  idleClass: string;
};

export function ThemeButton({
  label,
  active,
  onClick,
  activeClass,
  idleClass
}: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active ? activeClass : idleClass
      )}
    >
      {label}
    </button>
  );
}

type ActionButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary" | "danger" | "ghost";
  theme: TeleprompterTheme;
};

export function ActionButton({
  label,
  onClick,
  disabled = false,
  variant,
  theme
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45",
        getActionButtonClass(variant, theme)
      )}
    >
      {label}
    </button>
  );
}

function getActionButtonClass(
  variant: ActionButtonProps["variant"],
  theme: ActionButtonProps["theme"]
) {
  if (variant === "primary") {
    return theme === "dark"
      ? "bg-white text-slate-950 hover:bg-slate-200"
      : "bg-ink text-white hover:bg-slate-800";
  }

  if (variant === "danger") {
    return theme === "dark"
      ? "border border-amber-500/30 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20"
      : "border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100";
  }

  if (variant === "ghost") {
    return theme === "dark"
      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";
  }

  return theme === "dark"
    ? "border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white"
    : "border border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900";
}

export function countWords(script: string) {
  const normalized = script.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

export function formatReadingTime(seconds: number, locale: Locale) {
  if (seconds <= 0) {
    return locale === "es" ? "0 min" : "0 min";
  }

  if (seconds < 60) {
    return locale === "es" ? "< 1 min" : "< 1 min";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  if (remainder === 0) {
    return `${minutes} min`;
  }

  return `${minutes}m ${remainder}s`;
}

export function trimDecimal(value: number) {
  return value.toFixed(2).replace(/\.?0+$/, "");
}
