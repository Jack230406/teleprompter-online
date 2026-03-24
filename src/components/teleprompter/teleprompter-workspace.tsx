"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { type LocalizedCopy } from "@/content/copy";
import {
  defaultTeleprompterState,
  getRecommendedTeleprompterSettings,
  getTeleprompterPresetSettings,
  type TeleprompterPresetId,
  useTeleprompterState
} from "@/hooks/use-teleprompter-state";
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

const MOBILE_SHEET_SAFE_AREA_STYLE = {
  paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
  paddingRight: "max(1.25rem, env(safe-area-inset-right))",
  paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))"
} as const;

const MOBILE_BAR_SAFE_AREA_STYLE = {
  left: "max(0.75rem, env(safe-area-inset-left))",
  right: "max(0.75rem, env(safe-area-inset-right))",
  bottom: "max(0.75rem, env(safe-area-inset-bottom))"
} as const;

const SAVE_FEEDBACK_TIMEOUT_MS = 3000;
const RESTORE_FEEDBACK_TIMEOUT_MS = 7000;

export function TeleprompterWorkspace({
  locale,
  copy
}: TeleprompterWorkspaceProps) {
  const {
    persistence,
    state,
    applyQuickSettings,
    setScript,
    setSpeed,
    setFontSize,
    setLineHeight,
    setTextWidth,
    resetSettings,
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
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [feedbackRefreshToken, setFeedbackRefreshToken] = useState(0);
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

  const statusLabel =
    playbackState === "playing"
      ? copy.tool.playing
      : playbackState === "paused"
        ? copy.tool.paused
        : copy.tool.ready;

  const numberLocale = locale === "es" ? "es-ES" : "en-US";
  const toggleEnabledLabel = locale === "es" ? "Activo" : "On";
  const toggleDisabledLabel = locale === "es" ? "Inactivo" : "Off";
  const eyeLineTitle = locale === "es" ? "Guia visual" : "Eye-line guide";
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
  const controlsMenuLabel = locale === "es" ? "Ajustes" : "Controls";
  const hideControlsLabel = locale === "es" ? "Ocultar" : "Hide";
  const controlsSheetTitle =
    locale === "es" ? "Controles del teleprompter" : "Teleprompter controls";
  const primaryControlsTitle =
    locale === "es" ? "Controles principales" : "Primary controls";
  const layoutControlsTitle =
    locale === "es" ? "Maquetacion del lector" : "Reading layout";
  const secondaryControlsTitle =
    locale === "es" ? "Opciones del lector" : "Reader options";
  const resetAllSettingsLabel =
    locale === "es" ? "Restablecer ajustes" : "Reset all settings";
  const resetAllSettingsHint =
    locale === "es"
      ? "Borra las preferencias guardadas y recupera la configuracion recomendada."
      : "Clear saved preferences and restore the recommended reader defaults.";
  const readingPaceHint =
    locale === "es"
      ? `Aprox. ${estimatedWordsPerMinute} ppm con esta velocidad`
      : `Approx. ${estimatedWordsPerMinute} wpm at this speed`;
  const focusHint =
    locale === "es"
      ? "Pulsa Esc o toca un espacio vacio para recuperar la interfaz."
      : "Press Esc or tap empty space to restore the interface.";
  const firstUseTitle =
    locale === "es" ? "Primera toma" : "Quick start";
  const firstUseDescription =
    locale === "es"
      ? "Elige un preset, ajusta la pantalla y reemplaza el texto de ejemplo antes de reproducir."
      : "Choose a preset, fit the reader to this screen, then replace the sample text before you hit play.";
  const firstUseSteps =
    locale === "es"
      ? [
          "Sustituye el texto de ejemplo",
          "Elige un preset para tu setup",
          "Pulsa reproducir cuando este listo"
        ]
      : [
          "Replace the sample script",
          "Choose a preset for your setup",
          "Press play when you are ready"
        ];
  const emptyScriptHint =
    locale === "es"
      ? "Pega un guion o unas notas breves. El lector y el guardado local se actualizaran en cuanto escribas."
      : "Paste a script or a short outline. The reader and local autosave will update as soon as you type.";
  const fitToScreenLabel =
    locale === "es" ? "Ajustar a pantalla" : "Fit to screen";
  const fitToScreenDescription =
    locale === "es"
      ? "Recomienda tamano, ancho, interlineado y ritmo segun esta pantalla."
      : "Recommends text size, width, line height, and pace for this screen.";
  const presetSectionTitle =
    locale === "es" ? "Presets de lectura" : "Reader presets";
  const presetSectionDescription =
    locale === "es"
      ? "Arranca con un ajuste pensado para tu camara o escenario."
      : "Start with a setup tuned for your camera or delivery context.";
  const keyboardChips =
    locale === "es"
      ? ["Espacio: play/pausa", "↑↓: velocidad", "+/-: texto", "Esc: interfaz"]
      : ["Space: play/pause", "↑↓: speed", "+/-: text", "Esc: chrome"];
  const mobileControlsSummary =
    locale === "es"
      ? `Velocidad ${state.speed} px/s · Texto ${state.fontSize}px`
      : `Speed ${state.speed} px/s · Text ${state.fontSize}px`;

  const presetOptions = useMemo(
    () =>
      [
        {
          id: "phoneSelfie",
          title: locale === "es" ? "Selfie en movil" : "Phone selfie",
          description:
            locale === "es"
              ? "Texto amplio y ritmo tranquilo cerca de la camara."
              : "Wide text and a calmer pace when the phone sits close to the lens."
        },
        {
          id: "laptopWebcam",
          title: locale === "es" ? "Webcam de laptop" : "Laptop webcam",
          description:
            locale === "es"
              ? "Lectura equilibrada para webcam y reuniones."
              : "Balanced framing for laptop webcams, Zoom, and desk setups."
        },
        {
          id: "glassTeleprompter",
          title: locale === "es" ? "Teleprompter con cristal" : "Glass teleprompter",
          description:
            locale === "es"
              ? "Activa espejo y mantiene una lectura compacta para rigs."
              : "Turns mirror on and keeps the text compact for beam-splitter rigs."
        },
        {
          id: "speechKeynote",
          title: locale === "es" ? "Discurso / keynote" : "Speech / keynote",
          description:
            locale === "es"
              ? "Texto grande y mas aire para lecturas desde escenario."
              : "Larger text with more breathing room for podium or keynote reads."
        }
      ] satisfies Array<{
        id: TeleprompterPresetId;
        title: string;
        description: string;
      }>,
    [locale]
  );

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

  const fitRecommendation = useMemo(() => {
    if (viewportSize.width <= 0 || viewportSize.height <= 0) {
      return null;
    }

    return getRecommendedTeleprompterSettings({
      viewportWidth: viewportSize.width,
      viewportHeight: viewportSize.height,
      script: state.script
    });
  }, [state.script, viewportSize.height, viewportSize.width]);

  const fitRecommendationSummary = fitRecommendation
    ? locale === "es"
      ? `${fitRecommendation.fontSize}px · ${fitRecommendation.textWidth}% ancho · ${trimDecimal(
          fitRecommendation.lineHeight
        )}x · ${fitRecommendation.speed} px/s`
      : `${fitRecommendation.fontSize}px · ${fitRecommendation.textWidth}% width · ${trimDecimal(
          fitRecommendation.lineHeight
        )}x · ${fitRecommendation.speed} px/s`
    : locale === "es"
      ? "Midiendo esta pantalla..."
      : "Reading this screen...";

  const isDefaultWorkspaceState =
    state.script === defaultTeleprompterState.script &&
    state.speed === defaultTeleprompterState.speed &&
    state.fontSize === defaultTeleprompterState.fontSize &&
    state.lineHeight === defaultTeleprompterState.lineHeight &&
    state.textWidth === defaultTeleprompterState.textWidth &&
    state.mirrored === defaultTeleprompterState.mirrored &&
    state.reverse === defaultTeleprompterState.reverse &&
    state.showEyeLine === defaultTeleprompterState.showEyeLine &&
    state.theme === defaultTeleprompterState.theme;

  const showFirstUseGuidance =
    persistence.restoredAt === null && isDefaultWorkspaceState;

  const feedbackNow = useMemo(
    () => Date.now(),
    [
      feedbackRefreshToken,
      persistence.lastSavedAt,
      persistence.restoredAt,
      persistence.saveUnavailable
    ]
  );
  const isRecentRestore =
    persistence.restoredAt !== null &&
    feedbackNow - persistence.restoredAt < RESTORE_FEEDBACK_TIMEOUT_MS &&
    persistence.lastSavedAt === null;
  const isRecentSave =
    persistence.lastSavedAt !== null &&
    feedbackNow - persistence.lastSavedAt < SAVE_FEEDBACK_TIMEOUT_MS;
  const saveFeedback = persistence.saveUnavailable
    ? {
        label:
          locale === "es"
            ? "Guardado local no disponible"
            : "Local save unavailable",
        tone: "warning" as const
      }
    : isRecentRestore
      ? {
          label:
            locale === "es"
              ? "Se recupero tu ultima sesion"
              : "Restored your last session",
          tone: "success" as const
        }
      : isRecentSave && !(persistence.restoredAt === null && isDefaultWorkspaceState)
        ? {
            label:
              locale === "es"
                ? "Guardado local ahora mismo"
                : "Saved locally just now",
            tone: "success" as const
          }
        : {
            label:
              locale === "es"
                ? "Autoguardado activo en este navegador"
                : "Autosave is on in this browser",
            tone: "neutral" as const
          };

  const fitReaderToViewport = (force = false) => {
    if (typeof window === "undefined") {
      return;
    }

    const recommendedSettings = getRecommendedTeleprompterSettings({
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      script: state.script
    });
    const nextFontSize =
      force ||
      state.fontSize === defaultTeleprompterState.fontSize ||
      state.fontSize > recommendedSettings.fontSize
        ? recommendedSettings.fontSize
        : state.fontSize;
    const nextLineHeight =
      force ||
      state.lineHeight === defaultTeleprompterState.lineHeight ||
      Math.abs(state.lineHeight - recommendedSettings.lineHeight) > 0.28
        ? recommendedSettings.lineHeight
        : state.lineHeight;
    const nextTextWidth =
      force ||
      state.textWidth === defaultTeleprompterState.textWidth ||
      state.textWidth < recommendedSettings.textWidth
        ? recommendedSettings.textWidth
        : state.textWidth;
    const nextSpeed =
      force ||
      state.speed === defaultTeleprompterState.speed ||
      Math.abs(state.speed - recommendedSettings.speed) > 18
        ? recommendedSettings.speed
        : state.speed;

    if (
      nextSpeed !== state.speed ||
      nextFontSize !== state.fontSize ||
      nextLineHeight !== state.lineHeight ||
      nextTextWidth !== state.textWidth
    ) {
      applyQuickSettings({
        speed: nextSpeed,
        fontSize: nextFontSize,
        lineHeight: nextLineHeight,
        textWidth: nextTextWidth
      });
    }
  };

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

    fitReaderToViewport();
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

  const handleResetAllSettings = () => {
    const viewportSettings =
      typeof window === "undefined"
        ? undefined
        : getRecommendedTeleprompterSettings({
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            script: state.script
          });

    resetSettings(viewportSettings);
    setResetSignal((value) => value + 1);
    setIsMobileControlsOpen(false);
  };

  const handleApplyPreset = (presetId: TeleprompterPresetId) => {
    if (typeof window === "undefined") {
      return;
    }

    applyQuickSettings(
      getTeleprompterPresetSettings({
        presetId,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        script: state.script
      })
    );
    setIsMobileControlsOpen(false);
  };

  const handleFitToScreen = () => {
    fitReaderToViewport(true);
    setIsMobileControlsOpen(false);
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

    fitReaderToViewport();
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
    setCanFullscreen(Boolean(document.fullscreenEnabled));

    const handleFullscreenChange = () => {
      const isReaderFullscreen =
        document.fullscreenElement === readerStageRef.current;

      setIsFullscreen(isReaderFullscreen);

      if (isReaderFullscreen) {
        fitReaderToViewport(true);
      }
    };

    handleFullscreenChange();
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [state.fontSize, state.lineHeight, state.textWidth]);

  useEffect(() => {
    const handleViewportMeasurement = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleViewportMeasurement();
    window.addEventListener("resize", handleViewportMeasurement);
    window.addEventListener("orientationchange", handleViewportMeasurement);

    return () => {
      window.removeEventListener("resize", handleViewportMeasurement);
      window.removeEventListener("orientationchange", handleViewportMeasurement);
    };
  }, []);

  useEffect(() => {
    const timeoutDuration = persistence.lastSavedAt
      ? SAVE_FEEDBACK_TIMEOUT_MS
      : persistence.restoredAt
        ? RESTORE_FEEDBACK_TIMEOUT_MS
        : null;

    if (!timeoutDuration) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedbackRefreshToken((value) => value + 1);
    }, timeoutDuration + 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [persistence.lastSavedAt, persistence.restoredAt]);

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

  useEffect(() => {
    if (!isFocusMode) {
      return;
    }

    const handleViewportChange = () => {
      fitReaderToViewport();
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, [isFocusMode, state.fontSize, state.lineHeight, state.script, state.textWidth]);

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
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-4">
        <div
          className={cn(
            "rounded-[1.25rem] border p-3.5 sm:rounded-[1.5rem] sm:p-4",
            toolTheme.card
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium">{presetSectionTitle}</div>
              <div
                className={cn("mt-1 text-sm leading-5 sm:leading-6", toolTheme.muted)}
              >
                {presetSectionDescription}
              </div>
            </div>
            {showFirstUseGuidance ? (
              <div
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em]",
                  toolTheme.statusPill
                )}
              >
                {firstUseTitle}
              </div>
            ) : null}
          </div>

          {showFirstUseGuidance ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {firstUseSteps.map((step) => (
                <HelperChip key={step} label={step} theme={state.theme} />
              ))}
            </div>
          ) : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {presetOptions.map((preset) => (
              <PresetCard
                key={preset.id}
                title={preset.title}
                description={preset.description}
                theme={state.theme}
                onClick={() => handleApplyPreset(preset.id)}
              />
            ))}
          </div>
        </div>

        <UtilityActionCard
          title={fitToScreenLabel}
          description={fitToScreenDescription}
          detail={fitRecommendationSummary}
          ctaLabel={fitToScreenLabel}
          theme={state.theme}
          onClick={handleFitToScreen}
        />
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
          enabledLabel={toggleEnabledLabel}
          disabledLabel={toggleDisabledLabel}
        />
        <ToggleCard
          title={copy.tool.reverseLabel}
          description={reverseDescription}
          enabled={state.reverse}
          onToggle={toggleReverse}
          theme={state.theme}
          enabledLabel={toggleEnabledLabel}
          disabledLabel={toggleDisabledLabel}
        />
        <ToggleCard
          title={eyeLineTitle}
          description={eyeLineDescription}
          enabled={state.showEyeLine}
          onToggle={toggleEyeLine}
          theme={state.theme}
          enabledLabel={toggleEnabledLabel}
          disabledLabel={toggleDisabledLabel}
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
        <div>
          <div className="text-sm font-medium">
            {locale === "es" ? "Ayudas rapidas" : "Quick helpers"}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {keyboardChips.map((chip) => (
              <HelperChip key={chip} label={chip} theme={state.theme} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ActionButton
            label={copy.tool.reset}
            onClick={handleResetPosition}
            disabled={!state.script.trim()}
            variant="ghost"
            theme={state.theme}
          />
          <ActionButton
            label={resetAllSettingsLabel}
            onClick={handleResetAllSettings}
            variant="secondary"
            theme={state.theme}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        data-teleprompter-tool
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
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-medium">{copy.tool.localBadge}</div>
              <SaveStatusPill
                label={saveFeedback.label}
                tone={saveFeedback.tone}
                theme={state.theme}
              />
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

        <div className="grid gap-0 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          {!isFocusMode ? (
            <section className="min-w-0 border-b p-4 sm:p-6 md:p-8 xl:border-b-0 xl:border-r">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0">
                  <h2 className="font-display text-2xl leading-none sm:text-3xl">
                    {copy.tool.editorTitle}
                  </h2>
                  <p className={cn("mt-1.5 text-sm leading-5 sm:mt-2 sm:leading-6", toolTheme.muted)}>
                    {showFirstUseGuidance
                      ? firstUseDescription
                      : !state.script.trim()
                        ? emptyScriptHint
                        : persistence.restoredAt
                          ? locale === "es"
                            ? "Continua donde lo dejaste o limpia el guion para empezar de nuevo."
                            : "Continue where you left off, or clear the script to start fresh."
                          : copy.tool.localHint}
                  </p>
                </div>
              </div>

              <label className="mt-4 block space-y-2.5 sm:mt-6 sm:space-y-3">
                <div className="text-sm font-medium">{copy.tool.scriptLabel}</div>

                <div className="relative min-w-0">
                  <textarea
                    ref={textareaRef}
                    value={state.script}
                    onChange={(event) => setScript(event.target.value)}
                    placeholder={copy.tool.scriptPlaceholder}
                    className={cn(
                      "h-[16rem] max-h-[16rem] w-full resize-none overflow-x-hidden overflow-y-auto rounded-[1.25rem] border px-3.5 py-3.5 pr-14 text-[15px] leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 [overflow-wrap:anywhere] break-words sm:h-[18rem] sm:max-h-[18rem] sm:rounded-[1.5rem] sm:px-4 sm:py-4 sm:pr-16 sm:text-base sm:leading-7 lg:h-[20rem] lg:max-h-[20rem]",
                      toolTheme.textarea
                    )}
                    style={{
                      overflowWrap: "anywhere",
                      wordBreak: "break-word"
                    }}
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

                {!state.script.trim() ? (
                  <p className={cn("text-sm leading-6", toolTheme.muted)}>
                    {emptyScriptHint}
                  </p>
                ) : null}
              </label>
            </section>
          ) : null}

          {!isFocusMode ? (
            <section className="min-w-0 border-b p-4 sm:p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="grid gap-3 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:grid-cols-2">
                    <ActionButton
                      label={copy.tool.play}
                      onClick={handleTogglePlayback}
                      disabled={!state.script.trim()}
                      variant="primary"
                      theme={state.theme}
                      className="w-full min-w-0"
                    />
                    <ActionButton
                      label={copy.tool.stop}
                      onClick={handleStop}
                      disabled={playbackState === "ready"}
                      variant="danger"
                      theme={state.theme}
                      className="w-full min-w-0"
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
                        className="w-full min-w-0"
                      />
                    ) : null}
                    <ActionButton
                      label={copy.tool.reset}
                      onClick={handleResetPosition}
                      disabled={!state.script.trim()}
                      variant="ghost"
                      theme={state.theme}
                      className="w-full min-w-0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{copy.tool.controlsTitle}</div>
                      <div className={cn("mt-1 text-sm leading-5", toolTheme.muted)}>
                        {mobileControlsSummary}
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
              </div>
            </section>
          ) : null}

          <section
            ref={readerSectionRef}
            id="reader"
            className={cn(
              "min-w-0 p-4 sm:p-6 md:p-8 lg:p-10",
              !isFocusMode &&
                (state.theme === "dark"
                  ? "border-t border-slate-800 xl:col-span-2"
                  : "border-t border-slate-200 xl:col-span-2"),
              isFocusMode && "xl:col-span-2"
            )}
          >
            <div
              ref={readerStageRef}
              className={cn(
                "relative min-w-0 space-y-4 sm:space-y-5",
                isFullscreen &&
                  (state.theme === "dark"
                    ? "flex min-h-dvh min-h-screen flex-col bg-slate-950 p-4 md:p-6"
                    : "flex min-h-dvh min-h-screen flex-col bg-white p-4 md:p-6")
              )}
            >
              {!isFocusMode ? (
                <div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <div className="min-w-0">
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

              <div className={cn("relative min-w-0", isFullscreen && "flex flex-1")}>
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
                        label={
                          playbackState === "playing" ? copy.tool.pause : copy.tool.play
                        }
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
                  <div
                    className="fixed z-50 md:hidden"
                    style={MOBILE_BAR_SAFE_AREA_STYLE}
                  >
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
              "absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[2rem] border px-5 pb-6 pt-4 shadow-2xl",
              toolTheme.shell
            )}
            style={MOBILE_SHEET_SAFE_AREA_STYLE}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-current/10" />

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-display text-2xl leading-none">
                  {controlsSheetTitle}
                </div>
                <p className={cn("mt-2 text-sm leading-6", toolTheme.muted)}>
                  {showFirstUseGuidance ? firstUseDescription : saveFeedback.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileControlsOpen(false)}
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition",
                  toolTheme.card
                )}
              >
                <ClearIcon />
              </button>
            </div>

            <div className="mt-4 grid gap-4">
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

              <MobileSectionHeading
                theme={state.theme}
                title={presetSectionTitle}
                description={
                  showFirstUseGuidance ? firstUseDescription : presetSectionDescription
                }
              />

              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {presetOptions.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      title={preset.title}
                      description={preset.description}
                      theme={state.theme}
                      onClick={() => handleApplyPreset(preset.id)}
                    />
                  ))}
                </div>

                <UtilityActionCard
                  title={fitToScreenLabel}
                  description={fitToScreenDescription}
                  detail={fitRecommendationSummary}
                  ctaLabel={fitToScreenLabel}
                  theme={state.theme}
                  onClick={handleFitToScreen}
                />
              </div>

              <MobileSectionHeading
                theme={state.theme}
                title={primaryControlsTitle}
                description={
                  locale === "es"
                    ? "Empieza la lectura y ajusta lo imprescindible."
                    : "Start prompting and tune the essentials."
                }
              />

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
                ) : (
                  <ActionButton
                    label={copy.tool.stop}
                    onClick={handleStop}
                    disabled={playbackState === "ready"}
                    variant="danger"
                    theme={state.theme}
                  />
                )}
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

              <MobileSectionHeading
                theme={state.theme}
                title={layoutControlsTitle}
                description={
                  locale === "es"
                    ? "Ajusta el bloque de lectura y la posicion del guion."
                    : "Adjust the reading block and script position."
                }
              />

              <div className="grid grid-cols-2 gap-3">
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
              </div>

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

              <MobileSectionHeading
                theme={state.theme}
                title={secondaryControlsTitle}
                description={
                  locale === "es"
                    ? "Opciones de lectura y presentacion."
                    : "Reader behavior and presentation options."
                }
              />

              <ToggleCard
                title={copy.tool.mirrorLabel}
                description={mirrorDescription}
                enabled={state.mirrored}
                onToggle={toggleMirror}
                theme={state.theme}
                enabledLabel={toggleEnabledLabel}
                disabledLabel={toggleDisabledLabel}
              />
              <ToggleCard
                title={copy.tool.reverseLabel}
                description={reverseDescription}
                enabled={state.reverse}
                onToggle={toggleReverse}
                theme={state.theme}
                enabledLabel={toggleEnabledLabel}
                disabledLabel={toggleDisabledLabel}
              />
              <ToggleCard
                title={eyeLineTitle}
                description={eyeLineDescription}
                enabled={state.showEyeLine}
                onToggle={toggleEyeLine}
                theme={state.theme}
                enabledLabel={toggleEnabledLabel}
                disabledLabel={toggleDisabledLabel}
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

              <div
                className={cn(
                  "rounded-[1.25rem] border p-3.5",
                  toolTheme.cardMuted
                )}
              >
                <div className="text-sm font-medium">{resetAllSettingsLabel}</div>
                <p className={cn("mt-1 text-sm leading-6", toolTheme.muted)}>
                  {resetAllSettingsHint}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ActionButton
                    label={resetAllSettingsLabel}
                    onClick={handleResetAllSettings}
                    variant="secondary"
                    theme={state.theme}
                  />
                </div>
              </div>

              <div
                className={cn(
                  "rounded-[1.25rem] border p-3.5",
                  toolTheme.cardMuted
                )}
              >
                <div className="text-sm font-medium">
                  {locale === "es" ? "Atajos y foco" : "Shortcuts and focus"}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {keyboardChips.map((chip) => (
                    <HelperChip key={chip} label={chip} theme={state.theme} />
                  ))}
                </div>
                <p className={cn("mt-3 text-sm leading-6", toolTheme.muted)}>
                  {focusHint}
                </p>
              </div>
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

