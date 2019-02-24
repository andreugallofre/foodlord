import React from 'react';
import Vega from 'react-vega';
import { spec } from './spec';
import axios from "axios";
import {getCookie} from "../../utils";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: 'table',
        values: []
      },
      loading: true,
    };
  }

  error(e) {
    console.log(e);
  }

  componentWillMount() {
    const user = getCookie('user');
    axios.get(`http://foodlord.tk:443/dashboard?user_id=${user}`)
      .then((res) => {
        this.setState({
          data: {
            name: 'table',
            values: res.data.response.map((x) => {
              return {
                calories: x.calories,
                date: x.date.split('2019-')[1],
              };
            }),
          },
          loading: false,
        });
      })
      .catch(this.error)
  }

  render() {
    const { data, loading } = this.state;
    spec.data[0] = data;

    const key = Date.now();

    return (
      <div>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/69182/screenshots/2179253/animated_loading__by__amiri.gif' alt='' />
        ) : (
          <Vega key={key} spec={spec} />
        )}
      </div>
      );
  }
}

export default Dashboard;
