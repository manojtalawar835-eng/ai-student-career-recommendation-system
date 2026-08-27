import React from 'react';

interface RadarChartProps {
  studentStats: {
    programming: number;
    dataAnalytics: number;
    systemDesign: number;
    problemSolving: number;
    communication: number;
    toolsAndDevOps: number;
  };
  benchmarkStats?: {
    programming: number;
    dataAnalytics: number;
    systemDesign: number;
    problemSolving: number;
    communication: number;
    toolsAndDevOps: number;
  };
  targetCareerName?: string;
  size?: number;
}

const AXES = [
  { key: 'programming', label: 'Programming' },
  { key: 'dataAnalytics', label: 'Data & Analytics' },
  { key: 'systemDesign', label: 'System Design' },
  { key: 'problemSolving', label: 'Problem Solving' },
  { key: 'communication', label: 'Communication' },
  { key: 'toolsAndDevOps', label: 'DevOps & Tools' },
] as const;

export const RadarChart: React.FC<RadarChartProps> = ({
  studentStats,
  benchmarkStats,
  targetCareerName = 'Target Role Benchmark',
  size = 320,
}) => {
  const center = size / 2;
  const radius = (size / 2) - 45;
  const totalAxes = AXES.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Compute coordinate on radar
  const getCoordinates = (value: number, index: number) => {
    const clamped = Math.max(10, Math.min(100, value));
    const r = (clamped / 100) * radius;
    const angle = index * angleSlice - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Student polygon points
  const studentPoints = AXES.map((axis, i) => {
    const val = studentStats[axis.key] || 50;
    const { x, y } = getCoordinates(val, i);
    return `${x},${y}`;
  }).join(' ');

  // Benchmark polygon points (if provided)
  const benchmarkPoints = benchmarkStats
    ? AXES.map((axis, i) => {
        const val = benchmarkStats[axis.key] || 75;
        const { x, y } = getCoordinates(val, i);
        return `${x},${y}`;
      }).join(' ')
    : null;

  // Grid concentric levels (25, 50, 75, 100)
  const levels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Concentric Web Polygons */}
        {levels.map((level, lvlIdx) => {
          const levelRadius = radius * level;
          const polyPoints = AXES.map((_, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const x = center + levelRadius * Math.cos(angle);
            const y = center + levelRadius * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={`web-${lvlIdx}`}
              points={polyPoints}
              fill="none"
              stroke="#27272a"
              strokeWidth="1"
              strokeDasharray={lvlIdx === levels.length - 1 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axis Spokes */}
        {AXES.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const outerX = center + radius * Math.cos(angle);
          const outerY = center + radius * Math.sin(angle);

          // Label placement with offset
          const labelDist = radius + 22;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle);

          return (
            <g key={`axis-${axis.key}`}>
              <line
                x1={center}
                y1={center}
                x2={outerX}
                y2={outerY}
                stroke="#3f3f46"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-bold font-mono fill-zinc-400 tracking-tight uppercase"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        {/* Target Benchmark Polygon (Behind) */}
        {benchmarkPoints && (
          <polygon
            points={benchmarkPoints}
            fill="rgba(249, 115, 22, 0.15)"
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="transition-all duration-500"
          />
        )}

        {/* Student Capability Polygon (Front) */}
        <polygon
          points={studentPoints}
          fill="rgba(59, 130, 246, 0.25)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          className="transition-all duration-500"
        />

        {/* Student Data Point Circles */}
        {AXES.map((axis, i) => {
          const val = studentStats[axis.key] || 50;
          const { x, y } = getCoordinates(val, i);
          return (
            <circle
              key={`dot-${axis.key}`}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              stroke="#0c0c0e"
              strokeWidth="2"
              className="transition-all duration-500 shadow-sm"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-3 text-xs text-zinc-400 font-mono font-bold uppercase">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shadow-sm"></span>
          <span>Your Capability</span>
        </div>
        {benchmarkStats && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block border border-dashed border-orange-400"></span>
            <span>{targetCareerName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
