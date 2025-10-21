import React, { CSSProperties } from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
  icon?: React.ReactNode;
}

const styles: { [key: string]: CSSProperties } = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    borderRadius: '8px',
    border: '1px solid #2C2C2E',
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 16px',
    borderBottom: '1px solid #2C2C2E',
    color: '#8E8E93',
  },
  content: {
    padding: '16px',
    flexGrow: 1,
    overflow: 'auto',
  },
};

const Panel: React.FC<PanelProps> = ({ title, children, style = {}, icon }) => {
  return (
    <div style={{ ...styles.panel, ...style }}>
      <h2 style={styles.header}>
        {icon}
        {title}
      </h2>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Panel;