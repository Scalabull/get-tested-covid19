/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/font-awesome/css/font-awesome.min.css'
import 'assets/scss/argon-design-system-react.scss?v1.1.0'

import Index from 'views/Index.js'
import TestSiteSearch from 'views/TestSiteSearch.js'
import TestSitesMap from 'views/TestSitesMap.js'
import About from 'views/About.js'
import Resources from 'views/Resources.js'
import WhenShouldYouGetTested from 'views/WhenShouldYouGetTested.js'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={(props) => <Index {...props} />} />
      <Route
        path="/test-site-search"
        exact
        render={(props) => <TestSiteSearch {...props} />}
      />
      <Route
        path="/resources"
        exact
        render={(props) => <Resources {...props} />}
      />
      <Route
        path="/when-should-you-get-tested"
        exact
        render={(props) => <WhenShouldYouGetTested {...props} />}
      />
      <Route
        path="/test-sites-map"
        exact
        render={(props) => <TestSitesMap {...props} />}
      />

      <Route path="/about" exact render={(props) => <About {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
