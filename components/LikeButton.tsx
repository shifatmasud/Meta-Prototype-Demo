import React, { useState, CSSProperties } from 'react';
import Counter from './Counter';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  likes: number;
  onUpdateLikes: (action: 'increment' | 'decrement') => void;
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  activeIconColor: string;
  borderRadius: string;
}

type LikeState = 'liked' | 'disliked' | 'none';

const baseStyles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: '1px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#E4E4E7',
        transition: 'background-color 150ms',
    },
    likeButton: {
        paddingRight: '12px',
    },
    dislikeButton: {
        paddingLeft: '12px',
    },
    separator: {
        width: '1px',
        height: '24px',
    },
    icon: {
        fontSize: '24px',
    },
    activeIcon: {}
};

const LikeButton: React.FC<LikeButtonProps> = ({ 
    likes, 
    onUpdateLikes,
    backgroundColor,
    borderColor,
    iconColor,
    activeIconColor,
    borderRadius
}) => {
  const [likeState, setLikeState] = useState<LikeState>('none');

  const handleLikeClick = () => {
    if (likeState === 'liked') {
        setLikeState('none');
        onUpdateLikes('decrement');
    } else {
        if (likeState === 'disliked') {
            // No change to likes count, just switching state
        } else {
            onUpdateLikes('increment');
        }
        setLikeState('liked');
    }
  };

  const handleDislikeClick = () => {
    if (likeState === 'disliked') {
        setLikeState('none');
    } else {
        if (likeState === 'liked') {
            onUpdateLikes('decrement');
        }
        setLikeState('disliked');
    }
  };

  const isLiked = likeState === 'liked';
  const isDisliked = likeState === 'disliked';

  const styles: { [key: string]: CSSProperties } = {
    container: {
      ...baseStyles.container,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderRadius: borderRadius,
    },
    separator: {
      ...baseStyles.separator,
      backgroundColor: borderColor,
    },
    icon: {
      ...baseStyles.icon,
      color: iconColor,
    },
    activeIcon: {
      ...baseStyles.activeIcon,
      color: activeIconColor,
    }
  };

  return (
    <motion.div
        style={styles.container}
        transition={{ duration: 0.15 }}
    >
        <motion.button
            onClick={handleLikeClick}
            style={{ ...baseStyles.button, ...baseStyles.likeButton }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
            <i 
              className={`ph ${isLiked ? 'ph-fill' : 'ph'} ph-thumbs-up`}
              style={{...styles.icon, ...(isLiked && styles.activeIcon)}}
            ></i>
            <Counter value={likes} />
        </motion.button>

        <div style={styles.separator}></div>
        
        <motion.button
            onClick={handleDislikeClick}
            style={{ ...baseStyles.button, ...baseStyles.dislikeButton }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
             <i 
              className={`ph ${isDisliked ? 'ph-fill' : 'ph'} ph-thumbs-down`}
              style={{...styles.icon, ...(isDisliked && styles.activeIcon)}}
            ></i>
        </motion.button>
    </motion.div>
  );
};

export default LikeButton;