import React, { Component } from 'react';
import { Box, Button, Grid, Text } from 'grommet';
import { Checkmark } from "grommet-icons/es6";
import { commit } from '../../utils';

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
    marginBottom: '0.5em',
    borderBottom: 'solid 1px #999999',
    paddingBottom: '0.25em',
    marginTop: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalBox: {
    marginBottom: '0.5em',
    marginTop: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginBottom: '1em',
    marginTop: '1em',
  },
  text: {
    fontFamily: 'helvetica',
    fontSize: '16px',
    color: '#333333',
  },
  caloriesText: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#555555',
  },
  totalText: {
    fontFamily: 'helvetica',
    fontSize: '20px',
    color: '#333333',
  },
  totalCaloriesText: {
    fontFamily: 'monospace',
    fontSize: '16px',
    color: '#555555',
  },
  button: {
    marginTop: '2em',
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
            'calories': ing['calories']
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
    const { loading, ingredientsList } = this.state;
    let total = 0;
    for (let i = 0; i < ingredientsList.length; ++i) {
      total = total + ingredientsList[i].calories;
    }
    const header = (
      <div>
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.title}>Preview</p>
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
            {ingredientsList.map((ing, i) => {
              return (
                <Box direction='row' key={i} style={STYLES.box}>
                  <Text style={STYLES.text}>
                    {ing['ingredient']}
                  </Text>
                  <Text style={STYLES.caloriesText}>
                    {`${parseFloat(Math.round(ing['calories'] * 100) / 100).toFixed(2)} cal`}
                  </Text>
                </Box>
              );
            })}
            <Box direction='row' style={STYLES.totalBox}>
              <Text style={STYLES.totalText}>
                {'TOTAL'}
              </Text>
              <Text style={STYLES.totalCaloriesText}>
                {`${parseFloat(Math.round(total * 100) / 100).toFixed(2)} cal`}
              </Text>
            </Box>
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
