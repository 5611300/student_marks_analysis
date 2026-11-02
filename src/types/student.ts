export interface StudentRecord {
  recordNumber: number; // 1-indexed record number
  school: string; // 'GP' | 'MS' or other
  sex?: string; // 'F' | 'M'
  age?: number;
  address?: string;
  famsize?: string;
  Pstatus?: string;
  Medu?: number;
  Fedu?: number;
  Mjob?: string;
  Fjob?: string;
  reason?: string;
  guardian?: string;
  traveltime?: number;
  studytime: number; // 1: <2 hrs, 2: 2-5 hrs, 3: 5-10 hrs, 4: >10 hrs
  failures?: number;
  schoolsup?: string;
  famsup?: string;
  paid?: string;
  activities?: string;
  nursery?: string;
  higher?: string;
  internet?: string;
  romantic?: string;
  famrel?: number;
  freetime?: number;
  goout?: number;
  Dalc?: number;
  Walc?: number;
  health?: number;
  absences: number;
  G1: number; // First period marks (0-20)
  G2: number; // Second period marks (0-20)
  G3: number; // Final marks (0-20)
  data_source?: string;
}

export interface SummaryStats {
  totalStudents: number;
  avgG1: number;
  avgG2: number;
  avgG3: number;
  highestG1: number;
  highestG2: number;
  highestG3: number;
  lowestG1: number;
  lowestG2: number;
  lowestG3: number;
  topStudentsG3: StudentRecord[];
}

export interface SchoolComparison {
  school: string;
  schoolName: string;
  count: number;
  avgG1: number;
  avgG2: number;
  avgG3: number;
  highestG3: number;
}

export interface StudyTimeAnalysis {
  category: number;
  label: string;
  description: string;
  count: number;
  avgG3: number;
}

export interface GradeDistribution {
  range: string;
  label: string;
  min: number;
  max: number;
  count: number;
  percentage: number;
  color: string;
}
