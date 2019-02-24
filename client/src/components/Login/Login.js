import React, { Component } from 'react';
import { Form, FormField, TextInput, RoutedButton, Box, Button, Grommet, ResponsiveContext } from 'grommet';
import './Login.css'

class Login extends Component { 
	constructor(props) {
    super(props);
    this.state = {
      login: props.login,
      username: "",
      password: ""
    };
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
	}

	login() {

    var data = {
      username: this.state.username,
      password: this.state.password,
    } 

		this.props.history.push("/");
	}

	register() {
		this.props.history.push("/register");
	}

  render() {
    return (
    	<Grommet full>
        <ResponsiveContext.Consumer>
        {size => (
          <Box fill align='center' justify='center'>
          <h2> Welcome to FoodLord </h2>
            <Form>
              <FormField name="username">
                <TextInput autoFocus onChange={(e) => this.setState({ username: e.target.value})} placeholder="Username"/>
              </FormField>
              <FormField name="password">
                <TextInput type="password" onChange={(e) => this.setState({ password: e.target.value})} placeholder="Password"/>
              </FormField>
            </Form>
            <div>
              <Button
                label="Login"
                onClick={this.login}
                primary={true}
              />
            </div>
            <div>
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
