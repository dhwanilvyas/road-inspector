import React, { Component } from 'react';
import db from './firebase';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import Recording from './Recording';
import Trips from './Trips';
import Trip from './Trip';
import Faq from './Faq';

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home page" initial={true} hideNavBar />
          <Scene key="recording" component={Recording} title="Recording" hideNavBar />
          <Scene key="trips" component={Trips} title="My trips" />
          <Scene key="trip" component={Trip} title="Trip details" />
          <Scene key="faq" component={Faq} title="FAQs" />
        </Scene>
      </Router>
    );
  }
};


const styles = {
  navbar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
