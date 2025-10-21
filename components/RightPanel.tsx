import React, { useState, CSSProperties } from 'react';
import Panel from './Panel';
import { LogType } from '../types';
import { ButtonStyles } from '../App';

interface RightPanelProps {
  onSetLikes: (likes: number) => void;
  addLog: (message: string, type: LogType) => void;
  onStyleUpdate: (newStyles: Partial<ButtonStyles>) => void;
  initialStyles: ButtonStyles;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: '#8E8E93',
  },
  subLabel: {
    fontSize: '12px',
    color: '#636366',
  },
  inputContainer: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flexGrow: 1,
    backgroundColor: '#2C2C2E',
    border: '1px solid #48484A',
    borderRadius: '8px',
    padding: '8px 12px',
    color: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 150ms, box-shadow 150ms',
    width: '100%',
  },
  button: {
    border: '1px solid #48484A',
    backgroundColor: '#2C2C2E',
    color: '#F5F5F7',
    fontWeight: 500,
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 150ms',
  },
  divider: {
    height: '1px',
    backgroundColor: '#2C2C2E',
    margin: '8px 0',
  },
  styleControlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  colorInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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


const RightPanel: React.FC<RightPanelProps> = ({ onSetLikes, addLog, onStyleUpdate, initialStyles }) => {
  const [inputValue, setInputValue] = useState('');
  const [styleInputs, setStyleInputs] = useState(initialStyles);

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
    e.currentTarget.style.borderColor = '#3B82F6'; // Blue for focus
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#48484A';
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
            <button
              onClick={handleSetClick}
              style={styles.button}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#48484A')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2C2C2E')}
            >
              Set
            </button>
          </div>
        </div>

        <div style={styles.divider}></div>

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
            <button
                onClick={handleApplyStyles}
                style={{...styles.button, width: '100%', marginTop: '8px'}}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#48484A')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2C2C2E')}
            >
                Apply Styles
            </button>
        </div>
      </div>
    </Panel>
  );
};

export default RightPanel;