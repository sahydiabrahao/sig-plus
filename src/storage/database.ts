import { CaseStatus } from '@/types/json-default';

const DB_NAME = 'investigate-fs';
const STORE_HANDLES = 'handles';
const KEY = 'rootDir';
const DB_VERSION = 2;
const STORE_STATUS = 'case-status';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_HANDLES)) {
        db.createObjectStore(STORE_HANDLES);
      }

      if (!db.objectStoreNames.contains(STORE_STATUS)) {
        db.createObjectStore(STORE_STATUS);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDirectoryHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_HANDLES, 'readwrite');
    const store = tx.objectStore(STORE_HANDLES);
    store.put(handle, KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadDirectoryHandle(): Promise<FileSystemDirectoryHandle | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_HANDLES, 'readonly');
    const store = tx.objectStore(STORE_HANDLES);
    const req = store.get(KEY);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function clearDirectoryHandle(): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_HANDLES, 'readwrite');
    const store = tx.objectStore(STORE_HANDLES);
    store.delete(KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveCaseStatus(fileKey: string, status: CaseStatus): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_STATUS, 'readwrite');
    const store = tx.objectStore(STORE_STATUS);
    store.put(status, fileKey);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadAllCaseStatus(): Promise<Record<string, CaseStatus>> {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_STATUS, 'readonly');
    const store = tx.objectStore(STORE_STATUS);

    const reqKeys = store.getAllKeys();
    const reqValues = store.getAll();

    reqKeys.onerror = () => reject(reqKeys.error);
    reqValues.onerror = () => reject(reqValues.error);

    reqKeys.onsuccess = () => {
      reqValues.onsuccess = () => {
        const keys = reqKeys.result as string[];
        const values = reqValues.result as CaseStatus[];

        const map: Record<string, CaseStatus> = {};
        keys.forEach((key, i) => {
          map[key] = values[i];
        });

        resolve(map);
      };
    };
  });
}
