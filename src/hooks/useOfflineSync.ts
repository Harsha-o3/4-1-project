import { useEffect, useState } from 'react';
import Dexie, { Table } from 'dexie';

interface OfflineRecord {
  id?: number;
  type: string;
  data: any;
  timestamp: Date;
  synced: boolean;
}

class OfflineDB extends Dexie {
  records!: Table<OfflineRecord>;

  constructor() {
    super('NabhaOfflineDB');
    this.version(1).stores({
      records: '++id, type, timestamp, synced'
    });
  }
}

const db = new OfflineDB();

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingData();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check pending sync count
    updatePendingCount();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updatePendingCount = async () => {
    const count = await db.records.where('synced').equals(false).count();
    setPendingSync(count);
  };

  const addOfflineRecord = async (type: string, data: any) => {
    await db.records.add({
      type,
      data,
      timestamp: new Date(),
      synced: false
    });
    updatePendingCount();
  };

  const syncPendingData = async () => {
    try {
      const pendingRecords = await db.records.where('synced').equals(false).toArray();
      
      for (const record of pendingRecords) {
        try {
          // Here you would implement the actual sync logic
          // For now, we'll just mark as synced
          await db.records.update(record.id!, { synced: true });
        } catch (error) {
          console.error('Failed to sync record:', record, error);
        }
      }
      
      updatePendingCount();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return {
    isOnline,
    pendingSync,
    addOfflineRecord,
    syncPendingData
  };
};