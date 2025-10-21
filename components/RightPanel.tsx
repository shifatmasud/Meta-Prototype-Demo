import React, { useState, useEffect, CSSProperties } from 'react';
import Panel from './Panel.tsx';
import Button from './Button.tsx';
import { LogType, ButtonStyles } from '../types.ts';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface RightPanelProps {
  onSetLikes: (likes: number) => void;
  addLog: (message: string, type: LogType) => void;
  onStyleUpdate: (newStyles: Partial<ButtonStyles>) => void;
  initialStyles: ButtonStyles;
}

const RightPanel: React.FC<RightPanelProps> = ({ onSetLikes, addLog, onStyleUpdate, initialStyles }) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [styleInputs, setStyleInputs] = useState(initialStyles);
  
  // Update local state when initialStyles prop changes (e.g., on theme change)
  useEffect(() => {
    setStyleInputs(initialStyles);
  }, [initialStyles]);

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.Space_L,
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.Space_M,
    },
    label: {
      display: 'block',
      fontSize: theme.typography.Type_Readable_Body_S_Size,
      fontWeight: 500,
      color: theme.colors.Color_Neutral_Content_2,
    },
    subLabel: {
      fontSize: theme.typography.Type_Readable_Label_S_Size,
      color: theme.colors.Color_Neutral_Content_3,
    },
    inputContainer: {
      display: 'flex',
      gap: theme.spacing.Space_S,
    },
    input: {
      flexGrow: 1,
      backgroundColor: theme.colors.Color_Neutral_Surface_3,
      border: `1px solid ${theme.colors.Color_Neutral_Border_2}`,
      borderRadius: theme.sizing.Size_Border_Radius_S,
      padding: `${theme.spacing.Space_S} ${theme.spacing.Space_M}`,
      color: theme.colors.Color_Neutral_Content_1,
      outline: 'none',
      transition: `border-color ${theme.transitions.Transition_Duration_Quick}, box-shadow ${theme.transitions.Transition_Duration_Quick}`,
      width: '100%',
    },
    divider: {
      height: '1px',
      backgroundColor: theme.colors.Color_Neutral_Border_1,
      margin: `${theme.spacing.Space_S} 0`,
      border: 'none',
    },
    styleControlGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    colorInputWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.Space_S,
    },
    colorInput: {
      width: '32px',
      height: '32px',
      border: 'none',
      padding: 0,
      borderRadius: '6px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
    }
  };

  const handleSetClick = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num)) {
      onSetLikes(num);
      setInputValue('');
    } else {
        addLog(`Control Panel: Invalid input "${inputValue}"`, 'error');
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSetClick();
    }
  };

  const handleStyleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleInputs({
      ...styleInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleApplyStyles = () => {
    onStyleUpdate(styleInputs);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = theme.colors.Color_Neutral_Border_Focus;
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = theme.colors.Color_Neutral_Border_2;
  };

  const colorKeys: (keyof ButtonStyles)[] = ['backgroundColor', 'borderColor', 'iconColor', 'activeIconColor'];

  return (
    <Panel title="Controls" icon={<i className="ph ph-gear-six"></i>}>
      <div style={styles.container}>
        <div style={styles.group}>
          <label htmlFor="likes-input" style={styles.label}>
            Set Like Count
          </label>
          <div style={styles.inputContainer}>
            <input
              id="likes-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Enter a number"
              style={styles.input}
            />
            <Button onClick={handleSetClick}>
              Set
            </Button>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.group}>
            <label style={styles.label}>Button Style</label>
            {Object.entries(styleInputs).map(([key, value]) => {
                const isColor = colorKeys.includes(key as keyof ButtonStyles);
                return (
                    <div key={key} style={styles.styleControlGroup}>
                        <label htmlFor={`style-input-${key}`} style={styles.subLabel}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                         <div style={styles.colorInputWrapper}>
                            {isColor && (
                                <input
                                    type="color"
                                    name={key}
                                    value={value}
                                    onChange={handleStyleInputChange}
                                    style={styles.colorInput}
                                />
                            )}
                            <input
                                id={`style-input-${key}`}
                                name={key}
                                value={value}
                                onChange={handleStyleInputChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                style={styles.input}
                            />
                        </div>
                    </div>
                )
            })}
            <Button
                onClick={handleApplyStyles}
                style={{ width: '100%', marginTop: theme.spacing.Space_S }}
            >
                Apply Styles
            </Button>
        </div>
      </div>
    </Panel>
  );
};

export default RightPanel;