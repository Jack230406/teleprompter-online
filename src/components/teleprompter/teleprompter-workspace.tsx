"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import { useTeleprompterState } from "@/hooks/use-teleprompter-state";
import { type Locale, getLocalizedToolPath } from "@/lib/site";
import { cn } from "@/lib/utils";

import { PrompterPreview } from "./prompter-preview";
import {
  ActionButton,
  MetricCard,
  RangeControl,
  ThemeButton,
  ToggleCard,
  countWords,
  formatReadingTime,
  getToolTheme,
  trimDecimal
} from "./teleprompter-ui";

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
    () => getLocalizedToolPath(locale),
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

  const toolTheme = getToolTheme(state.theme);

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
        "overflow-hidden rounded-[1.5rem] border shadow-panel sm:rounded-[2rem]",
        toolTheme.shell
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-2.5 border-b px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-4",
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
            "self-start rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] sm:self-auto sm:text-xs",
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
        <section className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <h2 className="font-display text-2xl leading-none sm:text-3xl">
                {copy.tool.editorTitle}
              </h2>
              <p className={cn("mt-1.5 text-sm leading-5 sm:mt-2 sm:leading-6", toolTheme.muted)}>
                {copy.tool.localHint}
              </p>
            </div>
            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
              {copy.localeLabel}
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start">
            <label className="space-y-2.5 sm:space-y-3">
              <div className="text-sm font-medium">{copy.tool.scriptLabel}</div>
              <textarea
                value={state.script}
                onChange={(event) => setScript(event.target.value)}
                placeholder={copy.tool.scriptPlaceholder}
                className={cn(
                  "min-h-[13rem] w-full rounded-[1.25rem] border px-3.5 py-3.5 text-[15px] leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 sm:min-h-[18rem] sm:rounded-[1.5rem] sm:px-4 sm:py-4 sm:text-base sm:leading-7",
                  toolTheme.textarea
                )}
              />
            </label>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-1">
              {readerMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  theme={state.theme}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4 md:p-5",
              toolTheme.cardMuted
            )}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 sm:mb-4">
              <div>
                <div className="text-sm font-medium">{copy.tool.controlsTitle}</div>
                <div className={cn("mt-1 text-sm leading-5 sm:leading-6", toolTheme.muted)}>
                  {copy.tool.speedLabel}, {copy.tool.fontSizeLabel}, {copy.tool.lineHeightLabel}, {copy.tool.textWidthLabel}
                </div>
              </div>
              <div
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] sm:text-xs",
                  toolTheme.statusPill
                )}
              >
                {statusLabel}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5">
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
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
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
              className={cn("rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4", toolTheme.card)}
            >
              <div className="text-sm font-medium">{copy.tool.themeLabel}</div>
              <div className={cn("mt-1 text-sm leading-5 sm:leading-6", toolTheme.muted)}>
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
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href={readerPath}
                className={cn(
                  "inline-flex items-center rounded-full px-4 py-2.5 text-xs font-medium transition sm:px-5 sm:py-3 sm:text-sm",
                  toolTheme.primaryButton
                )}
              >
                {copy.tool.openReader}
              </Link>
              <Link
                href={`${readerPath}#reader`}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2.5 text-xs font-medium transition sm:px-5 sm:py-3 sm:text-sm",
                  toolTheme.secondaryButton
                )}
              >
                {copy.home.readerCta}
              </Link>
            </div>
          ) : null}

          <p className={cn("text-sm leading-5 sm:leading-6", toolTheme.muted)}>
            {copy.tool.closeNote}
          </p>
        </section>

        <section
          id="reader"
          className={cn(
            "border-t p-4 sm:p-6 md:p-8 xl:border-l xl:border-t-0",
            state.theme === "dark" ? "border-slate-800" : "border-slate-200"
          )}
        >
          <div
            ref={readerStageRef}
            className={cn(
              "space-y-4 sm:space-y-5",
              isFullscreen &&
                (state.theme === "dark"
                  ? "flex min-h-screen flex-col bg-slate-950 p-4 md:p-6"
                  : "flex min-h-screen flex-col bg-white p-4 md:p-6")
            )}
          >
            <div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
              <div>
                <h2 className="font-display text-2xl leading-none sm:text-3xl">
                  {mode === "landing"
                    ? copy.tool.previewTitle
                    : copy.tool.readerTitle}
                </h2>
                <p className={cn("mt-1.5 text-sm leading-5 sm:mt-2 sm:leading-6", toolTheme.muted)}>
                  {mode === "landing"
                    ? copy.tool.previewHint
                    : copy.tool.readerHint}
                </p>
              </div>
              <div
                className={cn(
                  "self-start rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] sm:self-auto sm:text-xs",
                  toolTheme.statusPill
                )}
              >
                {statusLabel}
              </div>
            </div>

            {mode === "reader" ? (
              <div
                className={cn(
                  "rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4",
                  toolTheme.cardMuted
                )}
              >
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
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
                    <div className="col-span-2 sm:contents">
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
                    </div>
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
