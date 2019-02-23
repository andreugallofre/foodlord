import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Dashboard from './components/Dashboard/Dashboard.js'

class App extends Component {  
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
