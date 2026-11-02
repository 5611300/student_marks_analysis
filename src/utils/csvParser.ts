import Papa from 'papaparse';
import { StudentRecord } from '../types/student';

export interface ParseResult {
  records: StudentRecord[];
  errors: string[];
  warnings: string[];
  fileName: string;
  rowCount: number;
}

const REQUIRED_COLUMNS = ['G1', 'G2', 'G3'];

/**
 * Validates and parses CSV text into typed StudentRecord objects
 */
export function parseStudentCsv(csvContent: string, fileName = 'student_data.csv'): ParseResult {
  const result = Papa.parse<Record<string, string>>(csvContent.trim(), {
    header: true,
    skipEmptyLines: 'greedy',
    dynamicTyping: false
  });

  const errors: string[] = [];
  const warnings: string[] = [];

  if (result.errors && result.errors.length > 0) {
    const errorMessages = result.errors.slice(0, 3).map(e => `Row ${e.row ?? 'unknown'}: ${e.message}`);
    errors.push(...errorMessages);
  }

  const rawRows = result.data;
  if (!rawRows || rawRows.length === 0) {
    return {
      records: [],
      errors: ['The uploaded CSV file is empty or contains no readable data rows.'],
      warnings: [],
      fileName,
      rowCount: 0
    };
  }

  // Check columns (case-insensitive search for flexible matching)
  const headers = Object.keys(rawRows[0]).map(h => h.trim());
  const headerMap: Record<string, string> = {};
  for (const h of headers) {
    headerMap[h.toLowerCase()] = h;
  }

  const missingColumns: string[] = [];
  for (const req of REQUIRED_COLUMNS) {
    if (!headerMap[req.toLowerCase()]) {
      missingColumns.push(req);
    }
  }

  if (missingColumns.length > 0) {
    return {
      records: [],
      errors: [
        `Missing required column(s): ${missingColumns.join(', ')}.`,
        `The CSV must contain examination columns: G1 (First period), G2 (Second period), and G3 (Final marks). Found headers: [${headers.slice(0, 8).join(', ')}...]`
      ],
      warnings: [],
      fileName,
      rowCount: 0
    };
  }

  const getCol = (row: Record<string, string>, colName: string): string => {
    const matched = headerMap[colName.toLowerCase()];
    return matched ? (row[matched] ?? '').trim() : '';
  };

  const records: StudentRecord[] = [];

  rawRows.forEach((row, index) => {
    const recordNumber = index + 1; // 1-indexed record number as required

    const g1Raw = parseFloat(getCol(row, 'G1'));
    const g2Raw = parseFloat(getCol(row, 'G2'));
    const g3Raw = parseFloat(getCol(row, 'G3'));

    if (isNaN(g1Raw) || isNaN(g2Raw) || isNaN(g3Raw)) {
      warnings.push(`Record #${recordNumber} skipped due to non-numeric mark values.`);
      return;
    }

    // Clamp between 0 and 20 as specified in requirements
    const G1 = Math.max(0, Math.min(20, Math.round(g1Raw * 10) / 10));
    const G2 = Math.max(0, Math.min(20, Math.round(g2Raw * 10) / 10));
    const G3 = Math.max(0, Math.min(20, Math.round(g3Raw * 10) / 10));

    const school = getCol(row, 'school') || 'GP';
    const studytimeRaw = parseInt(getCol(row, 'studytime'), 10);
    const studytime = !isNaN(studytimeRaw) && studytimeRaw >= 1 && studytimeRaw <= 4 ? studytimeRaw : 2;
    const absencesRaw = parseInt(getCol(row, 'absences'), 10);
    const absences = !isNaN(absencesRaw) ? Math.max(0, absencesRaw) : 0;
    const ageRaw = parseInt(getCol(row, 'age'), 10);
    const age = !isNaN(ageRaw) ? ageRaw : undefined;
    const sex = getCol(row, 'sex') || undefined;

    records.push({
      recordNumber,
      school,
      sex,
      age,
      studytime,
      absences,
      G1,
      G2,
      G3,
      failures: parseInt(getCol(row, 'failures'), 10) || 0,
      activities: getCol(row, 'activities'),
      internet: getCol(row, 'internet'),
      higher: getCol(row, 'higher'),
      health: parseInt(getCol(row, 'health'), 10) || undefined,
      data_source: getCol(row, 'data_source')
    });
  });

  if (records.length === 0) {
    errors.push('No valid student records could be parsed from the CSV file.');
  }

  return {
    records,
    errors,
    warnings: warnings.slice(0, 5), // Limit warning messages
    fileName,
    rowCount: records.length
  };
}
