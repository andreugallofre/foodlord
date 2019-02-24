import React, { Component } from 'react';
import { Form, FormField, RoutedButton, Button } from 'grommet';
import utils, {setCookie} from '../../utils.js';
import './Login.css';

const STYLES = {
  background: {
    position: 'absolute',
    backgroundImage: "url('https://github.com/atsuky/foodlord/blob/master/client/resources/background.gif?raw=tru')",
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
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1em',
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
    fontSize: '48px',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: '1em',
  },
  input: {
    color: '#7D4CDB',
    background: 'rgba(0, 0, 0, 0)',
    border: '0px solid',
    fontSize: '20px',
    margin: '0.5em'
  },
  registerButton: {
    color: '#7D4CDB',
  },
};

class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
      login: props.login,
      username: "",
      password: ""
    };
		this.login = this.login.bind(this);
	}

	login() {
    const form = this.state;
    var self = this;
    utils.postGetUsers(form.username, form.password)
      .then((response) => {
        setCookie('user', response.data.response);
        self.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        self.props.history.push("/login");
        alert("Username or password incorrect");
      });
	}

  render() {
    return (
      <div style={STYLES.container}>
        <div style={STYLES.background} />
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.text}>Food Lord</p>
        </div>
        <Form>
          <FormField name="username">
            <input
              autoFocus
              onChange={(e) => this.setState({ username: e.target.value})}
              style={STYLES.input}
              placeholder="Username..."
            />
          </FormField>
          <FormField name="password">
            <input
              type="password"
              onChange={(e) => this.setState({ password: e.target.value})}
              style={STYLES.input}
              placeholder="Password..."
            />
          </FormField>
        </Form>
        <div style={STYLES.buttonContainer}>
          <Button
            label="Log In"
            onClick={this.login}
            primary={true}
          />
        </div>
        <div style={STYLES.buttonContainer}>
          <RoutedButton
            color={'white'}
            style={STYLES.registerButton}
            primary={true}
            label="Sign Up"
            path="/register"
          />
        </div>
      </div>
    );
  }
}

export default Login;
