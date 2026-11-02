import React, { useEffect, useRef } from 'react';
import ChartJS from './chartSetup';
import { GradeDistribution } from '../../types/student';

interface Props {
  distribution: GradeDistribution[];
}

export const GradeDistributionChart: React.FC<Props> = ({ distribution }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current || distribution.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = distribution.map(d => `${d.range} (${d.label})`);
    const counts = distribution.map(d => d.count);
    const bgColors = distribution.map(d => d.color);

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Number of Students',
            data: counts,
            backgroundColor: bgColors.map(c => `${c}CC`),
            borderColor: bgColors,
            borderWidth: 2,
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#0F172A',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (context) => {
                const item = distribution[context.dataIndex];
                return `${context.parsed.y} Students (${item.percentage}% of cohort)`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#64748B'
            },
            grid: {
              color: '#F1F5F9'
            },
            title: {
              display: true,
              text: 'Number of Students',
              color: '#475569',
              font: { size: 12, weight: 'bold' }
            }
          },
          x: {
            ticks: {
              font: { size: 11, weight: 'bold' },
              color: '#1E293B'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [distribution]);

  return (
    <div className="w-full h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};
