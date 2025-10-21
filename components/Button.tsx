import React, { useState, CSSProperties } from 'react';
import { useTheme } from '../contexts/ThemeContext.tsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const baseStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.colors.Color_Neutral_Border_2}`,
    backgroundColor: theme.colors.Color_Neutral_Surface_3,
    color: theme.colors.Color_Neutral_Content_1,
    fontWeight: 500,
    padding: `${theme.spacing.Space_S} ${theme.spacing.Space_L}`,
    borderRadius: theme.sizing.Size_Border_Radius_S,
    cursor: 'pointer',
    transition: `all ${theme.transitions.Transition_Duration_Quick}`,
    outline: 'none',
    fontFamily: theme.typography.Font_Family_Primary,
    fontSize: theme.typography.Type_Readable_Body_S_Size,
  };

  const opacity = isActive 
    ? theme.opacities.Opacity_State_Active 
    : isHovered 
    ? theme.opacities.Opacity_State_Hover 
    : 0;

  const stateLayerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundColor: theme.colors.Color_Neutral_Content_1,
    opacity: opacity,
    transition: `opacity ${theme.transitions.Transition_Duration_Quick}`,
    pointerEvents: 'none',
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <button
      style={{ ...baseStyle, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      <div style={stateLayerStyle} />
      <span style={contentStyle}>{children}</span>
    </button>
  );
};

export default Button;