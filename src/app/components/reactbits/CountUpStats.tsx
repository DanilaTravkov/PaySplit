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
          className="animated-stat-tile cursor-default rounded-xl bg-card px-3 py-4 text-center sm:px-6 sm:py-5"
        >
          <div className="mb-1 text-xl font-bold leading-tight text-white sm:mb-0.5 sm:text-2xl">
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
          <div className="text-[11px] leading-snug text-muted-foreground sm:text-xs">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
