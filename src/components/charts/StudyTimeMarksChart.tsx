import React, { useEffect, useRef } from 'react';
import ChartJS from './chartSetup';
import { StudyTimeAnalysis } from '../../types/student';

interface Props {
  studyTimeData: StudyTimeAnalysis[];
}

export const StudyTimeMarksChart: React.FC<Props> = ({ studyTimeData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current || studyTimeData.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const labels = studyTimeData.map(s => `${s.label} (${s.count} students)`);
    const dataG3 = studyTimeData.map(s => s.avgG3);

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Average Final Marks (G3)',
            data: dataG3,
            backgroundColor: [
              'rgba(245, 158, 11, 0.75)',
              'rgba(59, 130, 246, 0.75)',
              'rgba(30, 91, 184, 0.85)',
              'rgba(16, 185, 129, 0.85)'
            ],
            borderColor: [
              '#D97706',
              '#2563EB',
              '#1E5BB8',
              '#059669'
            ],
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
                const item = studyTimeData[context.dataIndex];
                return `Average G3: ${context.parsed.y} / 20 (${item.count} students)`;
              }
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
              text: 'Average G3 Marks (out of 20)',
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
  }, [studyTimeData]);

  return (
    <div className="w-full h-72">
      <canvas ref={canvasRef} />
    </div>
  );
};
