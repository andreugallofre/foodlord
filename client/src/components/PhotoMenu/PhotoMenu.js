import React, { Component } from 'react';
import { Button, Grid, RoutedButton } from 'grommet';
import { Attachment, Camera, Previous, Checkmark } from 'grommet-icons';
import { getBase64, postPhoto } from '../../utils';

const STYLES = {
  container: {
    padding: '2em',
    fontFamily: 'helvetica',
    fontWeight: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  avocado: {
    alignSelf: 'center',
    fontSize: '64px',
  },
  text: {
    alignSelf: 'center',
    fontSize: '24px',
    marginBottom: '2em',
  },
  backButton: {
    marginBottom: '1em',
    color: 'white',
  },
  button: {
    marginBottom: '1em',
  },
  background: {
    position: 'absolute',
    backgroundImage: "url('https://github.com/atsuky/foodlord/blob/master/client/resources/back2r_mid.gif?raw=true')",
    opacity: 0.6,
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
    backgroundPosition: 'center',
    backgroundSize: "100% 100%",
    zIndex: -9999,
  },
};

class PhotoMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: false,
      fileName: 'Choose file',
      loading: false,
      file: null,
    };

    this.onUploadFile = this.onUploadFile.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openInput = this.openInput.bind(this);
    this.error = this.error.bind(this);
  }

  error(error) {
    console.log(error);
    alert('Something went wrong');
    this.setState({ loading: false });
  }

  onInputChange(event) {
    this.setState({
      file: event.target.files[0],
      fileName: event.target.files[0].name,
    });
  }

  openInput() {
    this.setState({ uploadFile: true });
  }

  onUploadFile() {
    if (this.state.file) {
      getBase64(this.state.file)
        .then((data) => {
          postPhoto(data, this);
        })
        .catch(this.error);
      this.setState({loading: true});
    } else {
      alert('Choose a file');
    }
  }

  onPressBack() {
    this.setState({ uploadFile: false });
  }

  render() {
    const { uploadFile, fileName, loading } = this.state;

    const header = (
      <div>
        <div style={STYLES.background} />
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.text}>Upload your meal</p>
        </div>
      </div>
    );

    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif' alt='' />
        ) : (
          <div>
            {uploadFile ? (
              <Grid style={STYLES.container}>
                {header}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Upload</span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      onChange={this.onInputChange}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
                  </div>
                </div>
                <Button
                  style={STYLES.button}
                  icon={<Checkmark />}
                  label='Upload'
                  primary
                  onClick={this.onUploadFile}
                />
                <Button
                  style={STYLES.backButton}
                  icon={<Previous color='white' />}
                  label='Back'
                  color={'white'}
                  onClick={this.onPressBack}
                />
              </Grid>
              ) : (
              <Grid style={STYLES.container}>
                {header}
                <Button
                  style={STYLES.button}
                  icon={<Attachment />}
                  label='Photo Library'
                  onClick={this.openInput}
                  primary
                />
                <RoutedButton
                  style={STYLES.button}
                  icon={<Camera />}
                  label='Take Photo'
                  path='camera'
                  primary
                />
              </Grid>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PhotoMenu;
