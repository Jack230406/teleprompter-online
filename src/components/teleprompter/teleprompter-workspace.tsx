"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import { type Locale, getLocalizedPath } from "@/lib/site";
import {
  useTeleprompterState
} from "@/hooks/use-teleprompter-state";
import { cn } from "@/lib/utils";

import { PrompterPreview } from "./prompter-preview";

type TeleprompterWorkspaceProps = {
  locale: Locale;
  copy: LocalizedCopy;
  mode: "landing" | "reader";
};

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
    toggleMirror,
    toggleReverse,
    setTheme
  } = useTeleprompterState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const readerPath = useMemo(
    () => getLocalizedPath(locale, "/teleprompter"),
    [locale]
  );

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
          toggleActive: "bg-white text-slate-950",
          toggleIdle: "text-slate-400 hover:bg-slate-800 hover:text-white"
        }
      : {
          shell: "border-slate-200 bg-white text-slate-900",
          muted: "text-slate-500",
          textarea:
            "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",
          section: "border-slate-200 bg-slate-50/80",
          toggleActive: "bg-ink text-white",
          toggleIdle: "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
        };

  const handleReset = () => {
    setIsPlaying(false);
    setResetSignal((value) => value + 1);
  };

  const handleTogglePlayback = () => {
    setIsPlaying((value) => !value);
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
        <div className="rounded-full border border-current/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">
          {isPlaying ? copy.tool.playing : copy.tool.ready}
        </div>
      </div>

      <div
        className={cn(
          "grid gap-0",
          mode === "landing" ? "xl:grid-cols-[0.98fr_1.1fr]" : "xl:grid-cols-[0.82fr_1.18fr]"
        )}
      >
        <section className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-center justify-between">
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

          <div className="grid gap-5 sm:grid-cols-2">
            <RangeControl
              label={copy.tool.speedLabel}
              value={state.speed}
              min={20}
              max={160}
              suffix=" px/s"
              onChange={(value) => setSpeed(value)}
              theme={state.theme}
            />
            <RangeControl
              label={copy.tool.fontSizeLabel}
              value={state.fontSize}
              min={28}
              max={104}
              suffix=" px"
              onChange={(value) => setFontSize(value)}
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
              className={cn(
                "rounded-[1.5rem] border p-4",
                state.theme === "dark"
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-slate-50"
              )}
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

          <div className="flex flex-wrap items-center gap-3">
            {mode === "landing" ? (
              <>
                <Link
                  href={readerPath}
                  className="inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {copy.tool.openReader}
                </Link>
                <Link
                  href={`${readerPath}#reader`}
                  className={cn(
                    "inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition",
                    state.theme === "dark"
                      ? "border-slate-700 text-slate-200 hover:border-slate-500"
                      : "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900"
                  )}
                >
                  {copy.home.readerCta}
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleTogglePlayback}
                  className="inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {isPlaying ? copy.tool.stop : copy.tool.start}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={cn(
                    "inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition",
                    state.theme === "dark"
                      ? "border-slate-700 text-slate-200 hover:border-slate-500"
                      : "border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900"
                  )}
                >
                  {copy.tool.reset}
                </button>
              </>
            )}
          </div>

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
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl leading-none">
                {mode === "landing" ? copy.tool.previewTitle : copy.tool.readerTitle}
              </h2>
              <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                {mode === "landing" ? copy.tool.previewHint : copy.tool.readerHint}
              </p>
            </div>
            {mode === "reader" ? (
              <div className="text-sm text-slate-500">
                {isPlaying ? copy.tool.playing : copy.tool.ready}
              </div>
            ) : null}
          </div>

          <PrompterPreview
            compact={mode === "landing"}
            script={state.script}
            speed={state.speed}
            fontSize={state.fontSize}
            mirrored={state.mirrored}
            reverse={state.reverse}
            theme={state.theme}
            isPlaying={mode === "reader" ? isPlaying : false}
            onPlayingChange={setIsPlaying}
            resetSignal={resetSignal}
          />
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
  suffix: string;
  onChange: (value: number) => void;
  theme: "light" | "dark";
};

function RangeControl({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
  theme
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
        <span className="text-sm text-slate-500">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand"
      />
    </label>
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
          <div className="mt-1 text-sm text-slate-500">{description}</div>
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
