import { StyleSheet } from 'react-native';
const colors = {
  primary: '#0F53FF',
  secondary: '#F0F3FA',
  background1: '#FFF',
  background2: '#F0F3FA',
  background3: '#F0F3FA',
  active: '#fff',
  white: '#fff',
  black: '#1a1917',
  grey: '#8E8E92',
  grey0: '#888888',
  grey1: '#8E8E92',
  grey2: '#F2F4F7',
  grey3: '#ACAFB3',
  grey4: '#D9DCE2',
  grey5: '#D5D6DB',
  greyOutline: '#bbb',
  searchBg: '#303337',
  orange: '#FF6A4C',
  yellow: '#FFC133',
  green: '#8DCC14',
  error: '#FF1F49',
  darkblue: '#1B3255',
  disabled: '#ADC7FF',
  disable: '#ADC7FF',
  text0: '#141414',
  text1: '#1B3255',
  text2: '#8E8E92',
  text4: '#000',
  text5: '#4285F5',

  // Darker color if hairlineWidth is not thin enough
  divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  platform: {
    ios: {
      primary: '#0F53FF',
      secondary: '#5856d6',
      success: '#4cd964',
      error: '#ff3b30',
      warning: '#ffcc00',
    },
    android: {
      primary: '#0F53FF',
      secondary: '#9C27B0',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ffeb3b',
    },
  },
};
const dark = {
  primary: '#0F53FF',
  secondary: '#F0F3FA',
  background1: '#B721FF',
  background2: '#21D4FD',
  color: '#000',
  black: '#1a1917',

  grey0: '#888888',
  grey1: '#8E8E92',
  grey2: '#F2F4F7',
  grey3: '#ACAFB3',

  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  greyOutline: '#bbb',
  searchBg: '#303337',
  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
  disabled: 'hsl(208, 8%, 90%)',
  // Darker color if hairlineWidth is not thin enough
  divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  platform: {
    ios: {
      primary: '#007aff',
      secondary: '#5856d6',
      success: '#4cd964',
      error: '#ff3b30',
      warning: '#ffcc00',
    },
    android: {
      primary: '#2196f3',
      secondary: '#9C27B0',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ffeb3b',
    },
  },
};
const isDark = false;
export  {  colors };
