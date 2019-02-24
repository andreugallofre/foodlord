import React, { Component } from 'react';
import { Box, Button, Grid, Text, TextInput } from 'grommet';
import { Checkmark } from "grommet-icons/es6";
import { commit } from '../../utils';

const STYLES = {
  container: {
    padding: '2em',
  },
  box: {
    marginBottom: '1em',
    marginTop: '1em',
    padding: '1em',
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
  },
  text2: {
    fontFamily: 'helvetica',
    fontSize: '14px',
    color: '#444'
  },
  button: {
    marginBottom: '1em',
    fontFamily: 'helvetica',
    align: 'center',
  },
};

class Preview extends Component {
  constructor(props) {
    super(props);

    const search = window.location.search.split('?ingredients=');
    let list = [];
    if (search.length > 1) {
      list = JSON.parse(decodeURIComponent(search[1]))
        .map((ing )=> {
          return {
            'ingredient': ing['ingredient'].charAt(0).toUpperCase() + ing['ingredient'].substr(1),
            'calories': parseFloat(Math.round(ing['calories'] * 100) / 100).toFixed(2)
          };
        });
    }

    this.state = {
      ingredientsList: list,
      value: '',
      loading: false,
    };

    this.onDone = this.onDone.bind(this);
    this.error = this.error.bind(this);
  }

  error(error) {
    console.log(error);
    alert('Something went wrong');
    this.setState({ loading: false });
  }

  onDone() {
    commit(this.state.ingredientsList, this);
    this.setState({ loading: true });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/69182/screenshots/2179253/animated_loading__by__amiri.gif' alt='' />
        ) : (
          <Grid style={STYLES.container}>
            {this.state.ingredientsList.map((ing, i) => {
              return (
                <Box direction='row' key={i} style={STYLES.box}>
                  <Text style={STYLES.text}>
                    {ing['ingredient']}
                  </Text>
                  <Text style={STYLES.text2}>
                    {`${ing['calories']} cal`}
                  </Text>
                </Box>
              );
            })}
            <Button
              style={STYLES.button}
              icon={<Checkmark />}
              label='Save meal'
              onClick={this.onDone}
              primary
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default Preview;
