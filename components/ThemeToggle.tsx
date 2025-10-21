import React, { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.tsx';

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme, theme } = useTheme();

  const styles: { [key: string]: CSSProperties } = {
    button: {
      background: 'none',
      border: `1px solid ${theme.colors.Color_Neutral_Border_2}`,
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: theme.colors.Color_Neutral_Content_2,
      backgroundColor: theme.colors.Color_Neutral_Surface_3,
      position: 'relative',
      overflow: 'hidden',
      outline: 'none',
    },
    icon: {
      fontSize: '20px',
      position: 'absolute',
    },
    stateLayer: {
        position: 'absolute',
        inset: 0,
        backgroundColor: theme.colors.Color_Neutral_Content_1,
        pointerEvents: 'none',
    },
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.5, rotate: -90 },
    visible: { y: 0, opacity: 1, scale: 1, rotate: 0 },
    exit: { y: -20, opacity: 0, scale: 0.5, rotate: 90 },
  };
  
  const stateLayerVariants = {
    rest: { opacity: 0 },
    hover: { opacity: theme.opacities.Opacity_State_Hover },
    tap: { opacity: theme.opacities.Opacity_State_Active },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      style={styles.button}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div style={styles.stateLayer} variants={stateLayerVariants} transition={{ duration: 0.15 }} />
      <AnimatePresence initial={false} mode="wait">
        <motion.i
          key={themeMode}
          className={`ph-bold ${themeMode === 'light' ? 'ph-sun' : 'ph-moon'}`}
          style={styles.icon}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;