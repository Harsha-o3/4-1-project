import React from 'react';
import { useOfflineSync } from '../../hooks/useOfflineSync';
import { Wifi, WifiOff, FolderSync as Sync, AlertCircle } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const { isOnline, pendingSync, syncPendingData } = useOfflineSync();

  if (isOnline && pendingSync === 0) return null;

  return (
    <div className={`px-4 py-2 text-sm font-medium ${
      !isOnline ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4" />
              <span>You're offline</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4" />
              <span>Online - {pendingSync} items pending sync</span>
            </>
          )}
        </div>
        
        {isOnline && pendingSync > 0 && (
          <button
            onClick={syncPendingData}
            className="flex items-center space-x-1 px-2 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
          >
            <Sync className="w-3 h-3" />
            <span>Sync Now</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;