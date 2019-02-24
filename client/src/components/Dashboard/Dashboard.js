import React from 'react';
import Vega from 'react-vega';
import { spec } from './spec';
import axios from "axios";
import {getCookie} from "../../utils";
import { RoutedButton } from "grommet";
import {Previous} from "grommet-icons";

const STYLES = {
  background: {
    background: 'linear-gradient(to top left, #006600 0%, #cc9900 100%)',
    position: 'absolute',
    opacity: 0.6,
    left: 0,
    right: 0,
    top:0,
    bottom: 0,
    backgroundPosition: 'center',
    backgroundSize: "100% 100%",
    zIndex: -9999,
  },
  container: {
    padding: '1em',
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
  title: {
    alignSelf: 'center',
    fontSize: '24px',
    marginBottom: '2em',
  },
  button: {
    marginTop: '2em',
    align: 'center',
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

    const header = (
      <div>
        <div style={STYLES.background} />
        <div style={STYLES.header}>
          <p style={STYLES.avocado}>🥑</p>
          <p style={STYLES.title}>Weekly report</p>
        </div>
      </div>
    );

    return (
      <div style={STYLES.container}>
        {loading ? (
          <img src='https://cdn.dribbble.com/users/69182/screenshots/2179253/animated_loading__by__amiri.gif' alt='' />
        ) : (
          <div>
            {header}
            <Vega key={key} spec={spec} />
            <RoutedButton
              style={STYLES.button}
              icon={<Previous />}
              label='Home'
              path='/'
              plain
            />
          </div>
        )}
      </div>
      );
  }
}

export default Dashboard;
