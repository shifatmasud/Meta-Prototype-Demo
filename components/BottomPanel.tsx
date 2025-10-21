import React, { CSSProperties } from 'react';
import Panel from './Panel.tsx';
import { LogEntry, LogType } from '../types.ts';

interface BottomPanelProps {
  logs: LogEntry[];
}

const logTypeColors: { [key in LogType]: string } = {
  event: '#4ADE80',  // Feedback: Green
  state: '#60A5FA',  // Feedback: Blue
  system: '#A78BFA', // A pleasant purple
  error: '#F87171',   // Feedback: Red
};

const styles: { [key: string]: CSSProperties } = {
    console: {
        fontFamily: 'monospace',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        height: '100%',
        overflowY: 'auto',
    },
    emptyLog: {
        color: '#636366',
    },
    logEntry: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    timestamp: {
        color: '#636366',
        marginRight: '8px',
    },
    logType: {
        marginRight: '8px',
        fontWeight: 'bold',
    },
    message: {
        flex: 1,
        color: '#F5F5F7',
        whiteSpace: 'pre-wrap',
    }
}


const BottomPanel: React.FC<BottomPanelProps> = ({ logs }) => {
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