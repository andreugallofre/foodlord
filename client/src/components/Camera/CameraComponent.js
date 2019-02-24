import React, { Component } from 'react';
import { RoutedButton, Grid } from 'grommet';
import Camera from 'react-html5-camera-photo';
import './CameraComponent.css';
import { Previous } from 'grommet-icons';

const STYLES = {
  container: {
    padding: '2em',
  },
  button: {
    marginTop: '2em',
    fontFamily: 'helvetica',
    align: 'center',
  },
};

class CameraComponent extends Component {
  constructor(props) {
    super(props);
  }



  onTakePhoto(dataUri) {
    // TODO: POST data to service
  }

  render() {
    return (
      <Grid>
        <div className="App">
          <Camera
            onTakePhoto={this.onTakePhoto}
            idealResolution={{width: 375, height: 812}}
          />
        </div>
        <Grid styles={STYLES.container}>
          <RoutedButton
            style={STYLES.button}
            icon={<Previous />}
            label='Back'
            path='upload'
            plain
          />
        </Grid>
      </Grid>
    );
  }
}

export default CameraComponent;
