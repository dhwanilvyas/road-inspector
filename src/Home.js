import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ToastAndroid
} from 'react-native';
import firebasedb from './firebase';
import RNSensors from 'react-native-sensors';
import { Actions } from 'react-native-router-flux';
import Header from './components/Header';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Section from './components/Section';
import Button from './components/Button';

const logo = require('./images/ic_launcher.png');

const { Accelerometer } = RNSensors;
const accelerationObservable = null;

let db = firebasedb.ref('data');

let previousState = {
  z:0
};

class Home extends Component {

  render() {
    const { instructions, container } = styles;

    if (this.props.toast) {
      ToastAndroid.show('Thank you for your contribution!', ToastAndroid.SHORT);
    }

    return (
      <View style={{ flex:1 }}>
        <Header headerText={'Road Inspector'}/>
        <View style={container}>
          <Section style={container}>
            <Image
              source={logo}
            />
          </Section>
          <Section>
            <Text style={instructions}>Help keep your streets smooth</Text>
          </Section>
          <Section>
            <Button onPress={Actions.recording}>Record a trip</Button>
          </Section>
          <Section>
            <Button onPress={Actions.trips}>My trips</Button>
          </Section>
          <Section>
            <Button onPress={Actions.faq}>FAQs</Button>
          </Section>
        </View>
      </View>
    );
  }
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  instructions: {
    fontSize: 20,
    margin: 10
  }
};

export default Home;
