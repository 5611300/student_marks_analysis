import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Code } from 'lucide-react';
import { SummaryStats } from '../types/student';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stats: SummaryStats;
}

export const PythonScriptModal: React.FC<Props> = ({ isOpen, onClose, stats }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const pythonScript = `# ==============================================================================
# PROJECT TITLE: Student Marks Analysis Using Python
# STUDENT: Second Year B.Sc. Artificial Intelligence & Machine Learning
# OBJECTIVE: Analyse student marks using Python, Pandas and Matplotlib.
# ==============================================================================

import pandas as pd
import matplotlib.pyplot as plt

def main():
    print("=" * 60)
    print("STUDENT MARKS ANALYSIS DASHBOARD - PYTHON ENGINE")
    print("=" * 60)

    # 1. Load the dataset
    csv_file = 'student_data.csv'
    try:
        df = pd.read_csv(csv_file)
        print(f"[*] Successfully loaded dataset: {csv_file}")
    except FileNotFoundError:
        print(f"[!] Error: '{csv_file}' not found. Please ensure the CSV is in the script directory.")
        return

    # Add 1-indexed Record Number
    df['record_number'] = df.index + 1

    # -------------------------------------------------------------------------
    # SECTION A: OVERVIEW SUMMARY METRICS
    # -------------------------------------------------------------------------
    total_students = len(df)
    avg_g3 = df['G3'].mean()
    highest_g3 = df['G3'].max()
    lowest_g3 = df['G3'].min()

    print("\\n[A] OVERVIEW SUMMARY METRICS:")
    print(f"  - Total Students Count      : {total_students}")
    print(f"  - Average Final Marks (G3)  : {avg_g3:.2f} / 20")
    print(f"  - Highest Final Marks (G3)  : {highest_g3} / 20")
    print(f"  - Lowest Final Marks (G3)   : {lowest_g3} / 20")

    # -------------------------------------------------------------------------
    # SECTION B: AVERAGE MARKS ACROSS EXAMINATIONS
    # -------------------------------------------------------------------------
    avg_g1 = df['G1'].mean()
    avg_g2 = df['G2'].mean()

    print("\\n[B] AVERAGE MARKS IN DIFFERENT EXAMINATIONS:")
    print(f"  - Average G1 Marks (Period 1) : {avg_g1:.2f} / 20")
    print(f"  - Average G2 Marks (Period 2) : {avg_g2:.2f} / 20")
    print(f"  - Average G3 Marks (Final)    : {avg_g3:.2f} / 20")

    # -------------------------------------------------------------------------
    # SECTION C: HIGHEST MARKS ANALYSIS & TOP RECORD IDENTIFICATION
    # -------------------------------------------------------------------------
    highest_g1 = df['G1'].max()
    highest_g2 = df['G2'].max()

    top_students = df[df['G3'] == highest_g3]
    top_record_ids = top_students['record_number'].tolist()

    print("\\n[C] HIGHEST MARKS ANALYSIS:")
    print(f"  - Highest Marks in G1 : {highest_g1} / 20")
    print(f"  - Highest Marks in G2 : {highest_g2} / 20")
    print(f"  - Highest Marks in G3 : {highest_g3} / 20")
    print(f"  - Top Student Record ID(s): {top_record_ids}")

    # -------------------------------------------------------------------------
    # SECTION D: SCHOOL PERFORMANCE COMPARISON (GP vs MS)
    # -------------------------------------------------------------------------
    if 'school' in df.columns:
        school_perf = df.groupby('school')['G3'].agg(['count', 'mean', 'max', 'min']).round(2)
        print("\\n[D] SCHOOL PERFORMANCE COMPARISON (G3 FINAL MARKS):")
        print(school_perf)

    # -------------------------------------------------------------------------
    # SECTION E: STUDY TIME VS MARKS CORRELATION
    # -------------------------------------------------------------------------
    if 'studytime' in df.columns:
        study_perf = df.groupby('studytime')['G3'].agg(['count', 'mean']).round(2)
        study_labels = {
            1: '< 2 hours weekly',
            2: '2 to 5 hours weekly',
            3: '5 to 10 hours weekly',
            4: '> 10 hours weekly'
        }
        study_perf.index = study_perf.index.map(lambda x: study_labels.get(x, f"Cat {x}"))
        print("\\n[E] STUDY TIME VS FINAL MARKS (G3):")
        print(study_perf)

    # -------------------------------------------------------------------------
    # SECTION F: VISUALIZATIONS USING MATPLOTLIB
    # -------------------------------------------------------------------------
    print("\\n[*] Generating visual bar charts using Matplotlib...")

    fig, axes = plt.subplots(2, 2, figsize=(12, 8))
    fig.suptitle('Student Marks Analysis Dashboard - Visualizations', fontsize=16, fontweight='bold', color='#1E5BB8')

    # Chart 1: Average Marks Across Examinations
    exam_names = ['G1 (Period 1)', 'G2 (Period 2)', 'G3 (Final)']
    exam_means = [avg_g1, avg_g2, avg_g3]
    bars1 = axes[0, 0].bar(exam_names, exam_means, color=['#1E5BB8', '#3B82F6', '#0EA5E9'], edgecolor='black')
    axes[0, 0].set_title('1. Average Marks Across Examinations', fontweight='bold')
    axes[0, 0].set_ylabel('Marks (out of 20)')
    axes[0, 0].set_ylim(0, 20)
    for bar in bars1:
        yval = bar.get_height()
        axes[0, 0].text(bar.get_x() + bar.get_width()/2.0, yval + 0.5, f"{yval:.2f}", ha='center', va='bottom', fontweight='bold')

    # Chart 2: School Performance
    if 'school' in df.columns:
        sch_data = df.groupby('school')['G3'].mean()
        axes[0, 1].bar(sch_data.index, sch_data.values, color=['#1E5BB8', '#64748B'], edgecolor='black')
        axes[0, 1].set_title('2. School Performance Comparison (Avg G3)', fontweight='bold')
        axes[0, 1].set_ylabel('Average G3 Marks (out of 20)')
        axes[0, 1].set_ylim(0, 20)
        for i, v in enumerate(sch_data.values):
            axes[0, 1].text(i, v + 0.5, f"{v:.2f}", ha='center', fontweight='bold')

    # Chart 3: Final Marks Distribution
    axes[1, 0].hist(df['G3'], bins=[0, 5, 9, 13, 16, 20], color='#10B981', edgecolor='black', rwidth=0.85)
    axes[1, 0].set_title('3. Grade Distribution (G3 Final Marks)', fontweight='bold')
    axes[1, 0].set_xlabel('Marks Range (0-20)')
    axes[1, 0].set_ylabel('Number of Students')

    # Chart 4: Study Time vs Final Marks
    if 'studytime' in df.columns:
        st_data = df.groupby('studytime')['G3'].mean()
        st_names = ['< 2h', '2-5h', '5-10h', '> 10h']
        axes[1, 1].bar([st_names[i-1] for i in st_data.index], st_data.values, color='#F59E0B', edgecolor='black')
        axes[1, 1].set_title('4. Study Time vs Average Final Marks', fontweight='bold')
        axes[1, 1].set_ylabel('Average G3 Marks (out of 20)')
        axes[1, 1].set_ylim(0, 20)
        for i, v in enumerate(st_data.values):
            axes[1, 1].text(i, v + 0.5, f"{v:.2f}", ha='center', fontweight='bold')

    plt.tight_layout()
    plt.show()
    print("[*] Analysis and visualisations completed successfully.")

if __name__ == '__main__':
    main()
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([pythonScript], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student_analysis.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E5BB8] flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                student_analysis.py (Python &amp; Pandas Source Code)
              </h3>
              <p className="text-xs text-slate-500">
                Official script for Second Year B.Sc. AIML College Field Project Viva
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Code className="w-4 h-4 text-[#1E5BB8]" />
            <span>Python 3.10+ &bull; Pandas &bull; Matplotlib</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-[#1E5BB8] text-white hover:bg-[#174894] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download student_analysis.py</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-slate-100 rounded-b-2xl">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">{pythonScript}</pre>
        </div>
      </div>
    </div>
  );
};
