"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 2500,
  height: 2500,
  onRender: () => {},
  devicePixelRatio: 2,

  // Globe rotation
  phi: 0,
  theta: 0.15,

  dark: 0,
  diffuse: 0.4,

  mapSamples: 16000,
  mapBrightness: 1,

  // Zoom
  scale: 1.05,

  baseColor: [1, 1, 1],
  markerColor: [190 / 255, 152 / 255, 90 / 255],
  glowColor: [1, 1, 1],

  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value

    if (canvasRef.current) {
      canvasRef.current.style.cursor =
        value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current

      pointerInteractionMovement.current = delta

      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      // Slow automatic rotation
      if (pointerInteracting.current === null) {
        phi += 0.003
      }

      state.phi = phi + r

      // Keep canvas perfectly square
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    resize()

    window.addEventListener("resize", resize)

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    const timeout = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", resize)
      globe.destroy()
    }
  }, [config, onRender])

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="
          h-full
          w-full
          opacity-0
          transition-opacity
          duration-500
          [contain:layout_paint_size]
        "
        onPointerDown={(e) => {
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerLeave={() => updatePointerInteraction(null)}
        onPointerMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX)
          }
        }}
      />
    </div>
  )
}