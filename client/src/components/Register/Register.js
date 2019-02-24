import React, { Component } from 'react';
import { Form, FormField, Button } from 'grommet';
import '../../styles/commonStyles.css';
import utils from '../../utils.js';
import {setCookie} from "../../utils";

const STYLES = {
  background: {
    position: 'absolute',
    backgroundImage: "url('https://github.com/atsuky/foodlord/blob/master/client/resources/back1r_mid.gif?raw=true')",
    opacity: 0.6,
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
    alignItems: 'center',
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
  title: {
    alignSelf: 'center',
    fontSize: '24px',
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

class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {
        start: props.start,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        password2: ""
    };
		this.start = this.start.bind(this);
	}

	start() {
    const form = this.state;
    var self = this;
    if (form.password !== form.password2) {
        self.props.history.push("/register");
        alert("Passwords doesn't match");
    }
    else {
      utils.postUser(form.username, form.firstname, form.lastname, form.email, form.password)
        .then(function(response) {
          setCookie('user', response.data.response);
          self.props.history.push("/");
        })
        .catch(function(error) {
          self.props.history.push("/register");
          alert("Username invalid");
        });
    }
	}

  render() {
    return (
      <div style={STYLES.container}>
        <div style={STYLES.background} />
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.text}>Food Lord</p>
          <p style={STYLES.title}>Sign Up</p>
        </div>
        <Form>
          <FormField name="name">
            <input
              onChange={(e) => this.setState({ firstname: e.target.value})}
              placeholder="First Name"
              style={STYLES.input}
            />
          </FormField>
          <FormField name="lastname">
            <input
              onChange={(e) => this.setState({ lastname: e.target.value})}
              placeholder="Last Name"
              style={STYLES.input}
            />
          </FormField>
          <FormField name="username">
            <input
              onChange={(e) => this.setState({ username: e.target.value})}
              placeholder="Username"
              style={STYLES.input}
            />
          </FormField>
          <FormField name="email">
            <input
              onChange={(e) => this.setState({ email: e.target.value})}
              placeholder="Email"
              style={STYLES.input}
            />
          </FormField>
          <FormField name="password">
            <input
              type="password"
              onChange={(e) => this.setState({ password: e.target.value})}
              placeholder="Password"
              style={STYLES.input}
            />
          </FormField>
          <FormField name="password2">
            <input
              type="password"
              onChange={(e) => this.setState({ password2: e.target.value})}
              placeholder="Repeat password"
              style={STYLES.input}
            />
          </FormField>
        </Form>
        <div style={STYLES.buttonContainer}>
          <Button
            label="Sign Up"
            onClick={this.start}
            primary={true}
          />
        </div>
      </div>
    );
  }
}

export default Register;
