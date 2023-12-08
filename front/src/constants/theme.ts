import {LinearGradient} from 'expo-linear-gradient';
import {extendTheme} from 'native-base';

const customTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#E3FDE7',
      100: '#B9FACC',
      200: '#95F9B2',
      300: '#71F89A',
      400: '#59F788',
      500: '#19A72A', // A shade of green
      600: '#67F98E',
      700: '#54F87F',
      800: '#41F76F',
      900: '#1CF651',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

const themeConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

export {customTheme, themeConfig};
