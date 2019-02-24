import React, { Component } from 'react';
import { Form, FormField, TextInput, RoutedButton, Box, Button, Grommet, ResponsiveContext } from 'grommet';
import './Login.css'

class Login extends Component { 
	constructor(props) {
    super(props);
    this.state = {
      login: props.login,
      username: String,
      password: String
    };
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
	}

	login() {

    /* Insertar comprovació de que es correcte */ 

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
                <TextInput autoFocus onChange={this.handleChange} placeholder="Username"/>
              </FormField>
              <FormField name="password">
                <TextInput type="password" onChange={this.handleChange} placeholder="Password"/>
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
