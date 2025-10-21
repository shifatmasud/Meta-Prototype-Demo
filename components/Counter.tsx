import React, { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface CounterProps {
  value: number;
}

const Counter: React.FC<CounterProps> = ({ value }) => {
  const { theme } = useTheme();

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      overflow: 'hidden',
      fontSize: theme.typography.Type_Readable_Body_M_Size,
      fontWeight: '500',
      color: theme.colors.Color_Neutral_Content_1,
      fontVariantNumeric: 'tabular-nums',
    },
    digitContainer: {
      position: 'relative',
      height: '1em',
      width: '0.6em',
    },
    digit: {
      position: 'absolute',
      inset: 0,
    }
  };

  const digits = String(value).split('');

  return (
    <div style={styles.container}>
      {digits.map((digit, index) => (
        <div key={index} style={styles.digitContainer}>
          <AnimatePresence initial={false}>
            <motion.span
              key={digit + '-' + index}
              style={styles.digit}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: (digits.length - 1 - index) * 0.035,
              }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Counter;