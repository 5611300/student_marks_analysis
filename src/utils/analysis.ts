import { GradeDistribution, SchoolComparison, StudentRecord, StudyTimeAnalysis, SummaryStats } from '../types/student';

/**
 * Calculates summary statistics equivalent to Pandas:
 * df['G1'].mean(), df['G3'].max(), df['G3'].min(), etc.
 */
export function calculateSummaryStats(records: StudentRecord[]): SummaryStats {
  if (records.length === 0) {
    return {
      totalStudents: 0,
      avgG1: 0,
      avgG2: 0,
      avgG3: 0,
      highestG1: 0,
      highestG2: 0,
      highestG3: 0,
      lowestG1: 0,
      lowestG2: 0,
      lowestG3: 0,
      topStudentsG3: []
    };
  }

  let sumG1 = 0;
  let sumG2 = 0;
  let sumG3 = 0;
  let highestG1 = records[0].G1;
  let highestG2 = records[0].G2;
  let highestG3 = records[0].G3;
  let lowestG1 = records[0].G1;
  let lowestG2 = records[0].G2;
  let lowestG3 = records[0].G3;

  for (const record of records) {
    sumG1 += record.G1;
    sumG2 += record.G2;
    sumG3 += record.G3;

    if (record.G1 > highestG1) highestG1 = record.G1;
    if (record.G1 < lowestG1) lowestG1 = record.G1;

    if (record.G2 > highestG2) highestG2 = record.G2;
    if (record.G2 < lowestG2) lowestG2 = record.G2;

    if (record.G3 > highestG3) highestG3 = record.G3;
    if (record.G3 < lowestG3) lowestG3 = record.G3;
  }

  const total = records.length;
  const avgG1 = Number((sumG1 / total).toFixed(2));
  const avgG2 = Number((sumG2 / total).toFixed(2));
  const avgG3 = Number((sumG3 / total).toFixed(2));

  // Find all records that achieved highest final marks (G3)
  const topStudentsG3 = records.filter(r => r.G3 === highestG3);

  return {
    totalStudents: total,
    avgG1,
    avgG2,
    avgG3,
    highestG1,
    highestG2,
    highestG3,
    lowestG1,
    lowestG2,
    lowestG3,
    topStudentsG3
  };
}

/**
 * Compares schools performance (e.g. GP vs MS), equivalent to:
 * df.groupby('school')[['G1', 'G2', 'G3']].mean()
 */
export function calculateSchoolComparison(records: StudentRecord[]): SchoolComparison[] {
  const groups: Record<string, { sumG1: number; sumG2: number; sumG3: number; maxG3: number; count: number }> = {};

  for (const r of records) {
    const school = r.school || 'Unknown';
    if (!groups[school]) {
      groups[school] = { sumG1: 0, sumG2: 0, sumG3: 0, maxG3: r.G3, count: 0 };
    }
    groups[school].sumG1 += r.G1;
    groups[school].sumG2 += r.G2;
    groups[school].sumG3 += r.G3;
    if (r.G3 > groups[school].maxG3) {
      groups[school].maxG3 = r.G3;
    }
    groups[school].count += 1;
  }

  const schoolFullNames: Record<string, string> = {
    GP: 'Gabriel Pereira (GP)',
    MS: 'Mousinho da Silveira (MS)'
  };

  return Object.keys(groups).map(school => {
    const data = groups[school];
    return {
      school,
      schoolName: schoolFullNames[school] || school,
      count: data.count,
      avgG1: Number((data.sumG1 / data.count).toFixed(2)),
      avgG2: Number((data.sumG2 / data.count).toFixed(2)),
      avgG3: Number((data.sumG3 / data.count).toFixed(2)),
      highestG3: data.maxG3
    };
  });
}

/**
 * Compares average G3 marks across the 4 study-time categories:
 * 1: <2 hours, 2: 2-5 hours, 3: 5-10 hours, 4: >10 hours
 * Equivalent to: df.groupby('studytime')['G3'].mean()
 */
export function calculateStudyTimeAnalysis(records: StudentRecord[]): StudyTimeAnalysis[] {
  const categories = [
    { cat: 1, label: '< 2 Hours', description: 'Under 2 hours weekly' },
    { cat: 2, label: '2 - 5 Hours', description: '2 to 5 hours weekly' },
    { cat: 3, label: '5 - 10 Hours', description: '5 to 10 hours weekly' },
    { cat: 4, label: '> 10 Hours', description: 'More than 10 hours weekly' }
  ];

  return categories.map(c => {
    const matches = records.filter(r => Number(r.studytime) === c.cat);
    const count = matches.length;
    const sumG3 = matches.reduce((acc, curr) => acc + curr.G3, 0);
    const avgG3 = count > 0 ? Number((sumG3 / count).toFixed(2)) : 0;

    return {
      category: c.cat,
      label: c.label,
      description: c.description,
      count,
      avgG3
    };
  });
}

/**
 * Calculates grade distribution for G3 final marks
 * Range intervals out of 20
 */
export function calculateGradeDistribution(records: StudentRecord[]): GradeDistribution[] {
  const bins = [
    { range: '0 - 5', label: 'Fail / Very Low', min: 0, max: 5, color: '#EF4444' },
    { range: '6 - 9', label: 'Below Average', min: 6, max: 9, color: '#F97316' },
    { range: '10 - 13', label: 'Satisfactory / Pass', min: 10, max: 13, color: '#EAB308' },
    { range: '14 - 16', label: 'Good', min: 14, max: 16, color: '#3B82F6' },
    { range: '17 - 20', label: 'Excellent / Distinction', min: 17, max: 20, color: '#10B981' }
  ];

  const total = records.length || 1;

  return bins.map(bin => {
    const count = records.filter(r => r.G3 >= bin.min && r.G3 <= bin.max).length;
    const percentage = Number(((count / total) * 100).toFixed(1));
    return {
      range: bin.range,
      label: bin.label,
      min: bin.min,
      max: bin.max,
      count,
      percentage,
      color: bin.color
    };
  });
}
