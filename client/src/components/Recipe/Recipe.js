import React, { Component } from 'react';
import { Box, Button, Grid, Text, TextInput } from 'grommet';
import {Add, Checkmark, FormClose} from "grommet-icons/es6";
import { postIngredients } from '../../utils';

const STYLES = {
  container: {
    padding: '2em',
  },
  box: {
    marginBottom: '1em',
    marginTop: '1em',
    padding: '1em',
    border: '2px solid #7D4CDB',
    borderRadius: '18px',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  input: {
    marginBottom: '1em',
    marginTop: '1em',
    padding: '1em',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'helvetica',
    fontSize: '16px',
    paddingTop: '-20px',
  },
  textInput: {
    width: '90%',
  },
  button: {
    marginBottom: '1em',
    fontFamily: 'helvetica',
    align: 'center',
  },
  add: {
    marginTop: '30px',
    marginBottom: '1em',
    marginLeft: '1em',
    marginRight: '1em',
  }
};

class Recipe extends Component {
  constructor(props) {
    super(props);

    const search = window.location.search.split('?ingredients=');
    let list = [];
    if (search.length > 1) {
      list = JSON.parse(decodeURIComponent(search[1]));
    }

    this.state = {
      ingredientsList: list,
      value: '',
      loading: false,
    };

    this.removeIngredient = this.removeIngredient.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.onDone = this.onDone.bind(this);
    this.error = this.error.bind(this);
  }

  error(error) {
    console.log(error);
    alert('Something went wrong');
    this.setState({ loading: false });
  }

  removeIngredient(key) {
    let { ingredientsList } = this.state;
    ingredientsList.splice(key, 1);
    this.setState({ ingredientsList: ingredientsList });
  }

  addIngredient() {
    let { ingredientsList, value } = this.state;
    ingredientsList.push(value);
    this.setState({ ingredientsList: ingredientsList, value: '' });
  }

  onDone() {
    postIngredients(this.state.ingredientsList, this);
    this.setState({ loading: true });
  }

  render() {
    const { loading, value } = this.state;
    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/69182/screenshots/2179253/animated_loading__by__amiri.gif' alt='' />
        ) : (
          <Grid style={STYLES.container}>
              {this.state.ingredientsList.map((ing, i) => {
                const content = ing.charAt(0).toUpperCase() + ing.substr(1);
                return (
                  <Box direction='row' key={i} style={STYLES.box}>
                    <Text style={STYLES.text}>
                      {content}
                    </Text>
                    <FormClose onClick={() => this.removeIngredient(i)} />
                  </Box>
                );
              })}
              <Box direction='row' style={STYLES.input}>
                <TextInput
                  style={STYLES.textInput}
                  value={value}
                  onChange={event => this.setState({value: event.target.value})}
                  onSubmit={this.addIngredient}
                />
                <Add style={STYLES.add} onClick={this.addIngredient} />
              </Box>
              <Button
                style={STYLES.button}
                icon={<Checkmark />}
                label='Done'
                onClick={this.onDone}
                primary
              />
          </Grid>
        )}
      </div>
    );
  }
}

export default Recipe;
