"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AircraftCard } from "@/components/AircraftCard";
import { Button } from "@/components/Button";
import { aircraft } from "@/data/aircraft";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function HistoricalTransactions() {
  // Mobile states & refs (restored to original behavior)
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Desktop states & refs (3 items per page carousel)
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);

  const visibleAircraft = aircraft.slice(0, 5); // e.g., 6 items = 2 pages of 3 on desktop

  // --- MOBILE HANDLERS (Exact original logic) ---
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setMobileActiveIndex(Math.min(Math.max(newIndex, 0), visibleAircraft.length - 1));
  };

  const scrollToMobileCard = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
      setMobileActiveIndex(index);
    }
  };

  // --- DESKTOP HANDLERS (3 cards per page) ---
  const desktopItemsPerPage = 3;
  const totalDesktopPages = Math.ceil(visibleAircraft.length / desktopItemsPerPage);

  const handleDesktopScroll = () => {
    if (!desktopScrollRef.current) return;
    const container = desktopScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const card = container.querySelector("[data-desktop-card]") as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 24; // gap-6 = 24px
    const newIndex = Math.round(scrollLeft / (cardWidth * desktopItemsPerPage));
    setDesktopActiveIndex(Math.min(Math.max(newIndex, 0), totalDesktopPages - 1));
  };

  const scrollToDesktopPage = (pageIndex: number) => {
    if (!desktopScrollRef.current) return;
    const container = desktopScrollRef.current;
    const targetCardIndex = pageIndex * desktopItemsPerPage;
    const card = container.children[targetCardIndex] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setDesktopActiveIndex(pageIndex);
    }
  };

  const scrollDesktopNext = () => {
    const nextIndex = Math.min(desktopActiveIndex + 1, totalDesktopPages - 1);
    scrollToDesktopPage(nextIndex);
  };

  const scrollDesktopPrev = () => {
    const prevIndex = Math.max(desktopActiveIndex - 1, 0);
    scrollToDesktopPage(prevIndex);
  };

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <SectionHeading
            title={
              <>
                Historical <span className="text-gold">Transactions</span>
              </>
            }
            align="left"
          />
          
          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={scrollDesktopPrev}
              disabled={desktopActiveIndex === 0}
              aria-label="Previous page"
              className="p-3 rounded-full border border-mist hover:border-gold disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollDesktopNext}
              disabled={desktopActiveIndex >= totalDesktopPages - 1}
              aria-label="Next page"
              className="p-3 rounded-full border border-mist hover:border-gold disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-12 -mx-4 sm:mx-0 lg:rounded-[26px] lg:border lg:border-mist lg:bg-white/70 lg:p-10 lg:shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
          
          {/* ================= MOBILE CAROUSEL (Original Code Restored) ================= */}
          <div 
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex lg:hidden overflow-x-auto snap-x snap-mandatory pb-4 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-6"
          >
            {visibleAircraft.map((item) => (
              <div 
                key={item.id} 
                className="h-full w-full min-w-full snap-center flex-shrink-0"
              >
                <AircraftCard item={item} />
              </div>
            ))}
          </div>

          {/* ================= DESKTOP CAROUSEL (3 Cards per page) ================= */}
          <div 
            ref={desktopScrollRef}
            onScroll={handleDesktopScroll}
            className="hidden lg:flex overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-6 scroll-smooth"
          >
            {visibleAircraft.map((item) => (
              <div 
                key={item.id}
                data-desktop-card 
                className="w-[calc(33.333%-16px)] min-w-[calc(33.333%-16px)] snap-start flex-shrink-0"
              >
                <AircraftCard item={item} />
              </div>
            ))}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
            {visibleAircraft.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToMobileCard(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileActiveIndex === i ? "w-6 bg-gold" : "w-2 bg-mist"
                }`}
              />
            ))}
          </div>

          {/* Desktop Pagination Dots */}
          <div className="hidden lg:flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: totalDesktopPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToDesktopPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  desktopActiveIndex === i ? "w-6 bg-gold" : "w-2 bg-mist"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/marketplace">
            Explore Marketplace
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}