"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoLoader } from "@/components/LogoLoader";

const MIN_MS = 1500; 
const FALLBACK_MS = 8000; 

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const firstVisit = !sessionStorage.getItem("sf_loaded");
    const isHome = pathname === "/";

   
    if (!firstVisit && !isHome) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const start = Date.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      window.setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("sf_loaded", "1");
      }, wait);
    };

    if (isHome) {
      const w = window as unknown as { __heroReady?: boolean };
      w.__heroReady = false;
      const onReady = () => finish();
      window.addEventListener("hero:ready", onReady);
      const check = window.setInterval(() => {
        if (w.__heroReady) finish();
      }, 120);
      const fallback = window.setTimeout(finish, FALLBACK_MS);
      return () => {
        window.removeEventListener("hero:ready", onReady);
        window.clearInterval(check);
        window.clearTimeout(fallback);
      };
    }

    const t = window.setTimeout(finish, 1000);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <>
      <LogoLoader isLoading={loading} />
      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
