import React, { useState, useMemo } from 'react';
import { StudentRecord } from '../types/student';
import { Search, Filter, ChevronLeft, ChevronRight, Download, ArrowUpDown, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  records: StudentRecord[];
}

export const StudentDataTable: React.FC<Props> = ({ records }) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortField, setSortField] = useState<keyof StudentRecord>('recordNumber');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Extract distinct schools from records
  const availableSchools = useMemo(() => {
    const set = new Set<string>();
    records.forEach(r => {
      if (r.school) set.add(r.school);
    });
    return Array.from(set).sort();
  }, [records]);

  // Filtering
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // School filter
      if (selectedSchool !== 'ALL' && r.school !== selectedSchool) {
        return false;
      }

      // Search by record number
      if (searchQuery.trim() !== '') {
        const cleanQuery = searchQuery.trim().replace(/^#/, '');
        const recordStr = r.recordNumber.toString();
        if (!recordStr.includes(cleanQuery)) {
          return false;
        }
      }

      return true;
    });
  }, [records, selectedSchool, searchQuery]);

  // Sorting
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA === undefined) return 1;
      if (valB === undefined) return -1;

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: keyof StudentRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStudyTimeLabel = (val: number) => {
    switch (val) {
      case 1: return '< 2 hrs';
      case 2: return '2 - 5 hrs';
      case 3: return '5 - 10 hrs';
      case 4: return '> 10 hrs';
      default: return `${val}`;
    }
  };

  const downloadFilteredCsv = () => {
    const headers = ['RecordNumber', 'School', 'Sex', 'Age', 'StudyTime', 'Absences', 'G1', 'G2', 'G3', 'Status'];
    const rows = sortedRecords.map(r => [
      r.recordNumber,
      r.school,
      r.sex || '',
      r.age || '',
      r.studytime,
      r.absences,
      r.G1,
      r.G2,
      r.G3,
      r.G3 >= 10 ? 'Pass' : 'Fail'
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `student_marks_filtered_${selectedSchool}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section aria-labelledby="table-heading" className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 mb-8">
      {/* Table Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-200 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E5BB8]"></span>
            <h2 id="table-heading" className="text-base font-bold text-slate-900">
              Student Academic Dataset Table
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Individual student academic marks. Showing {paginatedRecords.length} of {filteredRecords.length} filtered records (First 10 shown by default).
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search by record number */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Record # (e.g. 48)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8]/30 focus:border-[#1E5BB8] w-48 sm:w-56"
            />
          </div>

          {/* Filter by school */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedSchool}
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setCurrentPage(1);
              }}
              className="py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8]/30 focus:border-[#1E5BB8]"
            >
              <option value="ALL">All Schools ({records.length})</option>
              {availableSchools.map(sch => (
                <option key={sch} value={sch}>
                  School {sch} ({records.filter(r => r.school === sch).length})
                </option>
              ))}
            </select>
          </div>

          {/* Rows per page */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1.5 px-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8]/30"
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
            <option value={100}>100 rows</option>
          </select>

          {/* Export filtered CSV */}
          <button
            onClick={downloadFilteredCsv}
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="mb-4 px-3.5 py-2 bg-blue-50/70 border border-blue-200/60 rounded-lg flex items-center gap-2 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-[#1E5BB8] shrink-0" />
        <span>
          <strong>Data Privacy Specification:</strong> Student names are not included in the dataset and are identified strictly using unique <strong>Record Numbers</strong> (e.g., Record #1, Record #2). Marks are evaluated on a 0 to 20 scale.
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
          <thead className="bg-slate-50 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th
                onClick={() => handleSort('recordNumber')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Record #</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('school')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>School</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Sex</th>
              <th
                onClick={() => handleSort('age')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Age</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('studytime')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Study Time</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('absences')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Absences</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('G1')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>G1 (/20)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('G2')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>G2 (/20)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('G3')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-100 transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1 text-[#1E5BB8]">
                  <span>G3 Final (/20)</span>
                  <ArrowUpDown className="w-3 h-3 text-[#1E5BB8]" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-500">
                  No records match your filter criteria.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r) => {
                const isPassed = r.G3 >= 10;
                return (
                  <tr key={r.recordNumber} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3.5 font-bold text-[#1E5BB8]">
                      Record #{r.recordNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {r.school}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{r.sex || '-'}</td>
                    <td className="py-2.5 px-3 text-slate-600">{r.age ?? '-'}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">
                      {getStudyTimeLabel(r.studytime)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {r.absences} days
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                      {r.G1}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                      {r.G2}
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 bg-slate-50/60">
                      <span className={r.G3 >= 16 ? 'text-emerald-700' : r.G3 < 10 ? 'text-rose-700' : 'text-slate-900'}>
                        {r.G3}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          Failed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 mt-4 text-xs text-slate-600">
        <div>
          Showing <span className="font-semibold text-slate-900">{filteredRecords.length > 0 ? startIndex + 1 : 0}</span> to{' '}
          <span className="font-semibold text-slate-900">{Math.min(startIndex + pageSize, filteredRecords.length)}</span> of{' '}
          <span className="font-semibold text-slate-900">{filteredRecords.length}</span> students
        </div>

        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={validCurrentPage === 1}
            type="button"
            className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-2 font-medium">
            Page {validCurrentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={validCurrentPage === totalPages}
            type="button"
            className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
