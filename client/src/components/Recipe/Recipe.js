import React, { Component } from 'react';

class Recipe extends Component {
  constructor(props) {
    super(props);
    const search = window.location.search.split('?ingredients=');
    let list = [];
    if (search.length > 1) {
      list = search[1].split(';').map(s => s.replace('_', ' '));
    }
    this.state = {
      ingredientsList: list,
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.ingredientsList.map((ing, i) => {
            return (<li key={i}>{ing}</li>);
          })}
        </ul>
      </div>
    );
  }
}

export default Recipe;
