import React, { Component } from 'react';
import { Form, FormField, TextInput, Box, Button, Grommet, ResponsiveContext } from 'grommet';
import './Register.css'
import utils from '../../utils.js'

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
        utils.postUser(form.username, form.firstname, form.lastname, form.email, form.password)
        .then(function(response) {
            if (response.data.success) {
                self.props.history.push("/");
            } else {
                self.props.history.push("/register");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
	}

  render() {
    return (
    	<Grommet full>
        <ResponsiveContext.Consumer>
        {size => (
            <div>
              <div className="background"/>
              <Box fill align='center'>
                <h2> Register Now! </h2>
                <Form>
                  <FormField name="name">   
                    <TextInput autoFocus onChange={(e) => this.setState({ firstname: e.target.value})} placeholder="First Name"/>
                  </FormField>
                  <FormField name="lastname">   
                    <TextInput onChange={(e) => this.setState({ lastname: e.target.value})} placeholder="Last Name"/>
                  </FormField>
                  <FormField name="username">
                    <TextInput onChange={(e) => this.setState({ username: e.target.value})} placeholder="Username"/>
                  </FormField>
                  <FormField name="email">   
                    <TextInput onChange={(e) => this.setState({ email: e.target.value})} placeholder="Email"/>
                  </FormField>
                  <FormField name="password">
                    <TextInput type="password" onChange={(e) => this.setState({ password: e.target.value})} placeholder="Password"/>
                  </FormField>
                  <FormField name="password2">
                    <TextInput type="password" onChange={(e) => this.setState({ password2: e.target.value})} placeholder="Repeat password"/>
                  </FormField>
                </Form>
                <div className="buttons">
                  <Button
                    label="Start!"
                    onClick={this.start}                
                    primary={true}
                  />
                </div>
              </Box>
            </div>
        )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default Register;
