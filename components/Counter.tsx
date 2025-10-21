import React, { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CounterProps {
  value: number;
}

const MAX_DIGITS = 4;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    overflow: 'hidden',
    fontSize: '16px',
    fontWeight: '500',
    color: '#FFFFFF',
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

const Counter: React.FC<CounterProps> = ({ value }) => {
  const paddedValue = String(value).padStart(MAX_DIGITS, ' ');
  const digits = paddedValue.split('');

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
              {digit === ' ' ? '\u00A0' : digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Counter;