import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA4xnYOyNcsLJTpIvadgK3XSvgbTsOL5BE",
    authDomain: "roadinspector-22c9a.firebaseapp.com",
    databaseURL: "https://roadinspector-22c9a.firebaseio.com",
    projectId: "roadinspector-22c9a",
    storageBucket: "roadinspector-22c9a.appspot.com",
    messagingSenderId: "177599961093"
  };
firebase.initializeApp(config);

let db = firebase.database().ref('data');
let previousState = {
  x:0,
  y:0,
  z:0
};

import RNSensors from 'react-native-sensors';
const { Accelerometer } = RNSensors;
const accelerationObservable = new Accelerometer({
  updateInterval: 500,
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
      .subscribe((acceleration) =>  {
        this.checkIfPotHole(acceleration);

        this.setState({
          acceleration,
        });
      });
  }

  componentWillUnmount() {
    accelerationObservable.stop();
  }

  checkIfPotHole(acceleration) {

    if (acceleration.z < 8 || acceleration.z > 11) {
      this.saveData(acceleration);
    }
  }

  setPreviousState(acceleration) {
    previousState = Object.assign({}, acceleration);
  }

  saveData(acceleration) {
    let time = new Date().getTime();
    db.child(time).push(acceleration);
    this.setPreviousState(acceleration);
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