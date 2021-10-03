import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";
import theme from './theme/theme'
import { MuiThemeProvider } from '@material-ui/core/styles';


ReactDOM.render(
<React.StrictMode>
    <MuiThemeProvider theme={theme}>
    <Routes />
    </MuiThemeProvider>
  </React.StrictMode>, document.getElementById("root"));
