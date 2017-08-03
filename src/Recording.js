import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import firebasedb from './firebase';
import RNSensors from 'react-native-sensors';
import { Actions } from 'react-native-router-flux';
import Button from './components/Button';
import Section from './components/Section';
import Card from './components/Card';
import CardSection from './components/CardSection';

const { Accelerometer } = RNSensors;
const accelerationObservable = null;

let db = firebasedb.ref('data');

let previousState = {
  z:0
};

let potholes = 0, bumps = 0;

class Recording extends Component {

  constructor(props) {
    super(props);

    this.state = {
      acceleration: {
        z: 0,
      },
      lat: null,
      lng: null,
      error: null,
      isStarted: false
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.watchLocation = this.watchLocation.bind(this);
  }

  componentDidMount() {
    // AsyncStorage.clear();
    this.start();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        console.log(error);
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000, distanceFilter: 0.1 },
    );

    this.watchLocation();
  }

  watchLocation() {
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        console.log(error);
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  start() {
    accelerationObservable = new Accelerometer({
      updateInterval: 500,
    });

    this.setState({isStarted: true});

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
      z: 0,
    };

    accelerationObservable.stop();

    this.setState({
      isStarted: false,
      acceleration: acceleration,
    });

    try {
      let key = new Date().getTime();

      AsyncStorage.setItem('@RoadInspector:' + key, JSON.stringify({
        potholes: 5,
        bumps: 1
      }));

    } catch (error) {
      ToastAndroid.show('Error saving your trip', ToastAndroid.SHORT);
    }

    Actions.home({
      toast: true
    });
  }

  checkIfPotHole(acceleration) {
    if (acceleration.z < 8 || acceleration.z > 11) {
      this.saveData(acceleration);
      potholes += 1;
    }
  }

  setPreviousState(acceleration) {
    previousState = Object.assign({}, acceleration);
  }

  saveData(acceleration) {
    let time = new Date().getTime();
    let data = {
      z: acceleration.z,
      lat: this.state.lat,
      lng: this.state.lng,
      timestamp: time
    };

    db.push(data).then(function(){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });

    this.setPreviousState(acceleration);
  }

  render() {
    const {acceleration} = this.state;

    const {
      instructions,
      container,
      recording
    } = styles;

    return (
      <View style={{ flex:1 }}>
        <View style={container}>
          {/* <Section>
            <Text style={instructions}>Latitude: {this.state.lat}</Text>
          </Section>
          <Section>
            <Text style={instructions}>Longitude: {this.state.lng}</Text>
          </Section>
          <Section>
            <Text style={instructions}>
              {'Z : '+acceleration.z.toFixed(1)}
            </Text>
          </Section> */}
          <View style={recording}>
            <ActivityIndicator animating={true} size='large' />
          </View>
          <Section>
            {this.state.error ? <Text style={instructions} >Error: {this.state.error}</Text> : null}
          </Section>
          <Section>
            <Button onPress={this.stop}>Stop recording</Button>
          </Section>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  recording: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 20,
  }
});

export default Recording;
