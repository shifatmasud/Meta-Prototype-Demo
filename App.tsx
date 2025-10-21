import React, { useState, useCallback, CSSProperties, useEffect } from 'react';
import LeftPanel from './components/LeftPanel.tsx';
import RightPanel from './components/RightPanel.tsx';
import BottomPanel from './components/BottomPanel.tsx';
import LikeButton from './components/LikeButton.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import { LogEntry, AppState, ButtonStyles } from './types.ts';
import { useLogger } from './hooks/useLogger.ts';
import { useWindowSize } from './hooks/useWindowSize.ts';
import { useTheme } from './contexts/ThemeContext.tsx';

const App: React.FC = () => {
  const [likes, setLikes] = useState<number>(99);
  const { logs, addLog } = useLogger();
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const isMobile = width < 768;
  
  const [buttonStyles, setButtonStyles] = useState<ButtonStyles>({
    backgroundColor: theme.colors.Color_Neutral_Surface_3,
    borderColor: theme.colors.Color_Neutral_Border_2,
    iconColor: theme.colors.Color_Neutral_Content_2,
    activeIconColor: theme.colors.Color_Neutral_Content_1,
    borderRadius: theme.sizing.Size_Border_Radius_L,
  });

  const handleStyleUpdate = useCallback((newStyles: Partial<ButtonStyles>) => {
    setButtonStyles(prev => ({ ...prev, ...newStyles }));
    addLog(`Button styles updated: ${JSON.stringify(newStyles, null, 2)}`, 'state');
  }, [addLog]);

  // Reset button styles to theme defaults when theme changes
  useEffect(() => {
    const defaultStyles: ButtonStyles = {
        backgroundColor: theme.colors.Color_Neutral_Surface_3,
        borderColor: theme.colors.Color_Neutral_Border_2,
        iconColor: theme.colors.Color_Neutral_Content_2,
        activeIconColor: theme.colors.Color_Neutral_Content_1,
        borderRadius: theme.sizing.Size_Border_Radius_L,
    };
    setButtonStyles(defaultStyles);
    addLog('Button styles reset to new theme defaults.', 'system');
  }, [theme]);

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
      fontFamily: theme.typography.Font_Family_Primary,
      backgroundColor: theme.colors.Color_Neutral_Surface_1,
      color: theme.colors.Color_Neutral_Content_1,
      padding: isMobile ? theme.spacing.Space_M : theme.spacing.Space_L,
      gap: isMobile ? theme.spacing.Space_M : theme.spacing.Space_L,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: theme.spacing.Space_S,
    },
    headerText: {
        textAlign: 'center',
        flexGrow: 1,
    },
    title: {
      fontSize: isMobile ? theme.typography.Type_Expressive_Display_M_Size : theme.typography.Type_Expressive_Display_L_Size,
      fontWeight: 'bold',
      color: theme.colors.Color_Neutral_Content_2,
      margin: 0,
    },
    subtitle: {
      color: theme.colors.Color_Neutral_Content_3,
      fontSize: isMobile ? theme.typography.Type_Readable_Body_S_Size : theme.typography.Type_Readable_Body_M_Size,
      margin: `${theme.spacing.Space_S} 0 0 0`,
    },
    mainLayout: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap',
      gap: isMobile ? theme.spacing.Space_M : theme.spacing.Space_L,
    },
    mainContent: {
      order: isMobile ? 0 : 1,
      flexBasis: isMobile ? 'auto' : '0',
      flexGrow: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.Color_Neutral_Surface_2,
      borderRadius: theme.sizing.Size_Border_Radius_S,
      padding: theme.spacing.Space_XL,
      border: `1px solid ${theme.colors.Color_Neutral_Border_1}`,
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
        <div style={{flex: 1}}></div>
        <div style={styles.headerText}>
            <h1 style={styles.title}>Meta Prototype</h1>
            <p style={styles.subtitle}>Like Button with Slot Machine Counter</p>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
             <ThemeToggle />
        </div>
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