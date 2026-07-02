"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import Aurora from "../Aurora"

type DraggableFinancePanelProps = {
  className: string
  kicker: string
  value: string
  driftSeed: number
}

function DraggableFinancePanel({ className, kicker, value, driftSeed }: DraggableFinancePanelProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const velocity = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  useAnimationFrame((time, delta) => {
    if (isDragging.current) return

    const seconds = Math.min(delta / 1000, 0.04)
    const waveX = Math.sin(time / 1250 + driftSeed) * 5.5
    const waveY = Math.cos(time / 1450 + driftSeed * 1.7) * 4.2
    const currentX = x.get()
    const currentY = y.get()

    velocity.current.x += waveX * seconds
    velocity.current.y += waveY * seconds

    if (currentX > 260) velocity.current.x -= (currentX - 260) * 0.95 * seconds
    if (currentX < -260) velocity.current.x -= (currentX + 260) * 0.95 * seconds
    if (currentY > 170) velocity.current.y -= (currentY - 170) * 0.95 * seconds
    if (currentY < -170) velocity.current.y -= (currentY + 170) * 0.95 * seconds

    velocity.current.x *= 0.988
    velocity.current.y *= 0.988

    x.set(currentX + velocity.current.x * seconds)
    y.set(currentY + velocity.current.y * seconds)
  })

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        isDragging.current = true
        velocity.current = { x: 0, y: 0 }
      }}
      onDragEnd={(_, info) => {
        isDragging.current = false
        velocity.current = {
          x: info.velocity.x * 0.16,
          y: info.velocity.y * 0.16,
        }
      }}
      whileDrag={{ scale: 1.04 }}
      style={{ x, y }}
      className={`${className} pointer-events-auto cursor-grab active:cursor-grabbing`}
    >
      <span className="panel-kicker">{kicker}</span>
      <span className="panel-value">{value}</span>
    </motion.div>
  )
}

export function HeroMotionField() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 opacity-70">
        <Aurora
          colorStops={["#2dd4bf", "#67e8f9", "#a78bfa"]}
          amplitude={1.25}
          blend={0.42}
          speed={0.7}
        />
      </div>
      <div className="finance-grid absolute inset-0" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <DraggableFinancePanel className="float-panel panel-one" kicker="renewal" value="EUR 50/mo" driftSeed={0.3} />
      <DraggableFinancePanel className="float-panel panel-two" kicker="ready" value="82%" driftSeed={1.6} />
      <DraggableFinancePanel className="float-panel panel-three" kicker="next bill" value="Nov 15" driftSeed={2.7} />
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,15,0.05)_0%,rgba(5,8,15,0.38)_50%,#05080f_92%)]"
      />
    </div>
  )
}
