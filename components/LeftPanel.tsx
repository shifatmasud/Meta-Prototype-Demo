import React, { useRef, CSSProperties } from 'react';
import Panel from './Panel.tsx';
import Button from './Button.tsx';
import { AppState, LogType } from '../types.ts';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface LeftPanelProps {
  currentState: AppState;
  onStateUpdate: (newState: AppState) => void;
  addLog: (message: string, type: LogType) => void;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  currentState, 
  onStateUpdate, 
  addLog,
  isCollapsible,
  isCollapsed,
  onToggleCollapse
}) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.Space_L,
    },
    description: {
      fontSize: theme.typography.Type_Readable_Body_S_Size,
      color: theme.colors.Color_Neutral_Content_2,
      lineHeight: 1.5,
      margin: 0,
    },
    buttonContainer: {
      display: 'flex',
      gap: theme.spacing.Space_S,
    },
    hiddenInput: {
      display: 'none',
    }
  };


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
    <Panel 
      title="Code Import/Export" 
      icon={<i className="ph ph-code"></i>}
      isCollapsible={isCollapsible}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
    >
      <div style={styles.container}>
        <p style={styles.description}>
          Simulate a backendless workflow by saving the app state to JSON or loading a previous state.
        </p>
        <div style={styles.buttonContainer}>
          <Button onClick={handleExport}>
            Export State
          </Button>
          <Button onClick={handleImportClick}>
            Import State
          </Button>
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
