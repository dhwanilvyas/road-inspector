import React, { Component } from 'react';
import { Text,
        View
      } from 'react-native';
import Header from './components/Header';
import Card from './components/Card';
import CardSection from './components/CardSection';
import Section from './components/Section';
import Button from './components/Button';

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
        latitude: null,
        longitude: null,
        error: null,
        };
    }
    componentDidMount() {
        this.watchId = navigator.geolocation.getCurrentPosition(
       // navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('in position');
                console.log('Latitude :'+position.coords.latitude);
                console.log('longitude :'+position.coords.longitude);
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
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
    render(){
        const { 
            instructions
        } = styles;

        return(
            <View style={{ flex:1 }}>
            <Header headerText={'Location'}/>
            <Card>
                <Section>
                    <Text style={instructions}>Latitude: {this.state.latitude}</Text>
                </Section>
                <Section>
                    <Text style={instructions}>Longitude: {this.state.longitude}</Text>
                </Section>
                <Section>
                    {this.state.error ? <Text style={instructions} >Error: {this.state.error}</Text> : null}
                </Section>
            </Card>
        </View>
        )
    }
}

const styles = {
  instructions: {
    fontSize: 30,
    textAlign: 'left',
    color: '#333333',
    margin: 25,
    marginLeft: 40,
  }
};

export default Location;