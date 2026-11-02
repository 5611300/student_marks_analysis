import React from 'react';
import { SummaryStats } from '../types/student';
import { AverageMarksChart } from './charts/AverageMarksChart';
import { ArrowUpRight, ArrowDownRight, BookOpen, Layers } from 'lucide-react';

interface Props {
  stats: SummaryStats;
}

export const AverageMarksSection: React.FC<Props> = ({ stats }) => {
  const g1ToG2Diff = Number((stats.avgG2 - stats.avgG1).toFixed(2));
  const g2ToG3Diff = Number((stats.avgG3 - stats.avgG2).toFixed(2));
  const overallProgression = Number((stats.avgG3 - stats.avgG1).toFixed(2));

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5BB8]"></span>
            <h3 className="text-base font-bold text-slate-900">
              Average Marks Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Mean performance tracked across First Period (G1), Second Period (G2), and Final Exam (G3)
          </p>
        </div>
        <span className="text-[11px] font-semibold text-[#1E5BB8] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto">
          Section B: Examination Progression
        </span>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* G1 Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">G1 Average</span>
            <span>First Period</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">{stats.avgG1}</span>
            <span className="text-xs font-semibold text-slate-400">/ 20</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {((stats.avgG1 / 20) * 100).toFixed(1)}% benchmark
          </div>
        </div>

        {/* G2 Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">G2 Average</span>
            <span>Second Period</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-900">{stats.avgG2}</span>
            <span className="text-xs font-semibold text-slate-400">/ 20</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] mt-1">
            {g1ToG2Diff >= 0 ? (
              <span className="text-emerald-600 font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +{g1ToG2Diff} from G1
              </span>
            ) : (
              <span className="text-rose-600 font-semibold flex items-center">
                <ArrowDownRight className="w-3 h-3" /> {g1ToG2Diff} from G1
              </span>
            )}
          </div>
        </div>

        {/* G3 Card */}
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-blue-700 mb-1">
            <span className="font-semibold text-[#1E5BB8]">G3 Average</span>
            <span className="font-bold">Final Marks</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#1E5BB8]">{stats.avgG3}</span>
            <span className="text-xs font-semibold text-blue-400">/ 20</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] mt-1">
            {overallProgression >= 0 ? (
              <span className="text-emerald-600 font-semibold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +{overallProgression} net change from G1
              </span>
            ) : (
              <span className="text-rose-600 font-semibold flex items-center">
                <ArrowDownRight className="w-3 h-3" /> {overallProgression} net change from G1
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chart container with title */}
      <div>
        <div className="mb-2">
          <h4 className="text-sm font-bold text-slate-800">
            Average Marks Across Examinations
          </h4>
          <p className="text-xs text-slate-500">Visual comparison of student mean performance in G1, G2, and G3</p>
        </div>
        <AverageMarksChart stats={stats} />
      </div>

      {/* Educational observation note for viva */}
      <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5 text-xs text-slate-600">
        <BookOpen className="w-4 h-4 text-[#1E5BB8] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Academic Insight: </span>
          The average scores across the three examination periods remain consistently around{' '}
          <strong className="text-slate-900">{stats.avgG3} / 20</strong>. Students who maintain steady
          continuous assessment marks in G1 and G2 demonstrate strong correlation with their final G3 results.
        </div>
      </div>
    </div>
  );
};
