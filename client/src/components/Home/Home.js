import React, { Component } from 'react';
import { Dashboard, Camera } from 'grommet-icons';
import { Box, Button, Grommet, ResponsiveContext } from 'grommet';

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

class Home extends Component { 
	constructor(props) {
		super(props);
		this.dashboard = this.dashboard.bind(this);
		this.camera = this.camera.bind(this);
	}

	dashboard() {
		this.props.history.push("/dashboard");
	}

	camera() {
		this.props.history.push("/camera");
	}

  render() {
    return (
    	<Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
      	  <Box flex align='center' justify='center' direction='row'>
						<Button
							icon={<Camera color='plain' size='xlarge'/>}
							onClick={this.camera}
						/> 
						<Button
							icon={<Dashboard color='plain' size='xlarge'/>}
							onClick={this.dashboard}
						/>
          </Box>
        </Box>
      )}
      </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Home;
