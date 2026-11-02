import React, { useState, useRef } from 'react';
import { X, Upload, FileText, AlertTriangle, CheckCircle, FileSpreadsheet, Download, RefreshCw } from 'lucide-react';
import { parseStudentCsv } from '../utils/csvParser';
import { StudentRecord } from '../types/student';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (records: StudentRecord[], fileName: string) => void;
  onLoadDefault: () => void;
  onDownloadSample: () => void;
}

export const UploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onUploadSuccess,
  onLoadDefault,
  onDownloadSample
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [warningList, setWarningList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setErrorList(['Invalid file format. Please upload a standard CSV (.csv) file.']);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setErrorList([]);
    setWarningList([]);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parseResult = parseStudentCsv(content, file.name);

      setIsProcessing(false);

      if (parseResult.errors.length > 0) {
        setErrorList(parseResult.errors);
      } else {
        if (parseResult.warnings.length > 0) {
          setWarningList(parseResult.warnings);
        }
        onUploadSuccess(parseResult.records, file.name);
        onClose();
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorList(['Failed to read file from disk. Please try again.']);
    };

    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1E5BB8] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Upload Student CSV Dataset
              </h3>
              <p className="text-xs text-slate-500">
                Upload your <code className="font-mono text-blue-800">student_data.csv</code> file for instant dynamic analysis
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

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#1E5BB8] bg-blue-50/60'
                : 'border-slate-300 hover:border-[#1E5BB8] hover:bg-slate-50/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1E5BB8] mx-auto flex items-center justify-center mb-3 shadow-2xs">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-slate-800 mb-1">
              Click to select or drag and drop your CSV here
            </div>
            <p className="text-xs text-slate-500">
              Accepts <span className="font-semibold text-slate-700">student_data.csv</span> (Comma Separated Values)
            </p>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-3 bg-blue-50 text-[#1E5BB8] rounded-lg text-xs font-semibold flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Parsing and dynamically computing statistical marks metrics...</span>
            </div>
          )}

          {/* Errors List */}
          {errorList.length > 0 && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Dataset Parsing Error:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-rose-700">
                {errorList.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Columns Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-[#1E5BB8]" />
              <span>Dataset Columns Specification:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="font-semibold text-slate-700">Required:</span> G1, G2, G3 (Marks 0-20)
              </div>
              <div>
                <span className="font-semibold text-slate-700">Optional:</span> school, studytime, absences, age, sex
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Note: The dataset does not contain student names; students are indexed as Record Numbers.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLoadDefault();
                onClose();
              }}
              type="button"
              className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-[#1E5BB8] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Default Dataset</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onDownloadSample}
              type="button"
              className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-[#1E5BB8] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sample CSV</span>
            </button>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
