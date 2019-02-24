import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import PhotoMenu from './components/PhotoMenu/PhotoMenu.js';
import CameraComponent from './components/Camera/CameraComponent.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import Recipe from './components/Recipe/Recipe.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={PhotoMenu} />
          <Route path="/camera" exact component={CameraComponent} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/recipe" exact component={Recipe} />
        </div>
      </Router>
    );
  }
}

export default App;
