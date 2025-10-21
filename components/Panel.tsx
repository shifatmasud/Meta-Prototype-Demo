import React, { CSSProperties } from 'react';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
  icon?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children, style = {}, icon }) => {
  const { theme } = useTheme();

  const styles: { [key: string]: CSSProperties } = {
    panel: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.Color_Neutral_Surface_2,
      borderRadius: theme.sizing.Size_Border_Radius_S,
      border: `1px solid ${theme.colors.Color_Neutral_Border_1}`,
      overflow: 'hidden',
      height: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.Space_S,
      fontSize: theme.typography.Type_Readable_Body_M_Size,
      fontWeight: 500,
      padding: `${theme.spacing.Space_M} ${theme.spacing.Space_L}`,
      borderBottom: `1px solid ${theme.colors.Color_Neutral_Border_1}`,
      color: theme.colors.Color_Neutral_Content_2,
      margin: 0,
    },
    content: {
      padding: theme.spacing.Space_L,
      flexGrow: 1,
      overflow: 'auto',
    },
  };

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