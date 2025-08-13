import { Building2 } from "lucide-react";
import { useState } from "react"

interface OccupancyRateTrendProps {
  data: Array<{ month: string; rate: number }>
  highlightedPoint?: { month: string; rate: number }
}

export default function OccupancyRateTrend({ data, highlightedPoint }: OccupancyRateTrendProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; rate: number; x: number; y: number } | null>(null)

  const maxRate = 100
  const chartWidth = 580
  const chartHeight = 200
  const padding = 40

  const generatePath = () => {
    if (data.length === 0) return ""

    const stepX = (chartWidth - padding * 2) / (data.length - 1)

    return data
      .map((point, index) => {
        const x = padding + index * stepX
        const y = chartHeight - padding - (point.rate / maxRate) * (chartHeight - padding * 2)
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }

  const getPointPosition = (month: string, rate: number) => {
    const index = data.findIndex((d) => d.month === month)
    if (index === -1) return null

    const stepX = (chartWidth - padding * 2) / (data.length - 1)
    const x = padding + index * stepX
    const y = chartHeight - padding - (rate / maxRate) * (chartHeight - padding * 2)
    return { x, y }
  }

  const highlightPosition = highlightedPoint ? getPointPosition(highlightedPoint.month, highlightedPoint.rate) : null

  const handleMouseEnter = (point: { month: string; rate: number }, x: number, y: number) => {
    setHoveredPoint({ ...point, x, y })
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

  return (
    <div className=" p-2 rounded-2xl shadow-[2px_2px_5px_rgba(0,0,0,0.25)] w-full border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#3A32D326]/15 shadow-lg">
          <div className="text-[#3A32D3]"><Building2 /></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Occupancy Rate Trend</h3>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
             
              <text
                x={padding - 10}
                y={chartHeight - padding - (value / maxRate) * (chartHeight - padding * 2) + 4}
                textAnchor="end"
                className="text-xs fill-gray-400"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Main line */}
          <path d={generatePath()} fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4,4" />

          {/* Data points with hover functionality */}
          {data.map((point, index) => {
            const stepX = (chartWidth - padding * 2) / (data.length - 1)
            const x = padding + index * stepX
            const y = chartHeight - padding - (point.rate / maxRate) * (chartHeight - padding * 2)

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(point, x, y)}
                  onMouseLeave={handleMouseLeave}
                />
                {/* Visible data point */}
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#f97316"
                  stroke="white"
                  strokeWidth="2"
                  className="pointer-events-none"
                />
              </g>
            )
          })}

          {/* Highlighted point (static) */}
          {highlightPosition && (
            <>
              <circle
                cx={highlightPosition.x}
                cy={highlightPosition.y}
                r="6"
                fill="#f97316"
                stroke="white"
                strokeWidth="3"
              />
              {/* Tooltip */}
              <g>
                <rect
                  x={highlightPosition.x - 25}
                  y={highlightPosition.y - 35}
                  width="50"
                  height="25"
                  rx="12"
                  fill="#f97316"
                />
                <text
                  x={highlightPosition.x}
                  y={highlightPosition.y - 18}
                  textAnchor="middle"
                  className="text-sm fill-white font-medium"
                >
                  {highlightedPoint?.rate}%
                </text>
              </g>
            </>
          )}

          {hoveredPoint && (
            <>
              <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" fill="#f97316" stroke="white" strokeWidth="3" />
              {/* Hover tooltip */}
              <g>
                <rect x={hoveredPoint.x - 25} y={hoveredPoint.y - 35} width="50" height="25" rx="12" fill="#f97316" />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 18}
                  textAnchor="middle"
                  className="text-sm fill-white font-medium"
                >
                  {hoveredPoint.rate}%
                </text>
              </g>
            </>
          )}

          {/* X-axis labels */}
          {data.map((point, index) => {
            const stepX = (chartWidth - padding * 2) / (data.length - 1)
            const x = padding + index * stepX

            return (
              <text key={index} x={x} y={chartHeight - 10} textAnchor="middle" className="text-xs fill-gray-400">
                {point.month}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
