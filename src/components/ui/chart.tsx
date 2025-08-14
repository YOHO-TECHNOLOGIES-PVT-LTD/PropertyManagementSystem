// components/ui/chart.tsx
"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// Recharts components
import { Tooltip as RechartsTooltip } from "recharts"
import type { TooltipProps, ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"

// Chart container (wrapper for responsive layout)
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-full flex items-center justify-center", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

// Tooltip wrapper for recharts
export function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  return (
    <RechartsTooltip
      {...props}
      content={<ChartTooltipContent />}
    />
  )
}

// Tooltip content style
export const ChartTooltipContent = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-2 shadow-sm text-xs">
        <p className="font-medium text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: (entry as any).color || (entry as any).fill }}
            />
            <span className="text-gray-700">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
