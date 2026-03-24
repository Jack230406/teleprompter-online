"use client";

import { useEffect, useReducer, useState } from "react";

export type TeleprompterTheme = "light" | "dark";

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

type TeleprompterAction =
  | { type: "hydrate"; value: TeleprompterState }
  | { type: "script"; value: string }
  | { type: "speed"; value: number }
  | { type: "fontSize"; value: number }
  | { type: "lineHeight"; value: number }
  | { type: "textWidth"; value: number }
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
  showEyeLine: true,
  theme: "light"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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

  useEffect(() => {
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);

      if (rawValue) {
        const parsed = coerceState(JSON.parse(rawValue));

        if (parsed) {
          dispatch({ type: "hydrate", value: parsed });
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  return {
    hydrated,
    state,
    setScript: (value: string) => dispatch({ type: "script", value }),
    setSpeed: (value: number) => dispatch({ type: "speed", value }),
    setFontSize: (value: number) => dispatch({ type: "fontSize", value }),
    setLineHeight: (value: number) => dispatch({ type: "lineHeight", value }),
    setTextWidth: (value: number) => dispatch({ type: "textWidth", value }),
    toggleMirror: () => dispatch({ type: "toggleMirror" }),
    toggleReverse: () => dispatch({ type: "toggleReverse" }),
    toggleEyeLine: () => dispatch({ type: "toggleEyeLine" }),
    setTheme: (value: TeleprompterTheme) =>
      dispatch({ type: "theme", value })
  };
}
