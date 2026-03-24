"use client";

import { useEffect } from "react";

export function HostRobotsTag() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.location.hostname.endsWith("pages.dev")) {
      return;
    }

    const name = "robots";
    let meta = document.head.querySelector(`meta[name="${name}"]`);

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", "noindex, nofollow");
  }, []);

  return null;
}
