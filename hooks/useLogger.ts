import { useState, useCallback } from 'https://esm.sh/react@18';
import { LogEntry, LogType } from '../types.ts';

export const useLogger = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, type: LogType) => {
    const newLog: LogEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 100)); // Keep last 100 logs
  }, []);

  return { logs, addLog };
};