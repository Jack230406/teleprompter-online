"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import { useTeleprompterState } from "@/hooks/use-teleprompter-state";
import { type Locale } from "@/lib/site";
import { cn } from "@/lib/utils";

import { PrompterPreview } from "./prompter-preview";
import {
  ActionButton,
  MetricCard,
  RangeControl,
  ThemeButton,
  ToggleCard,
  countWords,
  estimateReadingSeconds,
  estimateWordsPerMinute,
  formatReadingTime,
  getToolTheme,
  trimDecimal
} from "./teleprompter-ui";

type TeleprompterWorkspaceProps = {
  locale: Locale;
  copy: LocalizedCopy;
};

type PlaybackState = "ready" | "playing" | "paused";

const SPEED_STEP = 6;
const FONT_SIZE_STEP = 4;

export function TeleprompterWorkspace({
  locale,
  copy
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
    toggleEyeLine,
    setTheme
  } = useTeleprompterState();
  const [playbackState, setPlaybackState] = useState<PlaybackState>("ready");
  const [resetSignal, setResetSignal] = useState(0);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const readerSectionRef = useRef<HTMLElement | null>(null);
  const readerStageRef = useRef<HTMLDivElement | null>(null);

  const wordCount = useMemo(() => countWords(state.script), [state.script]);
  const estimatedWordsPerMinute = useMemo(
    () => estimateWordsPerMinute(state.speed),
    [state.speed]
  );
  const estimatedReadingSeconds = useMemo(
    () => estimateReadingSeconds(wordCount, state.speed),
    [state.speed, wordCount]
  );
  const toolTheme = getToolTheme(state.theme);
  const isFocusMode = playbackState === "playing" || isFullscreen;

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
      setIsMobileControlsOpen(false);
    }
  }, [state.script]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.toggle("teleprompter-focus-mode", isFocusMode);
    body.classList.toggle("teleprompter-focus-mode", isFocusMode);

    return () => {
      root.classList.remove("teleprompter-focus-mode");
      body.classList.remove("teleprompter-focus-mode");
    };
  }, [isFocusMode]);

  const statusLabel =
    playbackState === "playing"
      ? copy.tool.playing
      : playbackState === "paused"
        ? copy.tool.paused
        : copy.tool.ready;

  const numberLocale = locale === "es" ? "es-ES" : "en-US";
  const mirrorDescription =
    locale === "es"
      ? "Volteo horizontal para rigs con cristal."
      : "Flip horizontally for beam-splitter glass rigs.";
  const reverseDescription =
    locale === "es"
      ? "Cambia la direccion del desplazamiento."
      : "Swap between top-down and bottom-up prompting.";
  const eyeLineDescription =
    locale === "es"
      ? "Muestra una guia sutil para mantener la mirada estable."
      : "Show a subtle guide band to keep your eye line steady.";
  const themeDescription =
    locale === "es"
      ? "Ajusta la superficie del lector."
      : "Adjust the reader surface.";
  const clearScriptLabel = locale === "es" ? "Limpiar guion" : "Clear script";
  const controlsMenuLabel = locale === "es" ? "Controles" : "Controls";
  const hideControlsLabel = locale === "es" ? "Ocultar" : "Hide";
  const controlsSheetTitle =
    locale === "es" ? "Controles del teleprompter" : "Teleprompter controls";
  const readingPaceHint =
    locale === "es"
      ? `Aprox. ${estimatedWordsPerMinute} ppm con esta velocidad`
      : `Approx. ${estimatedWordsPerMinute} wpm at this speed`;
  const keyboardHint =
    locale === "es"
      ? "Atajos: Espacio reproduce o pausa, ↑↓ cambia velocidad, +/- tamano, Esc restaura la interfaz."
      : "Shortcuts: Space plays or pauses, ↑↓ changes speed, +/- changes text size, Esc restores the interface.";
  const focusHint =
    locale === "es"
      ? "Pulsa Esc o toca un espacio vacio para recuperar la interfaz."
      : "Press Esc or tap empty space to restore the interface.";

  const readerMetrics = [
    {
      label: copy.tool.wordCountLabel,
      value: wordCount.toLocaleString(numberLocale),
      hint:
        locale === "es"
          ? "Actualizacion en tiempo real"
          : "Updates in real time"
    },
    {
      label: copy.tool.readingTimeLabel,
      value: formatReadingTime(estimatedReadingSeconds, locale),
      hint: readingPaceHint
    }
  ];

  const scrollReaderIntoView = () => {
    window.requestAnimationFrame(() => {
      readerSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  };

  const handlePlay = () => {
    if (!state.script.trim()) {
      return;
    }

    scrollReaderIntoView();
    setIsMobileControlsOpen(false);
    setPlaybackState("playing");
  };

  const handlePause = () => {
    setPlaybackState("paused");
  };

  const handleTogglePlayback = () => {
    if (playbackState === "playing") {
      handlePause();
      return;
    }

    handlePlay();
  };

  const handleStop = () => {
    setPlaybackState("ready");
    setResetSignal((value) => value + 1);
    setIsMobileControlsOpen(false);
  };

  const handleResetPosition = () => {
    setResetSignal((value) => value + 1);
  };

  const handleAdjustSpeed = (delta: number) => {
    setSpeed(state.speed + delta);
  };

  const handleAdjustFontSize = (delta: number) => {
    setFontSize(state.fontSize + delta);
  };

  const handleClearScript = () => {
    setScript("");
    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const restoreReaderChrome = async () => {
    setPlaybackState((currentState) =>
      currentState === "playing" ? "paused" : currentState
    );
    setIsMobileControlsOpen(false);

    const stage = readerStageRef.current;

    if (!stage || document.fullscreenElement !== stage) {
      return;
    }

    try {
      await document.exitFullscreen();
    } catch {
      setIsFullscreen(false);
    }
  };

  const handleToggleFullscreen = async () => {
    const stage = readerStageRef.current;

    if (!stage || !document.fullscreenEnabled) {
      return;
    }

    scrollReaderIntoView();

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

  useEffect(() => {
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const activeElement = document.activeElement;
      const isTextareaFocused = activeElement === textareaRef.current;

      if (event.key === "Escape") {
        if (isFocusMode || isMobileControlsOpen) {
          event.preventDefault();
          void restoreReaderChrome();
        }

        return;
      }

      if (isTextareaFocused) {
        return;
      }

      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLButtonElement ||
        activeElement instanceof HTMLSelectElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable)
      ) {
        return;
      }

      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        handleTogglePlayback();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        handleAdjustSpeed(SPEED_STEP);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        handleAdjustSpeed(-SPEED_STEP);
        return;
      }

      if (event.key === "+" || (event.key === "=" && event.shiftKey)) {
        event.preventDefault();
        handleAdjustFontSize(FONT_SIZE_STEP);
        return;
      }

      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        handleAdjustFontSize(-FONT_SIZE_STEP);
      }
    };

    window.addEventListener("keydown", handleGlobalKeydown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeydown);
    };
  }, [
    isFocusMode,
    isMobileControlsOpen,
    playbackState,
    state.fontSize,
    state.script,
    state.speed
  ]);

  const desktopControls = (
    <div className="hidden gap-4 md:grid">
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
              {copy.tool.speedLabel}, {copy.tool.fontSizeLabel}, {copy.tool.lineHeightLabel},{" "}
              {copy.tool.textWidthLabel}
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

        <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
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

      <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
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
        <ToggleCard
          title={locale === "es" ? "Guia visual" : "Eye-line guide"}
          description={eyeLineDescription}
          enabled={state.showEyeLine}
          onToggle={toggleEyeLine}
          theme={state.theme}
        />
      </div>

      <div
        className={cn(
          "rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4",
          toolTheme.card
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-sm font-medium">{copy.tool.themeLabel}</div>
            <div className={cn("mt-1 text-sm leading-5 sm:leading-6", toolTheme.muted)}>
              {themeDescription}
            </div>
          </div>
          <div className="inline-flex rounded-full border border-current/10 p-1">
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

      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4",
          toolTheme.cardMuted
        )}
      >
        <p className={cn("max-w-2xl text-sm leading-6", toolTheme.muted)}>
          {copy.tool.closeNote} {keyboardHint}
        </p>
        <ActionButton
          label={copy.tool.reset}
          onClick={handleResetPosition}
          disabled={!state.script.trim()}
          variant="ghost"
          theme={state.theme}
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-[1.5rem] border shadow-panel sm:rounded-[2rem]",
          toolTheme.shell
        )}
      >
        {!isFocusMode ? (
          <div
            className={cn(
              "flex flex-col items-start justify-between gap-2.5 border-b px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-4",
              toolTheme.section
            )}
          >
            <div>
              <div className="text-sm font-medium">{copy.tool.localBadge}</div>
              <div className={cn("text-sm", toolTheme.muted)}>
                {copy.tool.readerHint}
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
        ) : null}

        <div
          className={cn(
            "grid gap-0",
            isFocusMode ? "xl:grid-cols-1" : "xl:grid-cols-[0.96fr_1.04fr]"
          )}
        >
          {!isFocusMode ? (
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

              <div className="flex flex-wrap gap-2.5">
                <ActionButton
                  label={copy.tool.play}
                  onClick={handleTogglePlayback}
                  disabled={!state.script.trim()}
                  variant="primary"
                  theme={state.theme}
                  className="min-w-[8.5rem]"
                />
                <ActionButton
                  label={copy.tool.stop}
                  onClick={handleStop}
                  disabled={playbackState === "ready"}
                  variant="danger"
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
                <ActionButton
                  label={copy.tool.reset}
                  onClick={handleResetPosition}
                  disabled={!state.script.trim()}
                  variant="ghost"
                  theme={state.theme}
                />
                <button
                  type="button"
                  onClick={() => setIsMobileControlsOpen(true)}
                  className={cn(
                    "inline-flex items-center rounded-full border px-4 py-2.5 text-xs font-medium transition sm:text-sm md:hidden",
                    toolTheme.secondaryButton
                  )}
                >
                  {controlsMenuLabel}
                </button>
              </div>

              <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start">
                <label className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">{copy.tool.scriptLabel}</div>
                    <div className={cn("text-xs sm:text-sm", toolTheme.muted)}>
                      {keyboardHint}
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={state.script}
                      onChange={(event) => setScript(event.target.value)}
                      placeholder={copy.tool.scriptPlaceholder}
                      className={cn(
                        "min-h-[13rem] w-full rounded-[1.25rem] border px-3.5 py-3.5 pr-14 text-[15px] leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 sm:min-h-[18rem] sm:rounded-[1.5rem] sm:px-4 sm:py-4 sm:pr-16 sm:text-base sm:leading-7",
                        toolTheme.textarea
                      )}
                    />
                    <button
                      type="button"
                      aria-label={clearScriptLabel}
                      onClick={handleClearScript}
                      disabled={!state.script.trim()}
                      className={cn(
                        "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 sm:right-4 sm:top-4",
                        toolTheme.card
                      )}
                    >
                      <ClearIcon />
                    </button>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-1">
                  {readerMetrics.map((metric) => (
                    <MetricCard
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      hint={metric.hint}
                      theme={state.theme}
                    />
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "rounded-[1.25rem] border p-3.5 md:hidden",
                  toolTheme.cardMuted
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{copy.tool.controlsTitle}</div>
                    <div className={cn("mt-1 text-sm leading-5", toolTheme.muted)}>
                      {copy.tool.speedLabel}: {state.speed} px/s · {copy.tool.fontSizeLabel}:{" "}
                      {state.fontSize}px
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileControlsOpen(true)}
                    className={cn(
                      "inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition",
                      toolTheme.secondaryButton
                    )}
                  >
                    {controlsMenuLabel}
                  </button>
                </div>
              </div>

              {desktopControls}
            </section>
          ) : null}

          <section
            ref={readerSectionRef}
            id="reader"
            className={cn(
              "p-4 sm:p-6 md:p-8",
              !isFocusMode &&
                (state.theme === "dark"
                  ? "border-t border-slate-800 xl:border-l xl:border-t-0"
                  : "border-t border-slate-200 xl:border-l xl:border-t-0")
            )}
          >
            <div
              ref={readerStageRef}
              className={cn(
                "relative space-y-4 sm:space-y-5",
                isFullscreen &&
                  (state.theme === "dark"
                    ? "flex min-h-screen flex-col bg-slate-950 p-4 md:p-6"
                    : "flex min-h-screen flex-col bg-white p-4 md:p-6")
              )}
            >
              {!isFocusMode ? (
                <div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <div>
                    <h2 className="font-display text-2xl leading-none sm:text-3xl">
                      {copy.tool.readerTitle}
                    </h2>
                    <p className={cn("mt-1.5 text-sm leading-5 sm:mt-2 sm:leading-6", toolTheme.muted)}>
                      {copy.tool.readerHint}
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
              ) : (
                <p className={cn("hidden text-sm md:block", toolTheme.muted)}>
                  {focusHint}
                </p>
              )}

              <div className={cn("relative", isFullscreen && "flex flex-1")}>
                {isFocusMode ? (
                  <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 hidden justify-center px-6 md:flex">
                    <div
                      className={cn(
                        "pointer-events-auto flex items-center gap-2 rounded-full border px-3 py-2 shadow-2xl backdrop-blur-xl",
                        state.theme === "dark"
                          ? "border-slate-700 bg-slate-950/88 text-slate-100"
                          : "border-white/80 bg-white/88 text-slate-900"
                      )}
                    >
                      <FloatingButton
                        label={playbackState === "playing" ? copy.tool.pause : copy.tool.play}
                        onClick={handleTogglePlayback}
                        emphasized
                      />
                      <FloatingButton
                        label="-"
                        onClick={() => handleAdjustSpeed(-SPEED_STEP)}
                      />
                      <div className="min-w-[5.5rem] text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                        {state.speed} px/s
                      </div>
                      <FloatingButton
                        label="+"
                        onClick={() => handleAdjustSpeed(SPEED_STEP)}
                      />
                      <FloatingButton
                        label={copy.tool.stop}
                        onClick={handleStop}
                      />
                      {canFullscreen ? (
                        <FloatingButton
                          label={
                            isFullscreen
                              ? copy.tool.exitFullscreen
                              : copy.tool.fullscreen
                          }
                          onClick={handleToggleFullscreen}
                        />
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {isFocusMode ? (
                  <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-[1.25rem] border px-4 py-3 shadow-2xl backdrop-blur-xl",
                        state.theme === "dark"
                          ? "border-slate-700 bg-slate-950/88 text-slate-100"
                          : "border-white/80 bg-white/92 text-slate-900"
                      )}
                    >
                      <button
                        type="button"
                        onClick={handleTogglePlayback}
                        className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-xs font-medium text-white"
                      >
                        {playbackState === "playing" ? copy.tool.pause : copy.tool.play}
                      </button>
                      <div className="text-center text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                        {state.speed} px/s
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMobileControlsOpen(true)}
                        className={cn(
                          "inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium transition",
                          toolTheme.secondaryButton
                        )}
                      >
                        {controlsMenuLabel}
                      </button>
                    </div>
                  </div>
                ) : null}

                <PrompterPreview
                  script={state.script}
                  speed={state.speed}
                  fontSize={state.fontSize}
                  lineHeight={state.lineHeight}
                  textWidth={state.textWidth}
                  mirrored={state.mirrored}
                  reverse={state.reverse}
                  theme={state.theme}
                  isPlaying={playbackState === "playing"}
                  onPlayingChange={(value) =>
                    setPlaybackState(value ? "playing" : "paused")
                  }
                  onPlaybackComplete={() => setPlaybackState("ready")}
                  resetSignal={resetSignal}
                  isFullscreen={isFullscreen}
                  focusMode={isFocusMode}
                  showEyeLine={state.showEyeLine}
                  onBlankAreaClick={isFocusMode ? () => void restoreReaderChrome() : undefined}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {isMobileControlsOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label={hideControlsLabel}
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setIsMobileControlsOpen(false)}
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] border px-4 pb-6 pt-4 shadow-2xl",
              toolTheme.shell
            )}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-current/10" />

            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-2xl leading-none">
                  {controlsSheetTitle}
                </div>
                <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                  {keyboardHint}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileControlsOpen(false)}
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                  toolTheme.card
                )}
              >
                <ClearIcon />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                {readerMetrics.map((metric) => (
                  <MetricCard
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                    hint={metric.hint}
                    theme={state.theme}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
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
              <ToggleCard
                title={locale === "es" ? "Guia visual" : "Eye-line guide"}
                description={eyeLineDescription}
                enabled={state.showEyeLine}
                onToggle={toggleEyeLine}
                theme={state.theme}
              />

              <div
                className={cn(
                  "rounded-[1.25rem] border p-3.5",
                  toolTheme.card
                )}
              >
                <div className="text-sm font-medium">{copy.tool.themeLabel}</div>
                <div className={cn("mt-1 text-sm leading-6", toolTheme.muted)}>
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

              <p className={cn("text-sm leading-6", toolTheme.muted)}>
                {copy.tool.closeNote} {focusHint}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type FloatingButtonProps = {
  label: string;
  onClick: () => void;
  emphasized?: boolean;
};

function FloatingButton({
  label,
  onClick,
  emphasized = false
}: FloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition",
        emphasized
          ? "bg-ink text-white hover:bg-slate-800"
          : "border border-current/10 hover:bg-black/5 dark:hover:bg-white/5"
      )}
    >
      {label}
    </button>
  );
}

function ClearIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-current"
    >
      <path d="M5.22 5.22a.75.75 0 0 1 1.06 0L10 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-3.72 3.72a.75.75 0 1 1-1.06-1.06L8.94 10 5.22 6.28a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}
