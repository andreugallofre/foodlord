import React from 'react';
import Vega from 'react-vega';
import { spec } from './spec';
import axios from "axios";
import {getCookie} from "../../utils";

const STYLES = {
  container: {
    padding: '2em',
    fontFamily: 'helvetica',
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
  text: {
    alignSelf: 'center',
    fontSize: '24px',
    marginBottom: '2em',
  },
  backButton: {
    marginBottom: '1em',
    color: 'white',
  },
  button: {
    marginBottom: '1em',
  },
  background: {
    position: 'absolute',
    backgroundImage: "url('https://github.com/atsuky/foodlord/blob/master/client/resources/background2.gif?raw=true')",
    opacity: 0.6,
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
    backgroundPosition: 'center',
    backgroundSize: "100% 100%",
    zIndex: -9999,
  },
};

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
    axios.get(`http://localhost:8081/dashboard?user_id=${user}`)
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
          <Vega key={key} spec={spec} />
        )}
      </div>
      );
  }
}

export default Dashboard;
