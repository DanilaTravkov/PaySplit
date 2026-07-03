"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

const COLORS = ["#5eead4", "#67e8f9", "#a78bfa", "#f0fdfa", "#14b8a6", "#22c55e"]
const PARTICLE_COUNT = 180

type MvpSuccessBurstProps = {
  active: boolean
}

type Particle = {
  side: -1 | 1
  spawnAt: number
  x: number
  y: number
  vx: number
  vy: number
  width: number
  height: number
  radius: number
  rotation: number
  spin: number
  color: string
  alpha: number
  flutter: number
  flutterSpeed: number
  drag: number
  terminalVelocity: number
}

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 9283.231 + salt * 418.97) * 10000
  return value - Math.floor(value)
}

function createParticles(width: number, height: number) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index): Particle => {
    const side = index % 2 === 0 ? 1 : -1
    const horizontalVelocity = width * (0.72 + seededUnit(index, 1) * 0.52)
    const verticalVelocity = height * (0.62 + seededUnit(index, 2) * 0.36)

    return {
      side,
      spawnAt: seededUnit(index, 3) * 1.65,
      x: side === 1 ? -90 - seededUnit(index, 4) * 90 : width + 90 + seededUnit(index, 4) * 90,
      y: height * (0.54 + seededUnit(index, 5) * 0.18),
      vx: side * horizontalVelocity,
      vy: -verticalVelocity,
      width: 10 + seededUnit(index, 6) * 22,
      height: 7 + seededUnit(index, 7) * 20,
      radius: seededUnit(index, 8) > 0.78 ? 999 : 2,
      rotation: seededUnit(index, 9) * Math.PI,
      spin: (seededUnit(index, 10) - 0.5) * 11,
      color: COLORS[index % COLORS.length],
      alpha: 0,
      flutter: (seededUnit(index, 11) - 0.5) * width * 0.045,
      flutterSpeed: 1.6 + seededUnit(index, 12) * 2.2,
      drag: 0.42 + seededUnit(index, 13) * 0.22,
      terminalVelocity: height * (0.26 + seededUnit(index, 14) * 0.16),
    }
  })
}

export function MvpSuccessBurst({ active }: MvpSuccessBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const canvasElement = canvas

    const context = canvasElement.getContext("2d")
    if (!context) return
    const drawingContext = context

    let animationFrame = 0
    let lastTime = performance.now()
    let startTime = lastTime
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let dpr = 1

    function syncCanvasSize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvasElement.width = Math.ceil(width * dpr)
      canvasElement.height = Math.ceil(height * dpr)
      canvasElement.style.width = `${width}px`
      canvasElement.style.height = `${height}px`
      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function resetBurst() {
      syncCanvasSize()
      particles = createParticles(width, height)
      startTime = performance.now()
      lastTime = startTime
    }

    function handleResize() {
      const previousWidth = width
      const previousHeight = height

      syncCanvasSize()

      const widthChanged = Math.abs(width - previousWidth) > 24
      const majorHeightChange = Math.abs(height - previousHeight) > Math.max(160, previousHeight * 0.3)

      if (widthChanged || majorHeightChange) {
        particles = createParticles(width, height)
        startTime = performance.now()
        lastTime = startTime
      }
    }

    function drawParticle(particle: Particle, elapsed: number) {
      drawingContext.save()
      drawingContext.globalAlpha = particle.alpha
      drawingContext.translate(
        particle.x + Math.sin(elapsed * particle.flutterSpeed + particle.spawnAt) * particle.flutter,
        particle.y
      )
      drawingContext.rotate(particle.rotation)
      drawingContext.fillStyle = particle.color
      drawingContext.shadowColor = particle.color
      drawingContext.shadowBlur = 16

      if (particle.radius === 999) {
        drawingContext.beginPath()
        drawingContext.ellipse(0, 0, particle.width * 0.55, particle.height * 0.55, 0, 0, Math.PI * 2)
        drawingContext.fill()
      } else {
        drawingContext.beginPath()
        drawingContext.roundRect(
          particle.width / -2,
          particle.height / -2,
          particle.width,
          particle.height,
          particle.radius
        )
        drawingContext.fill()
      }

      drawingContext.restore()
    }

    function frame(now: number) {
      const rawDelta = (now - lastTime) / 1000
      const delta = Math.min(rawDelta, 0.033)
      const elapsed = (now - startTime) / 1000
      lastTime = now

      drawingContext.clearRect(0, 0, width, height)

      const gravity = height * 0.58
      const airDrift = width * 0.022

      for (const particle of particles) {
        if (elapsed < particle.spawnAt) continue

        const age = elapsed - particle.spawnAt
        const dragFactor = Math.max(0.82, 1 - particle.drag * delta)

        particle.vx *= dragFactor
        particle.vy += gravity * delta
        if (particle.vy > particle.terminalVelocity) {
          particle.vy = particle.terminalVelocity
        }
        particle.vx += Math.sin(age * particle.flutterSpeed) * airDrift * delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.rotation += particle.spin * delta
        particle.alpha = Math.min(1, age / 0.35)

        if (particle.y > height + 160) {
          particle.alpha = Math.max(0, 1 - (particle.y - height - 160) / 220)
        }

        if (particle.alpha > 0) {
          drawParticle(particle, elapsed)
        }
      }

      if (elapsed < 10.5) {
        animationFrame = window.requestAnimationFrame(frame)
      }
    }

    resetBurst()
    window.addEventListener("resize", handleResize)
    animationFrame = window.requestAnimationFrame(frame)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
      drawingContext.clearRect(0, 0, width, height)
    }
  }, [active])

  if (!mounted) return null

  return createPortal(
    active ? (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 2147483647 }}
      />
    ) : null,
    document.body
  )
}
