import type { CaseJson, CaseSummary } from '@/types/json-default';

export function makeCaseSummary(params: {
  json: CaseJson;
  handle: FileSystemFileHandle;
  folderPath: string;
  folderName: string;
  fileName: string;
}): CaseSummary {
  const { json, handle, folderPath, folderName, fileName } = params;

  return {
    id: json.case.id,
    title: json.case.title,
    crime: json.case.crime,
    victim: json.case.victim,
    date: json.case.date,
    resume: json.case.resume,
    status: json.case.status,

    folderPath,
    folderName,
    fileName,
    handle,
  };
}
