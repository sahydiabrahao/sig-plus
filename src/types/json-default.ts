export interface CaseRecord {
  id: string;
  target: string;
  details: string;
}

export interface CaseMetadata {
  id: string;
  title: string;
  crime: string;
  victim: string;
  date: string;
  resume: string;
}

export interface CaseJson {
  case: CaseMetadata;
  records: CaseRecord[];
}

export function createEmptyRecord(): CaseRecord {
  return {
    id: crypto.randomUUID(),
    target: '',
    details: '',
  };
}

export function createNewCase(caseId: string): CaseJson {
  return {
    case: {
      id: caseId,
      title: 'Titulo',
      crime: 'Fato',
      victim: 'Nome',
      date: 'XX/XX/XXXX',
      resume: 'Resumo',
    },
    records: [createEmptyRecord()],
  };
}

export function normalizeCaseJson(raw: Partial<CaseJson>): CaseJson {
  const caseId = raw?.case?.id ?? 'sem-id';
  const base = createNewCase(caseId);

  const normalizedCase: CaseMetadata = {
    ...base.case,
    ...raw.case,
  };

  const normalizedRecords: CaseRecord[] = Array.isArray(raw.records)
    ? raw.records.map(
        (r: Partial<CaseRecord>): CaseRecord => ({
          ...createEmptyRecord(),
          ...r,
          id: r.id ?? crypto.randomUUID(),
          target: r.target ?? '',
          details: r.details ?? '',
        })
      )
    : base.records;

  return {
    case: normalizedCase,
    records: normalizedRecords,
  };
}
