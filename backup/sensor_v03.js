// Store 

import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// Initialize Dhawnil's Firebase database
const config = {
  apiKey: "AIzaSyBxlLpr1nRtyfgWMBpqTVbtYnB3pUO7B4s",
  authDomain: "roadinspector-afb5c.firebaseapp.com",
  databaseURL: "https://roadinspector-afb5c.firebaseio.com",
  projectId: "roadinspector-afb5c",
  storageBucket: "roadinspector-afb5c.appspot.com",
  messagingSenderId: "570762026848"
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
const accelerationObservable = null;

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
    this.start=this.start.bind(this);
    this.stop=this.stop.bind(this);
  }

  start() {
    accelerationObservable = new Accelerometer({
      updateInterval: 500,
    });
     accelerationObservable
      .subscribe((acceleration) =>  {
        this.checkIfPotHole(acceleration);

        this.setState({
          acceleration,
        });
      });
  }

  stop() {
    let acceleration = {
      x: 0,
      y: 0,
      z: 0,
    };
    accelerationObservable.stop();
     this.setState({acceleration});
      // accelerationObservable = null;
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
    db.push(acceleration);
    this.setPreviousState(acceleration);
  }

  render() {
    const {acceleration} = this.state;

    return (
      <View style={styles.container}>
        <Button StyleSheet={styles.btn} title="Start" style={styles.btn} onPress={this.start}></Button>
        <Button title="Stop" style={styles.btn} onPress={this.stop}></Button>
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
    borderRadius: 2,
  },
  btn: {
   elevation: 4,
   width: '100%',
   backgroundColor: '#007AFF',
   borderRadius: 2,
   marginBottom:10,
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