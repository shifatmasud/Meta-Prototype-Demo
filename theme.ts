const sharedTokens = {
  typography: {
    Type_Readable_Body_M_Size: '16px',
    Type_Readable_Body_S_Size: '14px',
    Type_Readable_Label_S_Size: '12px',
    Type_Expressive_Display_L_Size: '32px',
    Type_Expressive_Display_M_Size: '28px',
    Font_Family_Primary: "'Inter', sans-serif",
  },
  sizing: {
    Size_Border_Radius_S: '8px',
    Size_Border_Radius_L: '50px',
  },
  spacing: {
    Space_S: '8px',
    Space_M: '12px',
    Space_L: '16px',
    Space_XL: '32px',
  },
  transitions: {
    Transition_Duration_Gentle: '300ms',
    Transition_Duration_Quick: '150ms',
  },
  opacities: {
    Opacity_State_Hover: 0.08,
    Opacity_State_Active: 0.12,
  },
};

export const darkTokens = {
  ...sharedTokens,
  colors: {
    // Neutral Palette (Achromatic)
    Color_Neutral_Surface_1: '#000000', // App background
    Color_Neutral_Surface_2: '#1C1C1E', // Panel backgrounds
    Color_Neutral_Surface_3: '#2C2C2E', // Button backgrounds, inputs, dividers

    Color_Neutral_Content_1: '#F5F5F7', // Primary content (main text, active icons)
    Color_Neutral_Content_2: '#8E8E93', // Secondary content (panel titles, labels, inactive icons)
    Color_Neutral_Content_3: '#636366', // Tertiary content (subtitles, placeholders)

    Color_Neutral_Border_1: '#2C2C2E', // Panel borders
    Color_Neutral_Border_2: '#48484A', // Input/button borders
    Color_Neutral_Border_Focus: '#3B82F6', // Focus state border

    // Feedback Palettes
    Color_Feedback_Info_Content_1: '#60A5FA',   // Blue for state logs
    Color_Feedback_Success_Content_1: '#4ADE80',// Green for event logs
    Color_Feedback_Warning_Content_1: '#A78BFA',// Purple for system logs
    Color_Feedback_Error_Content_1: '#F87171',  // Red for error logs
  },
};

export const lightTokens = {
  ...sharedTokens,
  colors: {
    // Neutral Palette (Achromatic)
    Color_Neutral_Surface_1: '#FFFFFF', // App background
    Color_Neutral_Surface_2: '#F5F5F7', // Panel backgrounds
    Color_Neutral_Surface_3: '#E5E5EA', // Button backgrounds, inputs, dividers

    Color_Neutral_Content_1: '#1C1C1E', // Primary content (main text, active icons)
    Color_Neutral_Content_2: '#636366', // Secondary content (panel titles, labels, inactive icons)
    Color_Neutral_Content_3: '#8E8E93', // Tertiary content (subtitles, placeholders)

    Color_Neutral_Border_1: '#E5E5EA', // Panel borders
    Color_Neutral_Border_2: '#D1D1D6', // Input/button borders
    Color_Neutral_Border_Focus: '#007AFF', // Focus state border

    // Feedback Palettes
    Color_Feedback_Info_Content_1: '#007AFF',   // Blue for state logs
    Color_Feedback_Success_Content_1: '#34C759',// Green for event logs
    Color_Feedback_Warning_Content_1: '#AF52DE',// Purple for system logs
    Color_Feedback_Error_Content_1: '#FF3B30',  // Red for error logs
  },
};