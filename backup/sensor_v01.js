// Simply show sensors details
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import RNSensors from 'react-native-sensors';

const { Accelerometer } = RNSensors;
const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

export default class SensorExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
     acceleration: {
        x: 0,
        y: 0,
        z: 0,
      }
    };
  }

  componentWillMount() {
     accelerationObservable
      .subscribe(acceleration => this.setState({
        acceleration,
      }));
  }

  render() {
    const {acceleration} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Accelerometer
        </Text>
        <Text style={styles.instructions}>
          {'X : '+acceleration.x.toFixed(7)}
        </Text>
        <Text style={styles.instructions}>
          {'Y : '+acceleration.y.toFixed(7)}
        </Text>
        <Text style={styles.instructions}>
          {'Z : '+acceleration.z.toFixed(7)}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    accelerationObservable.stop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 30,
    textAlign: 'left',
    color: '#333333',
    margin: 25,
    marginBottom: 5,
  }
});