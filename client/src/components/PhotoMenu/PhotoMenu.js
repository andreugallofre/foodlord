import React, { Component } from 'react';
import { Button, Grid, Text, RoutedButton } from 'grommet';
import { Attachment, Camera, Previous, Checkmark } from 'grommet-icons';

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
      file: null,
    };

    this.onUploadFile = this.onUploadFile.bind(this);
    this.onPressBack = this.onPressBack.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openInput = this.openInput.bind(this);
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
    const data = new FormData();
    data.append('file', this.state.file, this.state.fileName);
    console.log(data);
    // TODO: POST data to servicefile
  }

  onPressBack() {
    this.setState({ uploadFile: false });
  }

  render() {
    const { uploadFile, fileName } = this.state;

    const text = (<Text style={STYLES.text}>🥑 Upload your meal</Text>);

    return (
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
    );
  }
}

export default PhotoMenu;