type MobileSectionHeadingProps = {
  title: string;
  description: string;
  theme: "light" | "dark";
};

function MobileSectionHeading({
  title,
  description,
  theme
}: MobileSectionHeadingProps) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border px-3.5 py-3",
        theme === "dark"
          ? "border-slate-800 bg-slate-900/65"
          : "border-slate-200 bg-slate-50/80"
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      <div
        className={cn(
          "mt-1 text-sm leading-6",
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        )}
      >
        {description}
      </div>
    </div>
  );
}

type SaveStatusPillProps = {
  label: string;
  tone: "neutral" | "success" | "warning";
  theme: "light" | "dark";
};

function SaveStatusPill({ label, tone, theme }: SaveStatusPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-medium",
        theme === "dark"
          ? tone === "warning"
            ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
            : tone === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
              : "border-slate-700 bg-slate-900 text-slate-200"
          : tone === "warning"
            ? "border-amber-200 bg-amber-50 text-amber-900"
            : tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-slate-200 bg-white text-slate-600"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "warning"
            ? "bg-amber-500"
            : tone === "success"
              ? "bg-emerald-500"
              : theme === "dark"
                ? "bg-slate-400"
                : "bg-slate-400"
        )}
      />
      <span>{label}</span>
    </div>
  );
}

type PresetCardProps = {
  title: string;
  description: string;
  theme: "light" | "dark";
  onClick: () => void;
};

