// Store All Reading in Firebase

import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// Initialize Firebase
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

import RNSensors from 'react-native-sensors';
const { Accelerometer } = RNSensors;
const accelerationObservable = new Accelerometer({
  updateInterval: 500, // defaults to 100ms
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
        let time = new Date().getTime();
       // db.child(time).push(acceleration);
        this.setState({
          acceleration,
        });
      });
  }

  componentWillUnmount() {
    accelerationObservable.stop();
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