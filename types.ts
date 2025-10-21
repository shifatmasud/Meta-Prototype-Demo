
export type LogType = 'event' | 'state' | 'system' | 'error';

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: LogType;
}

export interface AppState {
    likes: number;
}
