"use client";

import { useEffect, useReducer, useRef, useState } from "react";

export type TeleprompterTheme = "light" | "dark";
export type TeleprompterPresetId =
  | "phoneSelfie"
  | "laptopWebcam"
  | "glassTeleprompter"
  | "speechKeynote";

export type TeleprompterState = {
  script: string;
  speed: number;
  fontSize: number;
  lineHeight: number;
  textWidth: number;
  mirrored: boolean;
  reverse: boolean;
  showEyeLine: boolean;
  theme: TeleprompterTheme;
};

export type TeleprompterReaderSettings = Pick<
  TeleprompterState,
  "fontSize" | "lineHeight" | "textWidth"
>;

export type TeleprompterQuickSettings = Pick<
  TeleprompterState,
  "speed" | "fontSize" | "lineHeight" | "textWidth" | "mirrored"
>;

export type TeleprompterPersistence = {
  hasStoredState: boolean;
  lastSavedAt: number | null;
  restoredAt: number | null;
  saveUnavailable: boolean;
};

type RecommendedTeleprompterSettings = TeleprompterReaderSettings &
  Pick<TeleprompterState, "speed">;

type TeleprompterAction =
  | { type: "hydrate"; value: TeleprompterState }
  | { type: "script"; value: string }
  | { type: "speed"; value: number }
  | { type: "fontSize"; value: number }
  | { type: "lineHeight"; value: number }
  | { type: "textWidth"; value: number }
  | { type: "readerSettings"; value: TeleprompterReaderSettings }
  | { type: "quickSettings"; value: Partial<TeleprompterQuickSettings> }
  | { type: "resetSettings"; value?: Partial<TeleprompterReaderSettings> }
  | { type: "toggleMirror" }
  | { type: "toggleReverse" }
  | { type: "toggleEyeLine" }
  | { type: "theme"; value: TeleprompterTheme };

const STORAGE_KEY = "teleprompter-online:v1";

export const defaultTeleprompterState: TeleprompterState = {
  script: `Welcome to Teleprompter Online.

This is a free online teleprompter built for creators, presenters, and recording teams.

  Paste your own script, adjust the speed, mirror the text for reflective glass, and start reading when you are ready.`,
  speed: 42,
  fontSize: 54,
  lineHeight: 1.55,
  textWidth: 74,
  mirrored: false,
  reverse: false,
  showEyeLine: false,
  theme: "light"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step;
}

