import React, { useState, CSSProperties } from 'react';
import Counter from './Counter.tsx';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface LikeButtonProps {
  likes: number;
  onUpdateLikes: (action: 'increment' | 'decrement') => void;
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  activeIconColor: string;
  borderRadius: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
    likes, 
    onUpdateLikes,
    backgroundColor,
    borderColor,
    iconColor,
    activeIconColor,
    borderRadius
}) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    onUpdateLikes(isLiked ? 'decrement' : 'increment');
    setIsLiked(!isLiked);
  };

  const styles: { [key: string]: CSSProperties } = {
    button: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.Space_S,
        padding: `${theme.spacing.Space_S} ${theme.spacing.Space_L}`,
        background: 'none',
        borderStyle: 'solid',
        borderWidth: '1px',
        cursor: 'pointer',
        color: theme.colors.Color_Neutral_Content_1,
        outline: 'none',
        overflow: 'hidden',
        // Customizable styles from props
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: borderRadius,
    },
    icon: {
        fontSize: '24px',
        color: iconColor,
    },
    activeIcon: {
      color: activeIconColor,
    },
    stateLayer: {
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.colors.Color_Neutral_Content_1,
      pointerEvents: 'none',
    },
    content: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.Space_S,
    }
  };
  
  const stateLayerVariants = {
    rest: { opacity: 0 },
    hover: { opacity: theme.opacities.Opacity_State_Hover },
    tap: { opacity: theme.opacities.Opacity_State_Active },
  };

  return (
    <motion.button
        onClick={handleLikeClick}
        style={styles.button}
        whileTap={{ scale: 0.95 }}
        initial="rest"
        whileHover="hover"
        animate="rest"
        transition={{ duration: 0.15 }}
    >
        <motion.div style={styles.stateLayer} variants={stateLayerVariants} transition={{ duration: 0.15 }} />
        <span style={styles.content}>
          <i 
            className={`ph ${isLiked ? 'ph-fill' : 'ph'} ph-thumbs-up`}
            style={{...styles.icon, ...(isLiked && styles.activeIcon)}}
          ></i>
          <Counter value={likes} />
        </span>
    </motion.button>
  );
};

export default LikeButton;