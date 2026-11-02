import React, { useEffect, useRef } from 'react';
import ChartJS from './chartSetup';
import { SchoolComparison } from '../../types/student';

interface Props {
  schools: SchoolComparison[];
}

export const SchoolPerformanceChart: React.FC<Props> = ({ schools }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current || schools.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = schools.map(s => `${s.school} (${s.count} students)`);
    const dataG3 = schools.map(s => s.avgG3);
    const dataG1 = schools.map(s => s.avgG1);
    const dataG2 = schools.map(s => s.avgG2);

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Avg G1 Marks',
            data: dataG1,
            backgroundColor: 'rgba(147, 197, 253, 0.75)',
            borderColor: '#93C5FD',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: 'Avg G2 Marks',
            data: dataG2,
            backgroundColor: 'rgba(96, 165, 250, 0.75)',
            borderColor: '#60A5FA',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: 'Avg G3 (Final Marks)',
            data: dataG3,
            backgroundColor: 'rgba(30, 91, 184, 0.9)',
            borderColor: '#1E5BB8',
            borderWidth: 2,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { size: 11, weight: 'bold' },
              color: '#334155'
            }
          },
          tooltip: {
            backgroundColor: '#0F172A',
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y} / 20`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
            ticks: {
              stepSize: 2,
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
  }, [schools]);

  return (
    <div className="w-full h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};