function countWords(script: string) {
  const normalized = script.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

function getScriptAnalysis(script: string) {
  const normalized = script.trim();

  if (!normalized) {
    return {
      wordCount: 0,
      lineCount: 0,
      longestLineLength: 0,
      averageLineLength: 0,
      averageWordsPerLine: 0
    };
  }

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const lineLengths = lines.map((line) => line.length);
  const wordCountsByLine = lines.map((line) => countWords(line));

  return {
    wordCount: countWords(normalized),
    lineCount: lines.length,
    longestLineLength: lineLengths.length ? Math.max(...lineLengths) : 0,
    averageLineLength: lineLengths.length
      ? lineLengths.reduce((sum, value) => sum + value, 0) / lineLengths.length
      : 0,
    averageWordsPerLine: wordCountsByLine.length
      ? wordCountsByLine.reduce((sum, value) => sum + value, 0) /
        wordCountsByLine.length
      : 0
  };
}

export function getViewportReaderSettings(
  viewportWidth: number,
  viewportHeight: number
): TeleprompterReaderSettings {
  const safeWidth = Math.max(viewportWidth, 320);
  const safeHeight = Math.max(viewportHeight, 480);
  const widthDrivenFont =
    safeWidth < 480
      ? safeWidth * 0.1
      : safeWidth < 768
        ? safeWidth * 0.088
        : safeWidth < 1024
          ? safeWidth * 0.072
          : safeWidth * 0.056;
  const heightDrivenFont =
    safeWidth < 768 ? safeHeight * 0.075 : safeHeight * 0.068;

  return {
    fontSize: clamp(
      Math.round(Math.min(widthDrivenFont, heightDrivenFont)),
      28,
      72
    ),
    lineHeight:
      safeWidth < 480 ? 1.42 : safeWidth < 768 ? 1.46 : safeWidth < 1024 ? 1.5 : 1.55,
    textWidth: clamp(
      safeWidth < 480 ? 96 : safeWidth < 768 ? 92 : safeWidth < 1024 ? 84 : 74,
      42,
      100
    )
  };
}

export function getRecommendedTeleprompterSettings({
  viewportWidth,
  viewportHeight,
  script
}: {
  viewportWidth: number;
  viewportHeight: number;
  script: string;
}): RecommendedTeleprompterSettings {
  const viewportSettings = getViewportReaderSettings(viewportWidth, viewportHeight);
  const scriptAnalysis = getScriptAnalysis(script);
  const safeWidth = Math.max(viewportWidth, 320);
  const safeHeight = Math.max(viewportHeight, 480);
  const isCompactViewport = safeWidth < 768;
  const isTallViewport = safeHeight > 980;

  let fontSize = viewportSettings.fontSize;
  let lineHeight = viewportSettings.lineHeight;
  let textWidth = viewportSettings.textWidth;
  let speed = isCompactViewport ? 38 : 42;

  const denseScript =
    scriptAnalysis.longestLineLength > 110 ||
    scriptAnalysis.averageWordsPerLine > 15 ||
    scriptAnalysis.wordCount > 900;
  const outlineStyleScript =
    scriptAnalysis.lineCount > 0 &&
    scriptAnalysis.averageWordsPerLine > 0 &&
    scriptAnalysis.averageWordsPerLine < 8 &&
    scriptAnalysis.longestLineLength < 72;
  const veryShortScript = scriptAnalysis.wordCount > 0 && scriptAnalysis.wordCount < 90;

  if (denseScript) {
    fontSize -= isCompactViewport ? 2 : 4;
    lineHeight += 0.08;
    textWidth -= isCompactViewport ? 2 : 6;
    speed -= 4;
  }

  if (outlineStyleScript || veryShortScript) {
    fontSize += isCompactViewport ? 2 : 4;
    lineHeight -= 0.03;
    textWidth += isCompactViewport ? 2 : 4;
    speed += 4;
  }

  if (scriptAnalysis.averageLineLength > 135) {
    textWidth -= 4;
    speed -= 2;
  }

  if (scriptAnalysis.wordCount > 1500) {
    speed -= 2;
  }

  if (isTallViewport) {
    fontSize += 2;
  }

  return {
    speed: clamp(roundToStep(speed, 2), 20, 160),
    fontSize: clamp(roundToStep(fontSize, 2), 28, 104),
    lineHeight: clamp(Number(lineHeight.toFixed(2)), 1.15, 2.4),
    textWidth: clamp(roundToStep(textWidth, 2), 42, 100)
  };
}

export function getTeleprompterPresetSettings({
  presetId,
  viewportWidth,
  viewportHeight,
  script
}: {
  presetId: TeleprompterPresetId;
  viewportWidth: number;
  viewportHeight: number;
  script: string;
}): TeleprompterQuickSettings {
  const recommended = getRecommendedTeleprompterSettings({
    viewportWidth,
    viewportHeight,
    script
  });
  const isPhoneViewport = viewportWidth < 480;
  const isTabletViewport = viewportWidth < 768;

  switch (presetId) {
    case "phoneSelfie":
      return {
        speed: clamp(recommended.speed - 4, 20, 160),
        fontSize: clamp(
          Math.max(recommended.fontSize, isPhoneViewport ? 38 : 44),
          28,
          104
        ),
        lineHeight: clamp(
          Math.max(recommended.lineHeight, isPhoneViewport ? 1.5 : 1.52),
          1.15,
          2.4
        ),
        textWidth: clamp(
          Math.max(recommended.textWidth, isTabletViewport ? 92 : 78),
          42,
          100
        ),
        mirrored: false
      };
    case "laptopWebcam":
      return {
        speed: clamp(recommended.speed, 20, 160),
        fontSize: clamp(
          Math.max(recommended.fontSize, isTabletViewport ? 46 : 52),
          28,
          104
        ),
        lineHeight: clamp(Math.max(recommended.lineHeight, 1.58), 1.15, 2.4),
        textWidth: clamp(Math.min(recommended.textWidth, 74), 42, 100),
        mirrored: false
      };
    case "glassTeleprompter":
      return {
        speed: clamp(recommended.speed + 2, 20, 160),
        fontSize: clamp(
          Math.max(recommended.fontSize, isTabletViewport ? 50 : 56),
          28,
          104
        ),
        lineHeight: clamp(Math.max(recommended.lineHeight, 1.62), 1.15, 2.4),
        textWidth: clamp(Math.min(recommended.textWidth, 72), 42, 100),
        mirrored: true
      };
    case "speechKeynote":
      return {
        speed: clamp(recommended.speed - 8, 20, 160),
        fontSize: clamp(
          Math.max(recommended.fontSize + (isPhoneViewport ? 2 : 6), isPhoneViewport ? 44 : 60),
          28,
          104
        ),
        lineHeight: clamp(Math.max(recommended.lineHeight, 1.72), 1.15, 2.4),
        textWidth: clamp(
          Math.max(recommended.textWidth, isTabletViewport ? 88 : 82),
          42,
          100
        ),
        mirrored: false
      };
    default:
      return {
        speed: recommended.speed,
        fontSize: recommended.fontSize,
        lineHeight: recommended.lineHeight,
        textWidth: recommended.textWidth,
        mirrored: false
      };
  }
}

function coerceState(value: unknown): TeleprompterState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<TeleprompterState>;

  return {
    script:
      typeof candidate.script === "string"
        ? candidate.script
        : defaultTeleprompterState.script,
    speed:
      typeof candidate.speed === "number"
        ? clamp(candidate.speed, 20, 160)
        : defaultTeleprompterState.speed,
    fontSize:
      typeof candidate.fontSize === "number"
        ? clamp(candidate.fontSize, 28, 104)
        : defaultTeleprompterState.fontSize,
    lineHeight:
      typeof candidate.lineHeight === "number"
        ? clamp(candidate.lineHeight, 1.15, 2.4)
        : defaultTeleprompterState.lineHeight,
    textWidth:
      typeof candidate.textWidth === "number"
        ? clamp(candidate.textWidth, 42, 100)
        : defaultTeleprompterState.textWidth,
    mirrored:
      typeof candidate.mirrored === "boolean"
        ? candidate.mirrored
        : defaultTeleprompterState.mirrored,
    reverse:
      typeof candidate.reverse === "boolean"
        ? candidate.reverse
        : defaultTeleprompterState.reverse,
    showEyeLine:
      typeof candidate.showEyeLine === "boolean"
        ? candidate.showEyeLine
        : defaultTeleprompterState.showEyeLine,
    theme:
      candidate.theme === "dark" || candidate.theme === "light"
        ? candidate.theme
        : defaultTeleprompterState.theme
  };
}

