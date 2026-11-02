import React from 'react';
import { GradeDistribution, SchoolComparison, StudyTimeAnalysis, SummaryStats } from '../types/student';
import { AverageMarksChart } from './charts/AverageMarksChart';
import { SchoolPerformanceChart } from './charts/SchoolPerformanceChart';
import { GradeDistributionChart } from './charts/GradeDistributionChart';
import { StudyTimeMarksChart } from './charts/StudyTimeMarksChart';
import { BarChart3, School, PieChart, Clock3, Info } from 'lucide-react';

interface Props {
  stats: SummaryStats;
  schools: SchoolComparison[];
  distribution: GradeDistribution[];
  studyTimeData: StudyTimeAnalysis[];
}

export const VisualizationsSection: React.FC<Props> = ({
  stats,
  schools,
  distribution,
  studyTimeData
}) => {
  return (
    <section aria-labelledby="visualizations-heading" className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 mb-6 gap-2">
        <div>
          <h2 id="visualizations-heading" className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1E5BB8]" />
            <span>Academic Performance Visualisations</span>
          </h2>
          <p className="text-xs text-slate-500">
            Interactive analytical charts generated using Chart.js based on uploaded dataset metrics
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
          Section D: 4 Analytical Charts
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Average Marks Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1E5BB8]"></span>
                1. Average Marks Across Examinations
              </h3>
              <span className="text-[11px] font-bold text-[#1E5BB8] bg-blue-50 px-2 py-0.5 rounded">
                G1 vs G2 vs G3
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Direct comparison of mean scores attained during continuous evaluation (G1, G2) and final assessment (G3).
            </p>
            <AverageMarksChart stats={stats} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong>Finding:</strong> First period average ({stats.avgG1}) and second period ({stats.avgG2})
              closely track final average ({stats.avgG3}).
            </span>
          </div>
        </div>

        {/* Chart 2: School Performance Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <School className="w-4 h-4 text-[#1E5BB8]" />
                2. School Performance Comparison
              </h3>
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                GP vs MS Schools
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Comparing average final marks (G3) as well as continuous assessment across participating institutions.
            </p>
            <SchoolPerformanceChart schools={schools} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong>Finding:</strong> Comparison reveals school-specific distribution differences across GP (Gabriel Pereira)
              and MS (Mousinho da Silveira).
            </span>
          </div>
        </div>

        {/* Chart 3: Grade Distribution Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#1E5BB8]" />
                3. Final Grade (G3) Distribution
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Performance Ranges
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Distribution of cohort students classified into standard academic performance ranges (Fail to Distinction).
            </p>
            <GradeDistributionChart distribution={distribution} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong>Finding:</strong> The bulk of students fall into the 10–13 (Satisfactory) and 14–16 (Good) marks brackets.
            </span>
          </div>
        </div>

        {/* Chart 4: Study Time vs Marks Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-[#1E5BB8]" />
                4. Study Time vs Final Marks
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Weekly Study Habits
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Correlating student reported weekly study duration categories with average final examination marks (G3).
            </p>
            <StudyTimeMarksChart studyTimeData={studyTimeData} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong>Finding:</strong> Students dedicating over 5-10 and &gt;10 hours weekly consistently achieve higher average G3 final marks.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
