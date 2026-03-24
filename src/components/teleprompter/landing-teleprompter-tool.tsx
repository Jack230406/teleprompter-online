"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import { type LandingPageEntry } from "@/content/landing-pages";
import { useTeleprompterState } from "@/hooks/use-teleprompter-state";
import { type Locale, getLocalizedPath } from "@/lib/site";
import { cn } from "@/lib/utils";

import { PrompterPreview } from "./prompter-preview";
import {
  ActionButton,
  MetricCard,
  RangeControl,
  countWords,
  formatReadingTime,
  getToolTheme,
  trimDecimal
} from "./teleprompter-ui";

type LandingTeleprompterToolProps = {
  locale: Locale;
  copy: LocalizedCopy;
  page: LandingPageEntry;
};

type PlaybackState = "ready" | "playing" | "paused";

export function LandingTeleprompterTool({
  locale,
  copy,
  page
}: LandingTeleprompterToolProps) {
  const {
    state,
    setScript,
    setSpeed,
    setFontSize,
    setLineHeight,
    setTextWidth,
    toggleMirror
  } = useTeleprompterState();
  const [playbackState, setPlaybackState] = useState<PlaybackState>("ready");
  const [resetSignal, setResetSignal] = useState(0);
  const readerPath = useMemo(
    () => getLocalizedPath(locale, "/teleprompter"),
    [locale]
  );
  const wordCount = useMemo(() => countWords(state.script), [state.script]);
  const estimatedReadingSeconds = useMemo(
    () => Math.round((wordCount / 130) * 60),
    [wordCount]
  );
  const toolTheme = getToolTheme(state.theme);

  useEffect(() => {
    if (!state.script.trim()) {
      setPlaybackState("ready");
    }
  }, [state.script]);

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

  const handleTogglePlayback = () => {
    if (!state.script.trim()) {
      return;
    }

    setPlaybackState((value) => (value === "playing" ? "paused" : "playing"));
  };

  const handleReset = () => {
    setPlaybackState("ready");
    setResetSignal((value) => value + 1);
  };

  const extraControl =
    page.tool.extraControl === "lineHeight" ? (
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
    ) : (
      <RangeControl
        label={copy.tool.textWidthLabel}
        value={state.textWidth}
        min={42}
        max={100}
        onChange={setTextWidth}
        formatValue={(value) => `${value}%`}
        theme={state.theme}
      />
    );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem] border shadow-panel",
        toolTheme.shell
      )}
    >
      <div
        className={cn(
          "flex items-start justify-between gap-4 border-b px-6 py-5",
          toolTheme.section
        )}
      >
        <div>
          <div className="text-sm font-medium">{copy.tool.localBadge}</div>
          <h2 className="mt-3 font-display text-4xl leading-none">
            {page.tool.title}
          </h2>
          <p className={cn("mt-3 text-sm leading-7", toolTheme.muted)}>
            {page.tool.description}
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

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap gap-2">
          {page.tool.points.map((point) => (
            <span
              key={point}
              className={cn(
                "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]",
                toolTheme.cardMuted,
                toolTheme.muted
              )}
            >
              {point}
            </span>
          ))}
        </div>

        <label className="space-y-3">
          <div className="text-sm font-medium">{copy.tool.scriptLabel}</div>
          <textarea
            value={state.script}
            onChange={(event) => setScript(event.target.value)}
            placeholder={copy.tool.scriptPlaceholder}
            className={cn(
              "min-h-[12rem] w-full rounded-[1.5rem] border px-4 py-4 text-base leading-7 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20",
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

        <div className="grid gap-4 lg:grid-cols-2">
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
          {extraControl}
          <button
            type="button"
            onClick={toggleMirror}
            className={cn(
              "rounded-[1.5rem] border p-4 text-left transition",
              toolTheme.card,
              state.mirrored
                ? state.theme === "dark"
                  ? "border-slate-700"
                  : "border-brand bg-brand-soft/60"
                : ""
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{copy.tool.mirrorLabel}</div>
                <div className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                  {locale === "es"
                    ? "Activa el espejo para cristal o rigs reflejados."
                    : "Flip the script for glass teleprompters or mirrored rigs."}
                </div>
              </div>
              <div
                className={cn(
                  "inline-flex h-7 w-12 items-center rounded-full p-1 transition",
                  state.mirrored
                    ? "justify-end bg-ink"
                    : state.theme === "dark"
                      ? "justify-start bg-slate-700"
                      : "justify-start bg-slate-300"
                )}
              >
                <span className="h-5 w-5 rounded-full bg-white" />
              </div>
            </div>
          </button>
        </div>

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
          <p className={cn("text-sm leading-6", toolTheme.muted)}>
            {copy.landing.stateNote}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "border-t px-6 py-5",
          state.theme === "dark" ? "border-slate-800" : "border-slate-200"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-display text-3xl leading-none">
              {copy.tool.previewTitle}
            </div>
            <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
              {copy.tool.previewHint}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton
              label={
                playbackState === "playing" ? copy.tool.pause : copy.tool.play
              }
              onClick={handleTogglePlayback}
              disabled={!state.script.trim()}
              variant="primary"
              theme={state.theme}
            />
            <ActionButton
              label={copy.tool.reset}
              onClick={handleReset}
              disabled={!state.script.trim()}
              variant="ghost"
              theme={state.theme}
            />
          </div>
        </div>

        <div className="mt-5">
          <PrompterPreview
            compact
            script={state.script}
            speed={state.speed}
            fontSize={state.fontSize}
            lineHeight={state.lineHeight}
            textWidth={state.textWidth}
            mirrored={state.mirrored}
            reverse={false}
            theme={state.theme}
            isPlaying={playbackState === "playing"}
            onPlayingChange={(value) =>
              setPlaybackState(value ? "playing" : "paused")
            }
            onPlaybackComplete={() => setPlaybackState("ready")}
            resetSignal={resetSignal}
          />
        </div>
      </div>
    </div>
  );
}
