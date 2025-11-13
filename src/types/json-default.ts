export interface CaseRecord {
  id: string;
  status: string;
  value: string;
}

export interface CaseMetadata {
  id: string;
  title: string;
  crime: string;
  victim: string;
}

export interface CaseJson {
  version: number;
  case: CaseMetadata;
  updatedAt: string;
  records: CaseRecord[];
}
