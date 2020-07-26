
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import "assets/vendor/font-awesome/css/all.min.css"; // Need to update to latest version

import HowTestingWorks from './views/HowTestWorks/index.js';
import HomePage from './components/home/HomePage.js';
import ResultsPage from './components/results/ResultsPage.js';
import AboutPage from './components/content/AboutPage.js';
import PartnersPage from './components/content/PartnersPage.js';
import PrivacyPage from './components/content/PrivacyPage.js';

// Colors
const colors = {
  colorRed: '#FA2B56',
  colorPurple: '#4046BB',
  colorPurpleDarker: '#202028',
  colorTeal: '#69C5AB',
  colorTealDark: '#0387A5',
  colorYellow: '#EFC05C',
  colorYellowDark: '#75672D',
  colorGreen: '#27AE60',
  colorGreenDark: '#1F593F',
  colorGrayLight: '#F6F6F4',
  colorGray: '#CCCCCC',
  colorBlueDark: '#162B4D',
  colorBlueLight: '#9AF6FC'
}

// Shared CSS theme variables
const theme = {
  ...colors,
  colorPrimary: colors.colorPurple,
  fontSerif: `'Merriweather', serif`,
  fontSans: `'Libre Franklin', serif`,
  bpSmall: '576px',
  bpMed: '768px'
}

// For CSS styling shared across different components
const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${props => props.theme.fontSans};
    font-weight: 300;
  }
  
  h1, h2, h3, h4 {
    font-family: ${props => props.theme.fontSerif};
  }

  a {
    color: ${props => props.theme.colorPrimary};

    &:hover {
      color: ${props => props.theme.colorPrimary};
    }
  }

  .section {
    a {
      text-decoration: underline;
    }
  }

  .btn {
    font-weight: 400;

    &.disabled, &:disabled {
      opacity: 0.45;
    }
  }

  .btn-primary {
    background-color: ${props => props.theme.colorPrimary};
    border-color: ${props => props.theme.colorPrimary};

    &:hover {
      background-color: ${props => props.theme.colorPurpleDarker};
      border-color: ${props => props.theme.colorPurpleDarker};
    }
  }

  .btn-outline-primary {
    border-color: ${props => props.theme.colorPrimary};
    color: ${props => props.theme.colorPrimary};

    &:hover {
      background-color: ${props => props.theme.colorPrimary};
      border-color: ${props => props.theme.colorPrimary};
    }

    &:disabled {
      border-color: ${props => props.theme.colorPrimary};
      color: ${props => props.theme.colorPrimary};
      
      &:hover {
        border-color: ${props => props.theme.colorPrimary};
        color: ${props => props.theme.colorPrimary};
        background-color: transparent;
      }
    }
  }
  
  .form-control {
    &:focus {
      box-shadow: none;
      border-color: ${props => props.theme.colorPrimary};
    }
  }

  .form-control-lg + .input-group-append {
    .btn {
      padding: 0.375rem 1.15rem;
      font-size: 1.2rem;
    }
  }

  .icon-left {
    margin-right: 3px;
  }
`

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <HomePage {...props} />} />
        <Route path="/search" exact render={props => <ResultsPage {...props} />} />
        <Route path="/about" exact render={props => <AboutPage {...props} />} />
        <Route path="/partners" exact render={props => <PartnersPage {...props} />} />
        <Route
          path="/how-testing-works"
          exact
          render={(props) => <HowTestingWorks {...props} />}
        />
        <Route
          path="/privacy"
          exact
          render={(props) => <PrivacyPage {...props} />}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
