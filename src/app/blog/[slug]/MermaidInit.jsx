"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const MERMAID_CDN_SRC =
  "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";

export default function MermaidInit() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.mermaid) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (typeof window === "undefined") return;
    if (!window.mermaid) return;

    try {
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
      });

      // Mermaid v10+ supports run(); older versions support init().
      if (typeof window.mermaid.run === "function") {
        window.mermaid.run({ querySelector: ".mermaid" });
      } else if (typeof window.mermaid.init === "function") {
        window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));
      }
    } catch {
      // If mermaid fails, we just keep the raw text visible.
    }
  }, [loaded]);

  return (
    <Script
      src={MERMAID_CDN_SRC}
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
    />
  );
}

