import React, { Component } from 'react';
import { Form, FormField, TextInput, Box, Button, Grommet, ResponsiveContext } from 'grommet';
import './Register.css'

class Register extends Component { 
	constructor(props) {
    super(props);
    this.state = {
        start: props.start,
        fistname: String,
        lastname: String,
        username: String,
        email: String,
        password: String,
        password2: String
    };
		this.start = this.start.bind(this);
	}

	start() {
		this.props.history.push("/");
	}

  render() {
    return (
    	<Grommet full>
        <ResponsiveContext.Consumer>
        {size => (
            <Box fill align='center'>
            <h2> Register Now! </h2>
              <Form>
                <FormField name="name">   
                  <TextInput autoFocus onChange={this.handleChange} placeholder="First Name"/>
                </FormField>
                <FormField name="lastname">   
                  <TextInput onChange={this.handleChange} placeholder="Last Name"/>
                </FormField>
                <FormField name="username">
                  <TextInput onChange={this.handleChange} placeholder="Username"/>
                </FormField>
                <FormField name="email">   
                  <TextInput onChange={this.handleChange} placeholder="Email"/>
                </FormField>
                <FormField name="password">
                  <TextInput type="password" onChange={this.handleChange} placeholder="Password"/>
                </FormField>
                <FormField name="password2">
                  <TextInput type="password" onChange={this.handleChange} placeholder="Repeat password"/>
                </FormField>
              </Form>
              <div>
                <Button
                  label="Start!"
                  onClick={this.start}                
                  primary={true}
                />
              </div>
            </Box>
        )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Register;
