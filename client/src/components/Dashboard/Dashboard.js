import React, { Component } from 'react';
import { Button, Grommet, ResponsiveContext } from 'grommet';

const theme = {
    global: {
      colors: {
          brand: '#228BE6',
        },
        font: {
          family: 'Roboto',
          size: '14px',
          height: '20px',
        },
    },
};

class Dashboard extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Button onClick={() => {}}> Hola </Button> 
      )}
      </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Dashboard;
