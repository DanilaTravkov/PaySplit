"use client"

import CountUp from "../CountUp"

type CountUpStat = {
  value: string
  label: string
  numericValue: number
  prefix?: string
  suffix?: string
  compact?: boolean
}

type CountUpStatsProps = {
  stats: CountUpStat[]
}

export function CountUpStats({ stats }: CountUpStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-2xl sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="animated-stat-tile rounded-xl bg-card px-6 py-5 text-center"
        >
          <div className="mb-0.5 text-2xl font-bold text-white">
            {stat.value === "Coming soon" ? (
              stat.value
            ) : (
              <>
                {stat.prefix}
                <CountUp
                  to={stat.numericValue}
                  duration={1.1}
                  separator={stat.compact ? "" : ","}
                />
                {stat.suffix}
              </>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
