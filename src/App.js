// Import a library to help create a component
import React, { Component } from 'react';
import { Text,
        View
      } from 'react-native';
import firebase from 'firebase';
import RNSensors from 'react-native-sensors';
import Header from './components/Header';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Section from './components/Section';
import Button from './components/Button';

const { Accelerometer } = RNSensors;
const accelerationObservable = null;

// Initialize Panth's Firebase database
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

// Create a Component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        },
        isStarted: false
    };
    this.start=this.start.bind(this);
    this.stop=this.stop.bind(this);
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
      x: 0,
      y: 0,
      z: 0,
    };
    accelerationObservable.stop();
    this.setState({isStarted: false});
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
    
    const { 
        instructions, 
        container
    } = styles;
    let btn1 = null;
    if (!this.state.isStarted) {
      btn1 = <Button onPress={this.start}>Start</Button>
    } else {
      btn1 = <Button onPress={this.stop} >Stop</Button> 
    }

    return (
        <View style={{ flex:1 }}>
            <Header headerText={'Road Inspector'}/>
            <Card>
                <Section>
                    <Text style={instructions}>
                        {'X : '+acceleration.x.toFixed(7)}
                    </Text>
                </Section>
                <Section>
                    <Text style={instructions}>
                        {'Y : '+acceleration.y.toFixed(7)}
                    </Text>
                </Section>
                <Section>
                    <Text style={instructions}>
                        {'Z : '+acceleration.z.toFixed(7)}
                    </Text>
                </Section>
                
                <Section>
                  {btn1}
                </Section> 
                {/*<Section>
                   <Button onPress={this.start}>Starts</Button>
                </Section>
                <Section>
                    <Button onPress={this.stop} >Stops</Button>
                </Section>*/}
            </Card>
        </View>

    );
  }
};


const styles = {
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
    marginLeft: 40,
  }
};

export default App;