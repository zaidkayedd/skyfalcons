"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AircraftCard } from "@/components/AircraftCard";
import { Button } from "@/components/Button";
import { aircraft } from "@/data/aircraft";
import { ArrowRight } from "lucide-react";


export function HistoricalTransactions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleAircraft = aircraft.slice(0, 3);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), visibleAircraft.length - 1));
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          title={
            <>
              Historical <span className="text-gold">Transactions</span>
            </>
          }
          align="center"
        />
        
        <div className="mt-12 -mx-4 sm:mx-0 lg:rounded-[26px] lg:border lg:border-mist lg:bg-white/70 lg:p-10 lg:shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
          
  
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
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

       
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {visibleAircraft.map((item, index) => (
              <Reveal 
                key={item.id} 
                delay={index * 120} 
                className="h-full"
              >
                <AircraftCard item={item} />
              </Reveal>
            ))}
          </div>

       
          <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
            {visibleAircraft.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-gold" : "w-2 bg-mist"
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