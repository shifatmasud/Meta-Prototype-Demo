import React, { CSSProperties } from 'react';
import Panel from './Panel.tsx';
import { LogEntry, LogType } from '../types.ts';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface BottomPanelProps {
  logs: LogEntry[];
}

const BottomPanel: React.FC<BottomPanelProps> = ({ logs }) => {
  const { theme } = useTheme();

  const logTypeColors: { [key in LogType]: string } = {
    event: theme.colors.Color_Feedback_Success_Content_1,
    state: theme.colors.Color_Feedback_Info_Content_1,
    system: theme.colors.Color_Feedback_Warning_Content_1,
    error: theme.colors.Color_Feedback_Error_Content_1,
  };

  const styles: { [key: string]: CSSProperties } = {
      console: {
          fontFamily: 'monospace',
          fontSize: theme.typography.Type_Readable_Label_S_Size,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          height: '100%',
          overflowY: 'auto',
      },
      emptyLog: {
          color: theme.colors.Color_Neutral_Content_3,
      },
      logEntry: {
          display: 'flex',
          alignItems: 'flex-start',
      },
      timestamp: {
          color: theme.colors.Color_Neutral_Content_3,
          marginRight: theme.spacing.Space_S,
      },
      logType: {
          marginRight: theme.spacing.Space_S,
          fontWeight: 'bold',
      },
      message: {
          flex: 1,
          color: theme.colors.Color_Neutral_Content_1,
          whiteSpace: 'pre-wrap',
      }
  }

  return (
    <Panel title="Console" style={{ height: '100%' }} icon={<i className="ph ph-terminal-window"></i>}>
      <div style={styles.console}>
        {logs.length === 0 && (
          <p style={styles.emptyLog}>No events logged yet. Click the like button to start.</p>
        )}
        {logs.map((log) => (
          <div key={log.id} style={styles.logEntry}>
            <span style={styles.timestamp}>{log.timestamp}</span>
            <span style={{ ...styles.logType, color: logTypeColors[log.type] }}>[{log.type.toUpperCase()}]</span>
            <span style={styles.message}>{log.message}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
};

export default BottomPanel;