'use client'
import React, { JSX, useEffect, useState } from 'react';

type VerticalFlatBottomNACAProps = {
  height?: number;
  thicknessRatio?: number;
  linesCount?: number;
};

const VerticalFlatBottomNACA: React.FC<VerticalFlatBottomNACAProps> = ({
  height = 500,
  thicknessRatio = 0.35,
  linesCount = 10,
}) => {
  const width = 200;
  const halfWidth = width / 2;
  const steps = 100;

  const [pathData, setPathData] = useState('');
  const [guideLines, setGuideLines] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const leftPoints: [number, number][] = [];
    const rightPoints: [number, number][] = [];

    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * height;
      const yc = y / height;

      const thickness =
        5 *
        thicknessRatio *
        height *
        (0.2969 * Math.sqrt(yc) -
          0.126 * yc -
          0.3516 * yc ** 2 +
          0.2843 * yc ** 3 -
          0.1015 * yc ** 4);

      leftPoints.push([halfWidth - thickness, y]);
      rightPoints.unshift([halfWidth, y]);
    }

    const fullPath = [...leftPoints, ...rightPoints]
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
  }, [height, thicknessRatio, linesCount, halfWidth]);

  if (!pathData || !guideLines) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      // className="bg-white border"
    >
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

export default VerticalFlatBottomNACA;
