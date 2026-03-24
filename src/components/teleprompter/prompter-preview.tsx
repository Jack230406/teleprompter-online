"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";

import { TeleprompterTheme } from "@/hooks/use-teleprompter-state";
import { cn } from "@/lib/utils";

type PrompterPreviewProps = {
  script: string;
  speed: number;
  fontSize: number;
  lineHeight: number;
  textWidth: number;
  mirrored: boolean;
  reverse: boolean;
  theme: TeleprompterTheme;
  isPlaying: boolean;
  onPlayingChange: (value: boolean) => void;
  onPlaybackComplete?: () => void;
  resetSignal: number;
  compact?: boolean;
  isFullscreen?: boolean;
  focusMode?: boolean;
  showEyeLine?: boolean;
  onBlankAreaClick?: () => void;
};

export function PrompterPreview({
  script,
  speed,
  fontSize,
  lineHeight,
  textWidth,
  mirrored,
  reverse,
  theme,
  isPlaying,
  onPlayingChange,
  onPlaybackComplete,
  resetSignal,
  compact = false,
  isFullscreen = false,
  focusMode = false,
  showEyeLine = true,
  onBlankAreaClick
}: PrompterPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  const handlePreviewClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!onBlankAreaClick) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.closest("[data-prompter-script]")) {
      return;
    }

    onBlankAreaClick();
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const maxScroll = Math.max(
      container.scrollHeight - container.clientHeight,
      0
    );

    lastTimestampRef.current = null;
    container.scrollTop = reverse ? maxScroll : 0;
  }, [resetSignal, reverse, script]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      lastTimestampRef.current = null;
      return;
    }

    const maxScroll = Math.max(
      container.scrollHeight - container.clientHeight,
      0
    );
    const atEdge = reverse
      ? container.scrollTop <= 2
      : container.scrollTop >= maxScroll - 2;

    if (atEdge) {
      container.scrollTop = reverse ? maxScroll : 0;
    }

    const step = (timestamp: number) => {
      const preview = containerRef.current;

      if (!preview) {
        return;
      }

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const elapsedSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const distance = speed * elapsedSeconds;
      const currentMax = Math.max(preview.scrollHeight - preview.clientHeight, 0);
      const nextScrollTop = reverse
        ? Math.max(0, preview.scrollTop - distance)
        : Math.min(currentMax, preview.scrollTop + distance);

      preview.scrollTop = nextScrollTop;

      const reachedEnd = reverse ? nextScrollTop <= 0 : nextScrollTop >= currentMax;

      if (reachedEnd) {
        onPlayingChange(false);
        onPlaybackComplete?.();
        lastTimestampRef.current = null;
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(step);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPlaying, onPlaybackComplete, onPlayingChange, reverse, speed]);

  return (
    <div
      onClick={handlePreviewClick}
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[1.5rem] border sm:rounded-[2rem]",
        theme === "dark"
          ? "border-slate-800 bg-slate-950 text-slate-100"
          : "border-slate-200 bg-white text-slate-900",
        compact
          ? "min-h-[17rem] sm:min-h-[22rem]"
          : isFullscreen
            ? "flex h-full min-h-0 flex-1"
            : focusMode
              ? "min-h-[72dvh] sm:min-h-[78dvh]"
            : "min-h-[20rem] sm:min-h-[28rem]"
      )}
    >
      <div
        ref={containerRef}
        data-reader-scroll
        className={cn(
          "h-full overflow-x-hidden overflow-y-auto px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16",
          compact
            ? "max-h-[17rem] sm:max-h-[22rem]"
            : isFullscreen
              ? "max-h-none"
              : focusMode
                ? "max-h-[72dvh] sm:max-h-[78dvh]"
                : "max-h-[70vh]"
        )}
      >
        <div
          data-prompter-script
          className="mx-auto min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight,
            width: `${textWidth}%`,
            maxWidth: "100%",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            transform: mirrored ? "scaleX(-1)" : undefined
          }}
        >
          {script.trim() || " "}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b sm:h-20",
          theme === "dark" ? "from-slate-950 to-transparent" : "from-white to-transparent"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t sm:h-24",
          theme === "dark" ? "from-slate-950 to-transparent" : "from-white to-transparent"
        )}
      />
      {showEyeLine ? (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-4 top-1/2 h-14 -translate-y-1/2 rounded-2xl border sm:inset-x-6 sm:h-20 sm:rounded-3xl",
              theme === "dark"
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-900/10 bg-brand-soft/20"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-6 top-1/2 h-px -translate-y-1/2 sm:inset-x-10",
              theme === "dark" ? "bg-white/25" : "bg-ink/15"
            )}
          />
        </>
      ) : null}
    </div>
  );
}
