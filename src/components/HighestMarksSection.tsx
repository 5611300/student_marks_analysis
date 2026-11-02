import React from 'react';
import { SummaryStats } from '../types/student';
import { Trophy, Star, CheckCircle, Clock, School, Award, AlertCircle } from 'lucide-react';

interface Props {
  stats: SummaryStats;
}

export const HighestMarksSection: React.FC<Props> = ({ stats }) => {
  const topRecords = stats.topStudentsG3;
  const topRecordNumbers = topRecords.map(r => `Record #${r.recordNumber}`).join(', ');

  const getStudyTimeLabel = (val: number) => {
    switch (val) {
      case 1: return '< 2 hrs / wk';
      case 2: return '2 - 5 hrs / wk';
      case 3: return '5 - 10 hrs / wk';
      case 4: return '> 10 hrs / wk';
      default: return `${val} hrs / wk`;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Highest Marks Analysis
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Peak scores across examinations &amp; record identification of top-performing students
          </p>
        </div>
        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 self-start sm:self-auto">
          Section C: Top Achievers
        </span>
      </div>

      {/* 3 Peak Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Highest G1 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Highest G1 Mark
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{stats.highestG1}</span>
              <span className="text-xs font-semibold text-slate-400">/ 20</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">First period peak</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#1E5BB8] flex items-center justify-center font-bold">
            G1
          </div>
        </div>

        {/* Highest G2 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Highest G2 Mark
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{stats.highestG2}</span>
              <span className="text-xs font-semibold text-slate-400">/ 20</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Second period peak</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-100/70 text-indigo-700 flex items-center justify-center font-bold">
            G2
          </div>
        </div>

        {/* Highest G3 */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Highest G3 (Final)
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-amber-900">{stats.highestG3}</span>
              <span className="text-xs font-semibold text-amber-600">/ 20</span>
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">Maximum final score</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Prominent High Scorer Record Identification Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-5 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#1E5BB8] text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Top Final Marks Scorer
              </span>
              <span className="text-xs font-bold text-slate-800">
                Score: {stats.highestG3} / 20
              </span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 pt-1">
              Highest Final Marks Obtained By:{' '}
              <span className="text-[#1E5BB8] font-black">{topRecordNumbers}</span>
            </h4>
            <p className="text-xs text-slate-600">
              * Per college project requirements, students are strictly identified by dataset Record Numbers rather than personal names to maintain privacy.
            </p>
          </div>
        </div>

        {/* Cards for top records */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topRecords.slice(0, 6).map((rec) => (
            <div
              key={rec.recordNumber}
              className="bg-white rounded-lg border border-blue-100 p-3 shadow-2xs hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-extrabold text-[#1E5BB8] text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Record #{rec.recordNumber}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  G3: {rec.G3}/20
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs text-slate-600 mt-2">
                <div className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-slate-400" />
                  <span>School: <strong className="text-slate-800">{rec.school}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Study: <strong className="text-slate-800">{getStudyTimeLabel(rec.studytime)}</strong></span>
                </div>
                <div>
                  Marks: <span className="text-slate-800 font-medium">G1: {rec.G1} &bull; G2: {rec.G2}</span>
                </div>
                <div>
                  Absences: <span className="text-slate-800 font-medium">{rec.absences} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
