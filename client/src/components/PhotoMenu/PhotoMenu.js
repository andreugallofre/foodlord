import React, { Component } from 'react';
import { Button, Grid, Text, RoutedButton } from 'grommet';
import { Attachment, Camera, Previous, Checkmark } from 'grommet-icons';
import { getBase64, postPhoto } from '../../utils';

const STYLES = {
  container: {
    padding: '2em',
  },
  text: {
    align: 'center',
    fontFamily: 'helvetica',
    fontSize: '24px',
    justify: 'center',
    marginBottom: '2em',
    marginTop: '2em',
  },
  button: {
    marginBottom: '1em',
    fontFamily: 'helvetica',
    align: 'center',
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

    const text = (<Text style={STYLES.text}>🥑 Upload your meal</Text>);

    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif' alt='' />
        ) : (
          <div>
            {uploadFile ? (
              <Grid style={STYLES.container}>
                {text}
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
                  onClick={this.onUploadFile}
                  primary
                />
                <Button
                  style={STYLES.button}
                  icon={<Previous />}
                  label='Back'
                  onClick={this.onPressBack}
                />
              </Grid>
              ) : (
              <Grid style={STYLES.container}>
                {text}
                <Button
                  style={STYLES.button}
                  icon={<Attachment />}
                  label='Photo Library'
                  onClick={this.openInput}
                />
                <RoutedButton
                  style={STYLES.button}
                  icon={<Camera />}
                  label='Take Photo'
                  path='camera'
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
