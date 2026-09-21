"use client";

import { useState, useRef } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

interface StepItem {
  step: string;
  title: string;
  description: string;
  position: "top" | "bottom";
}

const steps: StepItem[] = [
  {
    step: "01",
    title: "Submit Your Request",
    description: "Route, dates, and passenger count — through the form above.",
    position: "top",
  },
  {
    step: "02",
    title: "Receive a Tailored Quote",
    description: "Aircraft options and pricing suited to your trip.",
    position: "bottom",
  },
  {
    step: "03",
    title: "Confirm the Details",
    description: "Review your itinerary and lock in your aircraft.",
    position: "top",
  },
  {
    step: "04",
    title: "Finalize Payment",
    description: "Complete payment securely to confirm your booking.",
    position: "bottom",
  },
  {
    step: "05",
    title: "Fly",
    description: "No terminals, no lines — depart on your schedule.",
    position: "top",
  },
];

export function CompanyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);


  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };


  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const child = carouselRef.current.children[index] as HTMLElement;
      if (child) {
        carouselRef.current.scrollTo({
          left: child.offsetLeft - carouselRef.current.offsetLeft,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden">
      <Container>
  
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <SectionHeading
            title={
              <>
                From Quote to <span className="text-gold">Takeoff</span>
              </>
            }
            align="center"
          />
          <p className="mt-4 text-base sm:text-lg text-slate">
            Four steps stand between your request and departure. Our charter desk manages every detail in between.
          </p>
        </div>

    
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          
          
          <div 
            className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(212, 175, 55, 0), rgba(212, 175, 55, 0.6) 20%, rgba(212, 175, 55, 0.6) 80%, rgba(212, 175, 55, 0))",
            }}
          />

        
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="relative z-10 flex md:grid md:grid-cols-5 gap-0 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center"
          >
            {steps.map((item, index) => {
              const isTop = item.position === "top";

              return (
                <div key={index} className="h-full flex-shrink-0 w-full md:w-auto snap-center">
                  <div className="relative flex flex-col items-center md:items-stretch h-full">
                    
                   
                    <div className="flex md:hidden flex-col items-center text-center px-6 py-4 w-full min-h-[140px] justify-center">
                      <span className="text-sm font-semibold text-gold mb-2">{item.step}</span>
                      <h4 className="text-lg font-semibold text-ink mb-2">{item.title}</h4>
                      <p className="text-sm text-slate leading-relaxed max-w-xs">{item.description}</p>
                    </div>

                 
                    <div className="hidden md:flex flex-col h-full justify-between items-center text-center">
                      
                   
                      <div className={`w-full pb-8 flex flex-col items-center justify-end min-h-[130px] ${!isTop ? "invisible pointer-events-none" : ""}`}>
                        <span className="text-sm font-semibold text-gold mb-1.5">{item.step}</span>
                        <h4 className="text-base lg:text-lg font-medium text-ink mb-1 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate max-w-[200px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                   
                      <div className="relative flex items-center justify-center my-auto">
                        <div className="w-3.5 h-3.5 rounded-full bg-gold ring-4 ring-white shadow-sm transition-transform duration-300 hover:scale-125" />
                      </div>

                      <div className={`w-full pt-8 flex flex-col items-center justify-start min-h-[130px] ${isTop ? "invisible pointer-events-none" : ""}`}>
                        <span className="text-sm font-semibold text-gold mb-1.5">{item.step}</span>
                        <h4 className="text-base lg:text-lg font-medium text-ink mb-1 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate max-w-[200px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex md:hidden justify-center items-center gap-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? "w-6 h-2 bg-gold"
                    : "w-2 h-2 bg-mist hover:bg-slate/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}