import React, { useState, useCallback, CSSProperties } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import BottomPanel from './components/BottomPanel';
import LikeButton from './components/LikeButton';
import { LogEntry, AppState, ButtonStyles } from './types';
import { useLogger } from './hooks/useLogger';
import { useWindowSize } from './hooks/useWindowSize';

const App: React.FC = () => {
  const [likes, setLikes] = useState<number>(99);
  const { logs, addLog } = useLogger();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({
    backgroundColor: '#2C2C2E',
    borderColor: '#48484A',
    iconColor: '#8E8E93',
    activeIconColor: '#FFFFFF',
    borderRadius: '50px',
  });

  const handleStyleUpdate = useCallback((newStyles: Partial<ButtonStyles>) => {
    setButtonStyles(prev => ({ ...prev, ...newStyles }));
    addLog(`Button styles updated: ${JSON.stringify(newStyles, null, 2)}`, 'state');
  }, [addLog]);

  const handleUpdateLikes = useCallback((action: 'increment' | 'decrement') => {
    setLikes(prevLikes => {
      const newLikes = action === 'increment' ? prevLikes + 1 : prevLikes - 1;
      addLog(`Like count updated. Action: ${action}. State transition: ${prevLikes} -> ${newLikes}.`, 'event');
      return newLikes;
    });
  }, [addLog]);

  const handleSetLikes = useCallback((newLikes: number) => {
    if (isNaN(newLikes) || newLikes < 0) {
      addLog(`Invalid value for likes: ${newLikes}.`, 'error');
      return;
    }
    const oldLikes = likes;
    setLikes(newLikes);
    addLog(`Likes set via control panel. State transition: ${oldLikes} -> ${newLikes}.`, 'state');
  }, [likes, addLog]);
  
  const handleStateUpdate = useCallback((newState: AppState) => {
    if (typeof newState.likes === 'number' && newState.likes >= 0) {
      handleSetLikes(newState.likes);
      addLog('Application state successfully imported from JSON.', 'system');
    } else {
      addLog('Import failed: Invalid data structure in JSON file.', 'error');
    }
  }, [handleSetLikes, addLog]);

  const styles: { [key: string]: CSSProperties } = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: '"Inter", sans-serif',
      backgroundColor: '#000000',
      color: '#F5F5F7',
      padding: isMobile ? '12px' : '16px',
      gap: isMobile ? '12px' : '16px',
    },
    header: {
      textAlign: 'center',
      paddingBottom: '8px',
      borderBottom: '1px solid #2C2C2E',
    },
    title: {
      fontSize: isMobile ? '28px' : '32px',
      fontWeight: 'bold',
      color: '#8E8E93',
    },
    subtitle: {
      color: '#636366',
      fontSize: isMobile ? '14px' : '16px',
    },
    mainLayout: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: isMobile ? '12px' : '16px',
    },
    mainContent: {
      order: isMobile ? 0 : 1,
      flexBasis: isMobile ? 'auto' : '0',
      flexGrow: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1C1C1E',
      borderRadius: '8px',
      padding: '32px',
      border: '1px solid #2C2C2E',
      minHeight: isMobile ? '300px' : 'auto',
    },
    leftPanel: {
      order: isMobile ? 2 : 0,
      flexBasis: isMobile ? 'auto' : '0',
      flexGrow: 1,
    },
    rightPanel: {
      order: isMobile ? 1 : 2,
      flexBasis: isMobile ? 'auto' : '0',
      flexGrow: 1,
    },
    bottomPanel: {
      order: 3,
      flexBasis: '100%',
      minHeight: '200px'
    },
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Meta Prototype</h1>
        <p style={styles.subtitle}>Like Button with Slot Machine Counter</p>
      </header>

      <div style={styles.mainLayout}>
        <div style={styles.mainContent}>
          <LikeButton 
            likes={likes} 
            onUpdateLikes={handleUpdateLikes} 
            {...buttonStyles}
          />
        </div>

        <div style={styles.leftPanel}>
          <LeftPanel currentState={{ likes }} onStateUpdate={handleStateUpdate} addLog={addLog} />
        </div>
        
        <div style={styles.rightPanel}>
          <RightPanel 
            onSetLikes={handleSetLikes} 
            addLog={addLog} 
            onStyleUpdate={handleStyleUpdate}
            initialStyles={buttonStyles}
          />
        </div>
        
        <div style={styles.bottomPanel}>
           <BottomPanel logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default App;