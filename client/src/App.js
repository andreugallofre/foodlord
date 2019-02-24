import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js'
import PhotoMenu from './components/PhotoMenu/PhotoMenu.js';
import CameraComponent from './components/Camera/CameraComponent.js';
import Dashboard from './components/Dashboard/Dashboard.js'
import Register from './components/Register/Register.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={PhotoMenu} />
          <Route path="/camera" exact component={CameraComponent} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
