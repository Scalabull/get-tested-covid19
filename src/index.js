
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';


// To delete
// import "assets/vendor/nucleo/css/nucleo.css";
// import "assets/vendor/font-awesome/css/font-awesome.min.css";
// import "assets/scss/argon-design-system-react.scss?v1.1.0";

import TestSiteSearch from "views/TestSiteSearch.js";
import About from "views/About.js";
import Resources from "views/Resources.js";
import WhenShouldYouGetTested from "views/WhenShouldYouGetTested.js";
import HowTestingWorks from './views/HowTestWorks/index.js';
import HomePage from './components/home/HomePage.js';
import ResultsPage from './components/results/ResultsPage.js';

// Colors
const colors = {
  colorRed: 'red'
}

// Shared CSS theme variables
const theme = {
  ...colors,
  colorPrimary: colors.colorRed,
  fontSerif: `'Playfair Display', serif`,
  fontSans: `'Libre Franklin', serif`,
}

// For CSS styling shared across different components
const GlobalStyle = createGlobalStyle`

  body {
    font-family: ${props => props.theme.fontSans};
    font-weight: 300;
  }
  
  h1, h2, h3, h4 {
    font-family: ${props => props.theme.fontSerif};
  }
`

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <HomePage {...props} />} />
        <Route path="/search" exact render={props => <ResultsPage {...props} />} />
        <Route path="/old/home" exact render={props => <TestSiteSearch {...props} />} />
        <Route
          path="/old/resources"
          exact
          render={props => <Resources {...props} />}
        />
        <Route
          path="/old/when-should-you-get-tested"
          exact
          render={props => <WhenShouldYouGetTested {...props} />}
        />
        <Route
          path="/old/how-testing-works"
          exact
          render={(props) => <HowTestingWorks {...props} />}
        />

        <Route
          path="/about"
          exact
          render={props => <About {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
