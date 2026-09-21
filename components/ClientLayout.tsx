"use client";

import { useState, useEffect } from "react";
import { LogoLoader } from "@/components/LogoLoader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

  
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