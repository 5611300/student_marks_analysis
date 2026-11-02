import React, { useEffect, useRef } from 'react';
import ChartJS from './chartSetup';
import { SummaryStats } from '../../types/student';

interface Props {
  stats: SummaryStats;
}

export const AverageMarksChart: React.FC<Props> = ({ stats }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['G1 (First Period)', 'G2 (Second Period)', 'G3 (Final Exam)'],
        datasets: [
          {
            label: 'Average Marks (Out of 20)',
            data: [stats.avgG1, stats.avgG2, stats.avgG3],
            backgroundColor: [
              'rgba(30, 91, 184, 0.75)',
              'rgba(59, 130, 246, 0.75)',
              'rgba(14, 165, 233, 0.75)'
            ],
            borderColor: [
              '#1E5BB8',
              '#2563EB',
              '#0284C7'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
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
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (context) => `Average: ${context.parsed.y} / 20 marks`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
            ticks: {
              stepSize: 2,
              font: { size: 11, weight: 'normal' },
              color: '#64748B'
            },
            grid: {
              color: '#F1F5F9'
            },
            title: {
              display: true,
              text: 'Marks (out of 20)',
              color: '#475569',
              font: { size: 12, weight: 'bold' }
            }
          },
          x: {
            ticks: {
              font: { size: 12, weight: 'bold' },
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
  }, [stats]);

  return (
    <div className="w-full h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};
