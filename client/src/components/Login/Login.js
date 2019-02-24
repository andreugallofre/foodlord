import React, { Component } from 'react';
import { Form, FormField, TextInput, RoutedButton, Box, Button, Grommet, ResponsiveContext } from 'grommet';
import './Login.css'
import utils from '../../utils.js'

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
    .then(function(response) {
        self.props.history.push("/");
    })
    .catch(function(error) {
        self.props.history.push("/login");
        alert("Username or password incorrect");
    });
	}

  render() {
    return (
    	<Grommet full>
        <ResponsiveContext.Consumer>
        {size => (
          <Box fill align='center' justify='center'>
            <div className="background"/>
            <h2> Welcome to FoodLord </h2>
            <Form>
              <FormField name="username">
                <TextInput autoFocus onChange={(e) => this.setState({ username: e.target.value})} placeholder="Username"/>
              </FormField>
              <FormField name="password">
                <TextInput type="password" onChange={(e) => this.setState({ password: e.target.value})} placeholder="Password"/>
              </FormField>
            </Form>
            <div className="buttons">
              <Button
                label="Login"
                onClick={this.login}
                primary={true}
              />
            </div>
            <div className="buttons">
              <RoutedButton label="Register now" path="/register" />
            </div>
          </Box>
        )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Login;
