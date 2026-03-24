"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import { useTeleprompterState } from "@/hooks/use-teleprompter-state";
import { type Locale, getLocalizedPath } from "@/lib/site";
import { cn } from "@/lib/utils";

import { PrompterPreview } from "./prompter-preview";

type TeleprompterWorkspaceProps = {
  locale: Locale;
  copy: LocalizedCopy;
  mode: "landing" | "reader";
};

type PlaybackState = "ready" | "playing" | "paused";

export function TeleprompterWorkspace({
  locale,
  copy,
  mode
}: TeleprompterWorkspaceProps) {
  const {
    state,
    setScript,
    setSpeed,
    setFontSize,
    setLineHeight,
    setTextWidth,
    toggleMirror,
    toggleReverse,
    setTheme
  } = useTeleprompterState();
  const [playbackState, setPlaybackState] = useState<PlaybackState>("ready");
  const [resetSignal, setResetSignal] = useState(0);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const readerStageRef = useRef<HTMLDivElement | null>(null);

  const readerPath = useMemo(
    () => getLocalizedPath(locale, "/teleprompter"),
    [locale]
  );
  const wordCount = useMemo(() => countWords(state.script), [state.script]);
  const estimatedReadingSeconds = useMemo(
    () => Math.round((wordCount / 130) * 60),
    [wordCount]
  );

  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === readerStageRef.current);
    };

    handleFullscreenChange();
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!state.script.trim()) {
      setPlaybackState("ready");
    }
  }, [state.script]);

  const mirrorDescription =
    locale === "es" ? "Volteo horizontal" : "Horizontal flip";
  const reverseDescription =
    locale === "es"
      ? "De abajo hacia arriba o al reves"
      : "Bottom-to-top or top-to-bottom";
  const themeDescription =
    locale === "es"
      ? "Ajusta la superficie del lector"
      : "Adjust the reader surface";

  const toolTheme =
    state.theme === "dark"
      ? {
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
        }
      : {
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

  const readerMetrics = [
    {
      label: copy.tool.wordCountLabel,
      value: wordCount.toLocaleString(locale === "es" ? "es-ES" : "en-US")
    },
    {
      label: copy.tool.readingTimeLabel,
      value: formatReadingTime(estimatedReadingSeconds, locale)
    }
  ];

  const statusLabel =
    playbackState === "playing"
      ? copy.tool.playing
      : playbackState === "paused"
        ? copy.tool.paused
        : copy.tool.ready;

  const handlePlay = () => {
    if (!state.script.trim()) {
      return;
    }

    setPlaybackState("playing");
  };

  const handlePause = () => {
    setPlaybackState("paused");
  };

  const handleStop = () => {
    setPlaybackState("ready");
    setResetSignal((value) => value + 1);
  };

  const handleResetPosition = () => {
    setResetSignal((value) => value + 1);
  };

  const handleToggleFullscreen = async () => {
    const stage = readerStageRef.current;

    if (!stage || !document.fullscreenEnabled) {
      return;
    }

    try {
      if (document.fullscreenElement === stage) {
        await document.exitFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      await stage.requestFullscreen();
    } catch {
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border shadow-panel",
        toolTheme.shell
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b px-6 py-4",
          toolTheme.section
        )}
      >
        <div>
          <div className="text-sm font-medium">{copy.tool.localBadge}</div>
          <div className={cn("text-sm", toolTheme.muted)}>
            {mode === "landing" ? copy.tool.previewHint : copy.tool.readerHint}
          </div>
        </div>
        <div
          className={cn(
            "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]",
            toolTheme.statusPill
          )}
        >
          {statusLabel}
        </div>
      </div>

      <div
        className={cn(
          "grid gap-0",
          mode === "landing"
            ? "xl:grid-cols-[0.96fr_1.08fr]"
            : "xl:grid-cols-[0.84fr_1.16fr]"
        )}
      >
        <section className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl leading-none">
                {copy.tool.editorTitle}
              </h2>
              <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                {copy.tool.localHint}
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {copy.localeLabel}
            </div>
          </div>

          <label className="space-y-3">
            <div className="text-sm font-medium">{copy.tool.scriptLabel}</div>
            <textarea
              value={state.script}
              onChange={(event) => setScript(event.target.value)}
              placeholder={copy.tool.scriptPlaceholder}
              className={cn(
                "min-h-[18rem] w-full rounded-[1.5rem] border px-4 py-4 text-base leading-7 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20",
                toolTheme.textarea
              )}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            {readerMetrics.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                theme={state.theme}
              />
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <RangeControl
              label={copy.tool.speedLabel}
              value={state.speed}
              min={20}
              max={160}
              onChange={setSpeed}
              formatValue={(value) => `${value} px/s`}
              theme={state.theme}
            />
            <RangeControl
              label={copy.tool.fontSizeLabel}
              value={state.fontSize}
              min={28}
              max={104}
              onChange={setFontSize}
              formatValue={(value) => `${value} px`}
              theme={state.theme}
            />
            <RangeControl
              label={copy.tool.lineHeightLabel}
              value={state.lineHeight}
              min={1.15}
              max={2.4}
              step={0.05}
              onChange={setLineHeight}
              formatValue={(value) => `${trimDecimal(value)}x`}
              theme={state.theme}
            />
            <RangeControl
              label={copy.tool.textWidthLabel}
              value={state.textWidth}
              min={42}
              max={100}
              onChange={setTextWidth}
              formatValue={(value) => `${value}%`}
              theme={state.theme}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <ToggleCard
              title={copy.tool.mirrorLabel}
              description={mirrorDescription}
              enabled={state.mirrored}
              onToggle={toggleMirror}
              theme={state.theme}
            />
            <ToggleCard
              title={copy.tool.reverseLabel}
              description={reverseDescription}
              enabled={state.reverse}
              onToggle={toggleReverse}
              theme={state.theme}
            />
            <div
              className={cn("rounded-[1.5rem] border p-4", toolTheme.card)}
            >
              <div className="text-sm font-medium">{copy.tool.themeLabel}</div>
              <div className={cn("mt-1 text-sm", toolTheme.muted)}>
                {themeDescription}
              </div>
              <div className="mt-4 inline-flex rounded-full border border-current/10 p-1">
                <ThemeButton
                  active={state.theme === "light"}
                  label={copy.tool.themeLight}
                  onClick={() => setTheme("light")}
                  activeClass={toolTheme.toggleActive}
                  idleClass={toolTheme.toggleIdle}
                />
                <ThemeButton
                  active={state.theme === "dark"}
                  label={copy.tool.themeDark}
                  onClick={() => setTheme("dark")}
                  activeClass={toolTheme.toggleActive}
                  idleClass={toolTheme.toggleIdle}
                />
              </div>
            </div>
          </div>

          {mode === "landing" ? (
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={readerPath}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition",
                  toolTheme.primaryButton
                )}
              >
                {copy.tool.openReader}
              </Link>
              <Link
                href={`${readerPath}#reader`}
                className={cn(
                  "inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition",
                  toolTheme.secondaryButton
                )}
              >
                {copy.home.readerCta}
              </Link>
            </div>
          ) : null}

          <p className={cn("text-sm leading-6", toolTheme.muted)}>
            {copy.tool.closeNote}
          </p>
        </section>

        <section
          id="reader"
          className={cn(
            "border-t p-6 md:p-8 xl:border-l xl:border-t-0",
            state.theme === "dark" ? "border-slate-800" : "border-slate-200"
          )}
        >
          <div
            ref={readerStageRef}
            className={cn(
              "space-y-5",
              isFullscreen &&
                (state.theme === "dark"
                  ? "flex min-h-screen flex-col bg-slate-950 p-4 md:p-6"
                  : "flex min-h-screen flex-col bg-white p-4 md:p-6")
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl leading-none">
                  {mode === "landing"
                    ? copy.tool.previewTitle
                    : copy.tool.readerTitle}
                </h2>
                <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                  {mode === "landing"
                    ? copy.tool.previewHint
                    : copy.tool.readerHint}
                </p>
              </div>
              <div
                className={cn(
                  "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]",
                  toolTheme.statusPill
                )}
              >
                {statusLabel}
              </div>
            </div>

            {mode === "reader" ? (
              <div
                className={cn(
                  "rounded-[1.5rem] border p-4",
                  toolTheme.cardMuted
                )}
              >
                <div className="flex flex-wrap gap-3">
                  <ActionButton
                    label={copy.tool.play}
                    onClick={handlePlay}
                    disabled={
                      !state.script.trim() || playbackState === "playing"
                    }
                    variant="primary"
                    theme={state.theme}
                  />
                  <ActionButton
                    label={copy.tool.pause}
                    onClick={handlePause}
                    disabled={playbackState !== "playing"}
                    variant="secondary"
                    theme={state.theme}
                  />
                  <ActionButton
                    label={copy.tool.stop}
                    onClick={handleStop}
                    disabled={playbackState === "ready"}
                    variant="danger"
                    theme={state.theme}
                  />
                  <ActionButton
                    label={copy.tool.reset}
                    onClick={handleResetPosition}
                    disabled={!state.script.trim()}
                    variant="ghost"
                    theme={state.theme}
                  />
                  {canFullscreen ? (
                    <ActionButton
                      label={
                        isFullscreen
                          ? copy.tool.exitFullscreen
                          : copy.tool.fullscreen
                      }
                      onClick={handleToggleFullscreen}
                      variant="secondary"
                      theme={state.theme}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className={cn(isFullscreen && "flex-1")}>
              <PrompterPreview
                compact={mode === "landing"}
                script={state.script}
                speed={state.speed}
                fontSize={state.fontSize}
                lineHeight={state.lineHeight}
                textWidth={state.textWidth}
                mirrored={state.mirrored}
                reverse={state.reverse}
                theme={state.theme}
                isPlaying={mode === "reader" && playbackState === "playing"}
                onPlayingChange={(value) =>
                  setPlaybackState(value ? "playing" : "paused")
                }
                onPlaybackComplete={() => setPlaybackState("ready")}
                resetSignal={resetSignal}
                isFullscreen={isFullscreen}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  theme: "light" | "dark";
  formatValue: (value: number) => string;
  step?: number;
};

function RangeControl({
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
  theme: "light" | "dark";
};

function MetricCard({ label, value, theme }: MetricCardProps) {
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
  theme: "light" | "dark";
};

function ToggleCard({
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

function ThemeButton({
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
  theme: "light" | "dark";
};

function ActionButton({
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

function countWords(script: string) {
  const normalized = script.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

function formatReadingTime(seconds: number, locale: Locale) {
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

function trimDecimal(value: number) {
  return value.toFixed(2).replace(/\.?0+$/, "");
}
