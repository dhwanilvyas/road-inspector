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
  z:0
};

// Create a Component

class App extends Component {
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
    this.start=this.start.bind(this);
    this.stop=this.stop.bind(this);
  }
  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      // navigator.geolocation.getCurrentPosition(
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
    // this.setState();
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
    let data = {
      z: acceleration.z,
      lat: this.state.lat,
      lng: this.state.lng,
    }
    db.push(data).then(function(){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
   // console.log(data);
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
                    <Text style={instructions}>Latitude: {this.state.lat}</Text>
                </Section>
                <Section>
                     <Text style={instructions}>Longitude: {this.state.lng}</Text>
                </Section>
                <Section>
                    <Text style={instructions}>
                        {'Z : '+acceleration.z.toFixed(1)}
                    </Text>
                </Section>
                <Section>
                    {this.state.error ? <Text style={instructions} >Error: {this.state.error}</Text> : null}
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