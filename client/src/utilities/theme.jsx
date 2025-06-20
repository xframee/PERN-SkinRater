// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main:  '#3f50b5',
      dark:  '#15171c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main:  '#f44336',
      dark:  '#ba000d',
      contrastText: '#000',
    },

    background: {
      default: '#15171c',
      paper:   '#1d1d1d',
    },
  },
});

export default theme;
