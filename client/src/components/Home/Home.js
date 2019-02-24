import React, { Component } from 'react';
import { BarChart, Camera } from 'grommet-icons';
import { Box, Button } from 'grommet';
import { getCookie } from '../../utils';

const STYLES = {
	background: {
		position: 'absolute',
		backgroundImage: "url('https://github.com/atsuky/foodlord/blob/master/client/resources/background2.gif?raw=tru')",
		opacity: 0.5,
		left: 0,
		right: 0,
		top:0,
		bottom: 0,
		backgroundPosition: 'center',
		backgroundSize: "100% 100%",
		zIndex: -9999,
	},
	container: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '1em',
		fontFamily: 'helvetica',
		fontWeight: 100,
	},
};

class Home extends Component {
	constructor(props) {
		super(props);
		if (!getCookie('user')) {
			this.props.history.push("/login");
		} else {
			this.dashboard = this.dashboard.bind(this);
			this.camera = this.camera.bind(this);
		}
	}

	dashboard() {
		this.props.history.push("/dashboard");
	}

	camera() {
		this.props.history.push("/upload");
	}

  render() {
    return (
			<div style={STYLES.container}>
				<div style={STYLES.background} />
				<Button
					icon={<Camera color='plain' size='xlarge'/>}
					onClick={this.camera}
				/>
				<Button
					icon={<BarChart color='plain' size='xlarge'/>}
					onClick={this.dashboard}
				/>
			</div>
    );
  }
}

export default Home;
