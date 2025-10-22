import React, { CSSProperties } from 'react';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  style?: CSSProperties;
  icon?: React.ReactNode;
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Panel: React.FC<PanelProps> = ({ 
    title, 
    children, 
    style = {}, 
    icon,
    isCollapsible = false,
    isCollapsed = false,
    onToggleCollapse
}) => {
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
      justifyContent: 'space-between',
      gap: theme.spacing.Space_S,
      fontSize: theme.typography.Type_Readable_Body_M_Size,
      fontWeight: 500,
      padding: `${theme.spacing.Space_M} ${theme.spacing.Space_L}`,
      borderBottom: isCollapsed ? 'none' : `1px solid ${theme.colors.Color_Neutral_Border_1}`,
      color: theme.colors.Color_Neutral_Content_2,
      margin: 0,
      flexShrink: 0,
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.Space_S,
      overflow: 'hidden',
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      borderRadius: theme.sizing.Size_Border_Radius_S,
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: theme.colors.Color_Neutral_Content_2,
      fontSize: '20px',
      padding: 0,
      flexShrink: 0,
      outline: 'none',
    },
    content: {
      padding: theme.spacing.Space_L,
      flexGrow: 1,
      overflow: 'auto',
    },
    motionContainer: {
      overflow: 'hidden',
    }
  };

  return (
    <div style={{ ...styles.panel, ...style }}>
      <h2 style={styles.header}>
        <span style={styles.headerTitle}>
          {icon}
          {title}
        </span>
        {isCollapsible && (
            <motion.button
                onClick={onToggleCollapse}
                style={styles.toggleButton}
                whileHover={{ backgroundColor: theme.colors.Color_Neutral_Surface_3 }}
                aria-expanded={!isCollapsed}
                aria-label={isCollapsed ? `Expand ${title} panel` : `Collapse ${title} panel`}
            >
                <motion.i
                    className="ph ph-caret-up"
                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.button>
        )}
      </h2>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
            <motion.div
                key="content"
                style={styles.motionContainer}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                    expanded: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
                <div style={styles.content}>
                    {children}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Panel;
