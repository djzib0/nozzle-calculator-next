'use client'

import React from 'react'

type SegmentedCircleProps = {
  segments: number
}

const SegmentedCircle: React.FC<SegmentedCircleProps> = ({ segments }) => {
  const outerRadius = 140
  const innerRadius = 115
  const center = 150
  const segmentAngle = 360 / segments

  const createNumbers = () => {
    const labels = []

    for (let i = 0; i < segments; i++) {
      const angle = segmentAngle * i + segmentAngle / 2
      const position = polarToCartesian(center, center, (outerRadius + innerRadius) / 2, angle)

      
      const roundedX = Number(position.x.toFixed(6));
      const roundedY = Number(position.y.toFixed(6));

      labels.push(
        <text
          key={i}
          x={roundedX}
          y={roundedY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fill="#333"
        >
          {i + 1}
        </text>
      )
    }

    return labels
  }

  const createCircleOutline = () => {
    const paths = []

    for (let i = 0; i < segments; i++) {
      const startAngle = segmentAngle * i
      const endAngle = startAngle + segmentAngle

      // const outerStart = polarToCartesian(center, center, outerRadius, startAngle)
      const outerEnd = polarToCartesian(center, center, outerRadius, endAngle)

      paths.push(
        <line
          key={i}
          x1={center}
          y1={center}
          x2={outerEnd.x}
          y2={outerEnd.y}
          stroke="#ccc"
          strokeWidth="1"
        />
      )
    }

    return paths
  }

  return (
    <div className="w-[500px] h-[500px] relative text-white dark:text-[#939393]">
      <svg width="500" height="500" className="absolute top-0 left-0">
        {/* Outer Circle */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />

        {/* Inner Circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          stroke="#333"
          strokeWidth="2"
          fill="currentColor"
        />

        {/* Segment Lines */}
        {createCircleOutline()}

        {/* Numbers */}
        {createNumbers()}
      </svg>
    </div>
  )
}

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0)
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  }
}

export default SegmentedCircle
