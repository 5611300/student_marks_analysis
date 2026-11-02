import React, { useState } from 'react';
import { BookOpen, Target, Cpu, CheckCircle2, Terminal, HelpCircle, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

interface Props {
  onOpenPythonScript: () => void;
}

export const ProjectInfoSection: React.FC<Props> = ({ onOpenPythonScript }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const vivaQuestions = [
    {
      q: "1. What do G1, G2, and G3 represent in this dataset?",
      a: "In the standard student academic performance dataset, G1 represents First Period Examination marks, G2 represents Second Period Examination marks, and G3 represents the Final Examination marks. All examination marks are evaluated on a Portuguese secondary school scale of 0 to 20."
    },
    {
      q: "2. Why are Python and Pandas used for this data analysis project?",
      a: "Python is the primary language in Artificial Intelligence and Machine Learning due to its extensive ecosystem. The Pandas library provides high-performance, flexible data structures (DataFrame) to easily perform data ingestion (pd.read_csv), grouping (groupby), aggregations (mean, max, min), and filtering without writing manual nested loops."
    },
    {
      q: "3. What key correlation was discovered between study time and final marks?",
      a: "Our analysis demonstrates a positive monotonic relationship: students in Category 1 (<2 hours weekly) had the lowest mean G3, while students in Categories 3 (5-10 hours) and 4 (>10 hours) achieved significantly higher average marks and lower failure rates."
    },
    {
      q: "4. Why are student names not displayed in the dashboard?",
      a: "As per the project specification and academic research data privacy compliance (UCI Machine Learning Repository guidelines), student records do not contain personal names. Each student is uniquely identified by their Record Number (Record #1, Record #2, etc.)."
    },
    {
      q: "5. How does continuous assessment (G1 & G2) relate to final performance (G3)?",
      a: "Data analysis reveals high collinearity between G1, G2, and G3. Students with poor G1/G2 scores frequently fail G3 unless early academic intervention is provided, making early data analysis vital for educational institutions."
    }
  ];

  return (
    <section aria-labelledby="project-info-heading" className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 mb-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1E5BB8]" />
            <h2 id="project-info-heading" className="text-lg font-bold text-slate-900">
              Academic Field Project Documentation
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Second Year B.Sc. Artificial Intelligence and Machine Learning &bull; Project Details &amp; Viva Viva Notes
          </p>
        </div>
        <button
          onClick={onOpenPythonScript}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1E5BB8] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors self-start sm:self-auto"
        >
          <FileCode className="w-4 h-4" />
          <span>View Python / Pandas Script</span>
        </button>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Pillar 1: Introduction */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#1E5BB8] font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            <h3>1. Project Introduction</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            This field project investigates secondary school student academic performance using exploratory data analysis (EDA).
            Evaluating continuous period assessments (G1, G2) and final marks (G3) allows educators to identify learning gaps early,
            compare institutional outcomes, and recognize high-achieving records.
          </p>
        </div>

        {/* Pillar 2: Objectives */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#1E5BB8] font-bold text-sm mb-2">
            <Target className="w-4 h-4" />
            <h3>2. Objectives of the Project</h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed list-disc list-inside">
            <li>Compute the total cohort count and dynamic averages across G1, G2, and G3.</li>
            <li>Identify highest and lowest marks along with specific top-achieving student record numbers.</li>
            <li>Generate interactive bar charts comparing schools (GP vs MS) and study durations.</li>
            <li>Categorize final grade distributions out of 20 to determine pass/fail proportions.</li>
          </ul>
        </div>

        {/* Pillar 3: Tools Used */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#1E5BB8] font-bold text-sm mb-2">
            <Cpu className="w-4 h-4" />
            <h3>3. Tools &amp; Technologies Used</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block">Python 3</strong>
              <span className="text-slate-500 text-[11px]">Core programming language for AIML</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block">Pandas Library</strong>
              <span className="text-slate-500 text-[11px]">DataFrame aggregation &amp; filtering</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block">Matplotlib / Chart.js</strong>
              <span className="text-slate-500 text-[11px]">Dynamic visual charts &amp; plotting</span>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-slate-800 block">HTML5 / Tailwind CSS</strong>
              <span className="text-slate-500 text-[11px]">Modern responsive viva dashboard</span>
            </div>
          </div>
        </div>

        {/* Pillar 4: Conclusion */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#1E5BB8] font-bold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3>4. Analytical Conclusion</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Data analysis proves that final student marks are not isolated events; continuous monitoring throughout G1 and G2
            provides high diagnostic power. Furthermore, students investing 5+ hours of weekly study and maintaining regular
            attendance consistently secure higher pass percentages and distinction marks.
          </p>
        </div>
      </div>

      {/* Step-by-Step Instructions to Run Prototype */}
      <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-3">
          <Terminal className="w-4 h-4 text-[#1E5BB8]" />
          <h3>How to Run the Prototype (Step-by-Step Viva Guide)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="bg-white p-3.5 rounded-lg border border-blue-100 shadow-2xs">
            <div className="font-bold text-[#1E5BB8] mb-1.5 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1E5BB8] text-white flex items-center justify-center text-[10px]">A</span>
              Running the Web Dashboard:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
              <li>Ensure Node.js is installed on your computer.</li>
              <li>Open terminal in the project directory and run: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">npm install</code></li>
              <li>Start the development server: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">npm run dev</code></li>
              <li>Open browser at: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">http://localhost:3000</code></li>
              <li>Click <strong>Upload CSV</strong> to test with your own file or view the loaded dataset.</li>
            </ol>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-blue-100 shadow-2xs">
            <div className="font-bold text-[#1E5BB8] mb-1.5 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#1E5BB8] text-white flex items-center justify-center text-[10px]">B</span>
              Running the Standalone Python &amp; Pandas Script:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
              <li>Install dependencies: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">pip install pandas matplotlib</code></li>
              <li>Place <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">student_data.csv</code> in the same folder.</li>
              <li>Download the script using the button above or copy the code snippet.</li>
              <li>Run the analysis: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-800 font-mono">python student_analysis.py</code></li>
              <li>All statistics will print to the console and matplotlib charts will pop up.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* College Viva Questions & Answers Accordion */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-[#1E5BB8]" />
          <h3 className="text-sm font-bold text-slate-900">
            Frequently Asked Viva Questions (B.Sc. AIML Examiner Preparation)
          </h3>
        </div>

        <div className="space-y-2">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span>{item.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 py-3 bg-white text-xs text-slate-600 border-t border-slate-200 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
