'use client';
import React, { JSX, useEffect, useState } from 'react';

type VerticalFlatBottomNACAProps = {
  height?: number;
  width?: number;
  thicknessRatio?: number;
  linesCount?: number;
  topOffset?: number;
  rotationAngle?: number; // in degrees
};

const VerticalFlatBottomNACA: React.FC<VerticalFlatBottomNACAProps> = ({
  height = 300,
  width = 200,
  thicknessRatio = 0.35,
  linesCount = 10,
  topOffset = -10,
  rotationAngle = 0,
}) => {
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

      const shiftX = topOffset * (1 - yc); // top shifted right
      const flatX = halfWidth + shiftX;
      const curveX = halfWidth + thickness;

      leftPoints.push([flatX, y]); // angled side
      rightPoints.unshift([curveX, y]); // curved side
    }

    const fullPath =
      [...leftPoints, ...rightPoints]
        .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x},${y}`)
        .join(' ') + ' Z';

    setPathData(fullPath);

    // Create guide lines inside the profile
    const offset = 2;
    const lines = Array.from({ length: linesCount }, (_, i) => {
      const y = ((i + 1) * height) / (linesCount + 1);
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

      const shiftX = topOffset * (1 - yc);
      const leftX = halfWidth + shiftX;
      const rightX = halfWidth + thickness;

      return (
        <g key={i}>
          <line
            x1={leftX}
            y1={y - offset}
            x2={rightX}
            y2={y - offset}
            stroke="gray"
            strokeWidth={1.5}
          />
          <line
            x1={leftX}
            y1={y + offset}
            x2={rightX}
            y2={y + offset}
            stroke="gray"
            strokeWidth={1.5}
          />
        </g>
      );
    });

    setGuideLines(lines);
  }, [height, width, thicknessRatio, linesCount, topOffset]);

  if (!pathData || !guideLines) return null;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <clipPath id="clip">
          <path d={pathData} />
        </clipPath>
      </defs>

      <g transform={`rotate(${rotationAngle}, 0, ${height})`}>
        {guideLines}
        <path d={pathData} stroke="black" fill="none" strokeWidth={2} />
      </g>
    </svg>
  );
};

export default VerticalFlatBottomNACA;
