"use client";

import { useState, useEffect } from "react";
import { LogoLoader } from "@/components/LogoLoader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the page is already fully loaded by the time the component mounts
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

    // Otherwise, wait for everything (images, stylesheets, scripts) to finish loading
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <LogoLoader isLoading={loading} />
      {children}
    </>
  );
}