function reducer(
  state: TeleprompterState,
  action: TeleprompterAction
): TeleprompterState {
  switch (action.type) {
    case "hydrate":
      return action.value;
    case "script":
      return { ...state, script: action.value };
    case "speed":
      return { ...state, speed: clamp(action.value, 20, 160) };
    case "fontSize":
      return { ...state, fontSize: clamp(action.value, 28, 104) };
    case "lineHeight":
      return { ...state, lineHeight: clamp(action.value, 1.15, 2.4) };
    case "textWidth":
      return { ...state, textWidth: clamp(action.value, 42, 100) };
    case "readerSettings":
      return {
        ...state,
        fontSize: clamp(action.value.fontSize, 28, 104),
        lineHeight: clamp(action.value.lineHeight, 1.15, 2.4),
        textWidth: clamp(action.value.textWidth, 42, 100)
      };
    case "quickSettings":
      return {
        ...state,
        speed:
          typeof action.value.speed === "number"
            ? clamp(action.value.speed, 20, 160)
            : state.speed,
        fontSize:
          typeof action.value.fontSize === "number"
            ? clamp(action.value.fontSize, 28, 104)
            : state.fontSize,
        lineHeight:
          typeof action.value.lineHeight === "number"
            ? clamp(action.value.lineHeight, 1.15, 2.4)
            : state.lineHeight,
        textWidth:
          typeof action.value.textWidth === "number"
            ? clamp(action.value.textWidth, 42, 100)
            : state.textWidth,
        mirrored:
          typeof action.value.mirrored === "boolean"
            ? action.value.mirrored
            : state.mirrored
      };
    case "resetSettings":
      return {
        ...defaultTeleprompterState,
        ...action.value,
        script: state.script
      };
    case "toggleMirror":
      return { ...state, mirrored: !state.mirrored };
    case "toggleReverse":
      return { ...state, reverse: !state.reverse };
    case "toggleEyeLine":
      return { ...state, showEyeLine: !state.showEyeLine };
    case "theme":
      return { ...state, theme: action.value };
    default:
      return state;
  }
}

