import React from 'react';
import { Upload, RotateCcw, FileSpreadsheet, Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

interface Props {
  fileName: string;
  totalRecords: number;
  onOpenUpload: () => void;
  onResetDefault: () => void;
  onOpenPythonCode: () => void;
  onDownloadCsv: () => void;
  isCustomFile: boolean;
}

export const Header: React.FC<Props> = ({
  fileName,
  totalRecords,
  onOpenUpload,
  onResetDefault,
  onOpenPythonCode,
  onDownloadCsv,
  isCustomFile
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Academic Project Banner */}
      <div className="bg-[#1E5BB8] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 font-medium">
          <GraduationCap className="w-4 h-4 text-blue-200" />
          <span>Second Year B.Sc. Artificial Intelligence and Machine Learning &bull; College Field Project</span>
        </div>
        <div className="flex items-center space-x-3 text-blue-100">
          <span>Topic: Student Marks Analysis Using Python</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">Subject: Data Analysis &amp; Visualization</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Titles */}
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E5BB8] shadow-xs">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Student Marks Analysis Dashboard
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">
                  Analyse student performance through data and visualisation.
                </p>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active Dataset Pill */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-500 font-medium">Dataset:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-[200px]" title={fileName}>
                {fileName}
              </span>
              <span className="bg-blue-100 text-[#1E5BB8] font-bold px-1.5 py-0.5 rounded text-[10px]">
                {totalRecords.toLocaleString()} rows
              </span>
            </div>

            {/* Python Code Viva Button */}
            <button
              onClick={onOpenPythonCode}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-[#1E5BB8] transition-colors shadow-xs"
              title="View Python Pandas Code for College Viva"
            >
              <Code2 className="w-4 h-4 text-[#1E5BB8]" />
              <span>Python Script &amp; Viva</span>
            </button>

            {/* Upload CSV Button */}
            <button
              onClick={onOpenUpload}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E5BB8] hover:bg-[#174894] rounded-lg transition-colors shadow-xs"
              title="Upload your student_data.csv file"
            >
              <Upload className="w-4 h-4" />
              <span>Upload CSV</span>
            </button>

            {/* Reset / Download CSV */}
            {isCustomFile ? (
              <button
                onClick={onResetDefault}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Reset to default college dataset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Default</span>
              </button>
            ) : (
              <button
                onClick={onDownloadCsv}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                title="Download student_data.csv"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Download CSV</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
