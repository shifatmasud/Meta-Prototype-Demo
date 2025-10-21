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

export interface ButtonStyles {
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  activeIconColor: string;
  borderRadius: string;
}
