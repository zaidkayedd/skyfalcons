"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogoLoader } from "@/components/LogoLoader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isHome = pathname === "/";
    const hasVisitedSession = sessionStorage.getItem("has_visited");


    if (!hasVisitedSession || isHome) {
      setLoading(true);
      
  
      if (!hasVisitedSession) {
        sessionStorage.setItem("has_visited", "true");
      }

   
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
   
      setLoading(false);
    }
  }, [pathname, mounted]);

  if (!mounted) {
    return null;
  }

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