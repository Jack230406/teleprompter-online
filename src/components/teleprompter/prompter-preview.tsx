"use client";

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
  isFullscreen = false
}: PrompterPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

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
      className={cn(
        "relative overflow-hidden rounded-[2rem] border",
        theme === "dark"
          ? "border-slate-800 bg-slate-950 text-slate-100"
          : "border-slate-200 bg-white text-slate-900",
        compact
          ? "min-h-[22rem]"
          : isFullscreen
            ? "h-full min-h-[calc(100vh-14rem)]"
            : "min-h-[28rem]"
      )}
    >
      <div
        ref={containerRef}
        className={cn(
          "h-full overflow-y-auto px-6 py-16 md:px-10",
          compact ? "max-h-[22rem]" : isFullscreen ? "max-h-none" : "max-h-[70vh]"
        )}
      >
        <div
          className="mx-auto whitespace-pre-wrap"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight,
            width: `${textWidth}%`,
            maxWidth: "100%",
            transform: mirrored ? "scaleX(-1)" : undefined
          }}
        >
          {script.trim() || " "}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b",
          theme === "dark" ? "from-slate-950 to-transparent" : "from-white to-transparent"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t",
          theme === "dark" ? "from-slate-950 to-transparent" : "from-white to-transparent"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-6 top-1/2 h-20 -translate-y-1/2 rounded-3xl border",
          theme === "dark"
            ? "border-white/10 bg-white/[0.03]"
            : "border-slate-900/10 bg-brand-soft/20"
        )}
      />
    </div>
  );
}
