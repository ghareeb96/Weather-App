import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './Components/header';
import Home from './Components/home';
import About from './Components/about';
import Contact from './Components/contact';
import QrCode from './Components/qrCode';
import Movies from './Components/movies';


export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/qrCode">
              <QrCode />
            </Route>

            <Route path="/movies">
              <Movies />
            </Route>


          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;