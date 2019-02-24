import React, { Component } from 'react';
import { RoutedButton, Grid } from 'grommet';
import Camera from 'react-html5-camera-photo';
import { Previous } from 'grommet-icons';
import { postPhoto } from '../../utils';
import './CameraComponent.css';

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

    this.state = {
      loading: false,
    };

    this.onTakePhoto = this.onTakePhoto.bind(this);
    this.error = this.error.bind(this);
  }

  error(error) {
    console.log(error);
    alert('Something went wrong');
    this.setState({ loading: false });
  }

  onTakePhoto(raw) {
    const data = raw.split('data:image/png;base64,')[1];
    console.log(data);
    postPhoto(data)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(this.error);
    this.setState({ loading: true });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif' />
        ) : (
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
        )}
      </div>
    );
  }
}

export default CameraComponent;
