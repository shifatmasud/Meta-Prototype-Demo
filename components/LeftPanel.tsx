import React, { useRef, CSSProperties } from 'https://esm.sh/react@18';
import Panel from './Panel.tsx';
import { AppState, LogType } from '../types.ts';

interface LeftPanelProps {
  currentState: AppState;
  onStateUpdate: (newState: AppState) => void;
  addLog: (message: string, type: LogType) => void;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  description: {
    fontSize: '14px',
    color: '#8E8E93',
    lineHeight: 1.5,
  },
  buttonContainer: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    flex: 1,
    border: '1px solid #48484A',
    backgroundColor: '#2C2C2E',
    color: '#F5F5F7',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 150ms',
  },
  exportButton: {
    // No specific style needed, uses base button style
  },
  importButton: {
     // No specific style needed, uses base button style
  },
  hiddenInput: {
    display: 'none',
  }
};

const LeftPanel: React.FC<LeftPanelProps> = ({ currentState, onStateUpdate, addLog }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(currentState, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'app-state.json';
    link.click();
    addLog('Exporting current state to app-state.json', 'system');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text === 'string') {
          const newState = JSON.parse(text);
          onStateUpdate(newState);
        }
      } catch (error) {
        addLog(`Error parsing JSON file: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      }
    };
    reader.readAsText(file);
    addLog(`Importing state from ${file.name}`, 'system');
  };

  return (
    <Panel title="Code Import/Export" icon={<i className="ph ph-code"></i>}>
      <div style={styles.container}>
        <p style={styles.description}>
          Simulate a backendless workflow by saving the app state to JSON or loading a previous state.
        </p>
        <div style={styles.buttonContainer}>
          <button
            onClick={handleExport}
            style={{...styles.button, ...styles.exportButton}}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#48484A')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2C2C2E')}
          >
            Export State
          </button>
          <button
            onClick={handleImportClick}
            style={{...styles.button, ...styles.importButton}}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#48484A')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2C2C2E')}
          >
            Import State
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            style={styles.hiddenInput}
          />
        </div>
      </div>
    </Panel>
  );
};

export default LeftPanel;