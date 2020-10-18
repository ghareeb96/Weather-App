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
import Movie from './Components/movie';


export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/qrCode" component={QrCode} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/movies/:movie" component={Movie} />
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;