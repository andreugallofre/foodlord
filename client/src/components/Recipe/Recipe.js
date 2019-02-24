import React, { Component } from 'react';
import { Box, Button, Grid, Text, TextInput } from 'grommet';
import {Add, Checkmark, FormClose} from "grommet-icons/es6";
import { postIngredients } from '../../utils';

const STYLES = {
  container: {
    padding: '2em',
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
  title: {
    alignSelf: 'center',
    fontSize: '24px',
    marginBottom: '2em',
  },
  box: {
    marginBottom: '1em',
    marginTop: '1em',
    padding: '1em',
    border: '2px solid #555555',
    borderRadius: '18px',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  input: {
    marginBottom: '1em',
    marginTop: '1em',
    padding: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'helvetica',
    fontSize: '16px',
    color: '#555555',
    paddingTop: '-20px',
  },
  textInput: {
    width: '90%',
  },
  button: {
    marginBottom: '1em',
    fontFamily: 'helvetica',
    align: 'center',
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
    const header = (
      <div>
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.title}>Ingredients</p>
        </div>
      </div>
    );
    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/69182/screenshots/2179253/animated_loading__by__amiri.gif' alt='' />
        ) : (
          <Grid style={STYLES.container}>
            {header}
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
              <div style={STYLES.input}>
                <TextInput
                  style={STYLES.textInput}
                  value={value}
                  onChange={event => this.setState({value: event.target.value})}
                  onSubmit={this.addIngredient}
                />
                <Add onClick={this.addIngredient} />
              </div>
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
