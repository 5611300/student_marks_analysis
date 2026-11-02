import React from 'react';
import { Users, Award, TrendingUp, TrendingDown, Target, BarChart2 } from 'lucide-react';
import { SummaryStats } from '../types/student';

interface Props {
  stats: SummaryStats;
}

export const OverviewCards: React.FC<Props> = ({ stats }) => {
  const g3Percentage = ((stats.avgG3 / 20) * 100).toFixed(1);

  return (
    <section aria-labelledby="overview-cards-heading" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="overview-cards-heading" className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#1E5BB8]" />
            <span>Dataset Overview Summary</span>
          </h2>
          <p className="text-xs text-slate-500">Key metrics calculated dynamically from the active student dataset</p>
        </div>
        <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
          Scale: 0 to 20 Marks
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/70 rounded-bl-full pointer-events-none transition-transform group-hover:scale-105"></div>
          <div className="flex items-center justify-between mb-3 relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Students
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1E5BB8] flex items-center justify-center border border-blue-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="relative">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalStudents.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
              <span className="inline-flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
                Active Records
              </span>
              <span>Individual student entries</span>
            </div>
          </div>
        </div>

        {/* Card 2: Average Final Marks (G3) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/70 rounded-bl-full pointer-events-none transition-transform group-hover:scale-105"></div>
          <div className="flex items-center justify-between mb-3 relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Final Marks (G3)
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.avgG3}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 20</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
              <span className="inline-flex items-center text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                {g3Percentage}%
              </span>
              <span>Overall cohort performance</span>
            </div>
          </div>
        </div>

        {/* Card 3: Highest Final Marks (G3) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/70 rounded-bl-full pointer-events-none transition-transform group-hover:scale-105"></div>
          <div className="flex items-center justify-between mb-3 relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Highest Final Marks (G3)
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight text-emerald-700">
                {stats.highestG3}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 20</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Top score achieved by {stats.topStudentsG3.length} student{stats.topStudentsG3.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Lowest Final Marks (G3) */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/70 rounded-bl-full pointer-events-none transition-transform group-hover:scale-105"></div>
          <div className="flex items-center justify-between mb-3 relative">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lowest Final Marks (G3)
            </span>
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight text-rose-700">
                {stats.lowestG3}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 20</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
              <span className="inline-flex items-center text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded text-[11px]">
                Min Score
              </span>
              <span>Requires academic intervention</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