export function useTeleprompterState() {
  const [state, dispatch] = useReducer(reducer, defaultTeleprompterState);
  const [hydrated, setHydrated] = useState(false);
  const [persistence, setPersistence] = useState<TeleprompterPersistence>({
    hasStoredState: false,
    lastSavedAt: null,
    restoredAt: null,
    saveUnavailable: false
  });
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);

      if (rawValue) {
        const parsed = coerceState(JSON.parse(rawValue));

        if (parsed) {
          skipNextPersistRef.current = true;
          dispatch({ type: "hydrate", value: parsed });
          setPersistence({
            hasStoredState: true,
            lastSavedAt: null,
            restoredAt: Date.now(),
            saveUnavailable: false
          });
        }
      }
    } catch {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore follow-up storage failures and fall back to in-memory state.
      }
      setPersistence({
        hasStoredState: false,
        lastSavedAt: null,
        restoredAt: null,
        saveUnavailable: true
      });
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setPersistence((current) => ({
        hasStoredState: true,
        lastSavedAt: Date.now(),
        restoredAt: current.restoredAt,
        saveUnavailable: false
      }));
    } catch {
      setPersistence((current) => ({
        ...current,
        saveUnavailable: true
      }));
    }
  }, [hydrated, state]);

  return {
    hydrated,
    persistence,
    state,
    setScript: (value: string) => dispatch({ type: "script", value }),
    setSpeed: (value: number) => dispatch({ type: "speed", value }),
    setFontSize: (value: number) => dispatch({ type: "fontSize", value }),
    setLineHeight: (value: number) => dispatch({ type: "lineHeight", value }),
    setTextWidth: (value: number) => dispatch({ type: "textWidth", value }),
    setReaderSettings: (value: TeleprompterReaderSettings) =>
      dispatch({ type: "readerSettings", value }),
    applyQuickSettings: (value: Partial<TeleprompterQuickSettings>) =>
      dispatch({ type: "quickSettings", value }),
    resetSettings: (value?: Partial<TeleprompterReaderSettings>) => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore reset failures and allow the reducer to restore defaults in memory.
      }
      dispatch({ type: "resetSettings", value });
    },
    toggleMirror: () => dispatch({ type: "toggleMirror" }),
    toggleReverse: () => dispatch({ type: "toggleReverse" }),
    toggleEyeLine: () => dispatch({ type: "toggleEyeLine" }),
    setTheme: (value: TeleprompterTheme) =>
      dispatch({ type: "theme", value })
  };
}
