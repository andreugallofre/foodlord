import React, { Component } from 'react';
import { Notification, FormClose } from 'grommet-icons';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
} from 'grommet';

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

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

class Dashboard extends Component {
  state = {
    showSidebar: false,
  }  
  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
          <AppBar>
            Hi (username)!
            <Heading level='3' margin='none'>Food Lord</Heading>
            <Button
              icon={<Notification />}
              onClick={() => this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))}
            />
          </AppBar>
          <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align='center' justify='center'>
              app body
            </Box>
            {(!showSidebar || size !== 'small') ? (
              <Collapsible direction="horizontal" open={showSidebar}>
              <Box
                flex
                width='medium'
                background='light-2'
                elevation='small'
                align='center'
                justify='center'
              >
                sidebar
              </Box>
            </Collapsible>
            ): (
              <Layer>
                <Box
                  background='light-2'
                  tag='header'
                  justify='end'
                  align='center'
                  direction='row'
                >           
                  <Button
                    icon={<FormClose />}
                    onClick={() => this.setState({ showSidebar: false })}
                  />
                </Box>
                <Box
                  fill
                  background='light-2'
                  align='center'
                  justify='center'>
                sidebar
                </Box>
              </Layer>
            )}
          </Box>
        </Box>
      )}
      </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Dashboard;