function PresetCard({
  title,
  description,
  theme,
  onClick
}: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-[7.5rem] rounded-[1.25rem] border p-3.5 text-left transition sm:rounded-[1.5rem] sm:p-4",
        theme === "dark"
          ? "border-slate-800 bg-slate-900 hover:border-slate-700"
          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
      )}
    >
      <div className="text-sm font-medium">{title}</div>
      <div
        className={cn(
          "mt-2 text-sm leading-6",
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        )}
      >
        {description}
      </div>
    </button>
  );
}

type UtilityActionCardProps = {
  title: string;
  description: string;
  detail: string;
  ctaLabel: string;
  theme: "light" | "dark";
  onClick: () => void;
};

function UtilityActionCard({
  title,
  description,
  detail,
  ctaLabel,
  theme,
  onClick
}: UtilityActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[1.25rem] border p-3.5 text-left transition sm:rounded-[1.5rem] sm:p-4",
        theme === "dark"
          ? "border-slate-800 bg-slate-900 hover:border-slate-700"
          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium">{title}</div>
          <div
            className={cn(
              "mt-1 text-sm leading-6",
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            )}
          >
            {description}
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[0.7rem] font-medium",
            theme === "dark"
              ? "bg-white text-slate-950"
              : "bg-ink text-white"
          )}
        >
          {ctaLabel}
        </span>
      </div>
      <div
        className={cn(
          "mt-4 rounded-[1rem] border px-3 py-2 text-xs leading-5",
          theme === "dark"
            ? "border-slate-800 bg-slate-950 text-slate-300"
            : "border-slate-200 bg-white text-slate-600"
        )}
      >
        {detail}
      </div>
    </button>
  );
}

type HelperChipProps = {
  label: string;
  theme: "light" | "dark";
};

function HelperChip({ label, theme }: HelperChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        theme === "dark"
          ? "border-slate-700 bg-slate-950 text-slate-300"
          : "border-slate-200 bg-white text-slate-600"
      )}
    >
      {label}
    </span>
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
