/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StudentRecord } from './types/student';
import { parseStudentCsv } from './utils/csvParser';
import {
  calculateSummaryStats,
  calculateSchoolComparison,
  calculateStudyTimeAnalysis,
  calculateGradeDistribution
} from './utils/analysis';
import { Header } from './components/Header';
import { OverviewCards } from './components/OverviewCards';
import { AverageMarksSection } from './components/AverageMarksSection';
import { HighestMarksSection } from './components/HighestMarksSection';
import { VisualizationsSection } from './components/VisualizationsSection';
import { StudentDataTable } from './components/StudentDataTable';
import { ProjectInfoSection } from './components/ProjectInfoSection';
import { UploadModal } from './components/UploadModal';
import { PythonScriptModal } from './components/PythonScriptModal';
import { Loader2, AlertCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [fileName, setFileName] = useState<string>('student_data.csv');
  const [isCustomFile, setIsCustomFile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPythonOpen, setIsPythonOpen] = useState<boolean>(false);

  // Load default dataset from public/student_data.csv or asset path
  const loadDefaultDataset = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      // First try /student_data.csv, fallback to /assets/aistudio/...
      let response = await fetch('/student_data.csv');
      if (!response.ok) {
        response = await fetch('/assets/aistudio/student_data_extended_synthetic_cf888a35.csv');
      }
      if (!response.ok) {
        throw new Error(`Failed to load dataset: Server returned status ${response.status}`);
      }
      const csvText = await response.text();
      const parseResult = parseStudentCsv(csvText, 'student_data.csv');

      if (parseResult.errors.length > 0) {
        setLoadError(parseResult.errors.join(' '));
      } else {
        setRecords(parseResult.records);
        setFileName('student_data.csv');
        setIsCustomFile(false);
      }
    } catch (err: any) {
      console.error('Error fetching CSV:', err);
      setLoadError(err.message || 'Unable to load default student_data.csv');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDefaultDataset();
  }, [loadDefaultDataset]);

  // Dynamic statistics calculations
  const summaryStats = useMemo(() => calculateSummaryStats(records), [records]);
  const schoolComparison = useMemo(() => calculateSchoolComparison(records), [records]);
  const studyTimeData = useMemo(() => calculateStudyTimeAnalysis(records), [records]);
  const gradeDistribution = useMemo(() => calculateGradeDistribution(records), [records]);

  // Handlers
  const handleUploadSuccess = (uploadedRecords: StudentRecord[], uploadedFileName: string) => {
    setRecords(uploadedRecords);
    setFileName(uploadedFileName);
    setIsCustomFile(true);
    setLoadError(null);
  };

  const handleDownloadCsv = () => {
    if (records.length === 0) return;
    const headers = [
      'school', 'sex', 'age', 'studytime', 'absences',
      'G1', 'G2', 'G3'
    ];
    const rows = records.map(r => [
      r.school,
      r.sex || 'F',
      r.age || 16,
      r.studytime,
      r.absences,
      r.G1,
      r.G2,
      r.G3
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-[#1E5BB8]">
      {/* Header with Project Title & Action Toolbar */}
      <Header
        fileName={fileName}
        totalRecords={records.length}
        onOpenUpload={() => setIsUploadOpen(true)}
        onResetDefault={loadDefaultDataset}
        onOpenPythonCode={() => setIsPythonOpen(true)}
        onDownloadCsv={handleDownloadCsv}
        isCustomFile={isCustomFile}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <Loader2 className="w-10 h-10 text-[#1E5BB8] animate-spin mb-3" />
            <div className="text-base font-bold text-slate-800">
              Loading and Analysing Student Dataset...
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Calculating statistical distributions, school comparisons, and examination averages.
            </p>
          </div>
        )}

        {/* Global Error Banner */}
        {loadError && !isLoading && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start justify-between gap-3 text-rose-800 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold block text-rose-900 mb-0.5">
                  Dataset Analysis Issue
                </strong>
                <p>{loadError}</p>
              </div>
            </div>
            <button
              onClick={loadDefaultDataset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Load</span>
            </button>
          </div>
        )}

        {!isLoading && records.length > 0 && (
          <>
            {/* Section A: Overview Cards (4 summary cards) */}
            <OverviewCards stats={summaryStats} />

            {/* Sections B & C: Average Marks Analysis & Highest Marks Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Section B: Average Marks Analysis */}
              <AverageMarksSection stats={summaryStats} />

              {/* Section C: Highest Marks Analysis */}
              <HighestMarksSection stats={summaryStats} />
            </div>

            {/* Section D: Visualisations (4 charts using Chart.js) */}
            <VisualizationsSection
              stats={summaryStats}
              schools={schoolComparison}
              distribution={gradeDistribution}
              studyTimeData={studyTimeData}
            />

            {/* Section E: Student Data Table */}
            <StudentDataTable records={records} />

            {/* Section F: Project Information */}
            <ProjectInfoSection onOpenPythonScript={() => setIsPythonOpen(true)} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Student Marks Analysis Dashboard</span>
            <span>&bull;</span>
            <span>Second Year B.Sc. AIML College Field Project</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>Tools: Python 3 &bull; Pandas &bull; Matplotlib &bull; Chart.js</span>
            <span>&bull;</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All Statistics Dynamically Calculated
            </span>
          </div>
        </div>
      </footer>

      {/* CSV Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={handleUploadSuccess}
        onLoadDefault={loadDefaultDataset}
        onDownloadSample={handleDownloadCsv}
      />

      {/* Python Viva Script Modal */}
      <PythonScriptModal
        isOpen={isPythonOpen}
        onClose={() => setIsPythonOpen(false)}
        stats={summaryStats}
      />
    </div>
  );
}
