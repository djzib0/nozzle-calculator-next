'use client'
import React, { JSX, useEffect, useState } from 'react';

type HalfKortNozzleProps = {
  height?: number;
  width?: number;
  roundness?: number; // 0 = flat sides, 1 = round
  linesCount?: number;
};

const HalfKortNozzle: React.FC<HalfKortNozzleProps> = ({
  height = 300,
  width = 120,
  roundness = 0.9,
  linesCount = 10,
}) => {
  const halfW = width / 2;
  const steps = 100;

  const [pathData, setPathData] = useState('');
  const [guideLines, setGuideLines] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const outer: [number, number][] = [];
    const centerline: [number, number][] = [];
    const topOffset = 10; // how much to shift top inward (left)

    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * height;
      const yc = i / steps; // 0 (top) to 1 (bottom)

      const thickness = halfW * (1 - roundness * Math.pow((i - steps / 2) / (steps / 2), 6));

      // shift top of centerline slightly left
      const centerX = halfW - topOffset * (1 - yc); // top = -offset, bottom = 0

      centerline.push([centerX, y]);
      outer.unshift([halfW + thickness, y]);
    }

    const fullPath =
      [...centerline, ...outer]
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`)
        .join(' ') + ' Z';

    setPathData(fullPath);

    const offset = 2;
    const lines = Array.from({ length: linesCount }, (_, i) => {
      const y = ((i + 1) * height) / (linesCount + 1);
      return (
        <g key={i} clipPath="url(#clip)">
          <line
            x1={0}
            y1={y - offset}
            x2={width}
            y2={y - offset}
            stroke="gray"
            strokeWidth={1.5}
          />
          <line
            x1={0}
            y1={y + offset}
            x2={width}
            y2={y + offset}
            stroke="gray"
            strokeWidth={1.5}
          />
        </g>
      );
    });

    setGuideLines(lines);
  }, [height, width, roundness, linesCount]);

  if (!pathData || !guideLines) return null;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <clipPath id="clip">
          <path d={pathData} />
        </clipPath>
      </defs>

      {guideLines}
      <path d={pathData} stroke="black" fill="none" strokeWidth={2} />
    </svg>
  );
};

export default HalfKortNozzle;
