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
    },
    records: [createEmptyRecord()],
  };
}
