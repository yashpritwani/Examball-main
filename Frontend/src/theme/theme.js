import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      //light: '#757ce8',
      main: '#208A2B',
      //dark: '#002884',
      //contrastText: '#fff',
    },
    secondary: {
      main: '#FFD15C',
    },
    danger:{
      main:'#FF0000'
    },
    textColorWhite:{
      main:"#fff"
    },
    typography: {
      subtitle1: {
        fontSize: 12,
      }
  },
  background:{
    primary:'#fff',
    paper:'#fff'
  }
},
breakpoints: {
  values: {
   xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    tablet: 760,
  },
}
});


export default theme;