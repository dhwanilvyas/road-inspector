import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Card from './components/Card';
import CardSection from './components/CardSection';

class Trips extends Component {

  constructor() {
    super();

    this.state = {
      trips: []
    };

    this.goToTrip = this.goToTrip.bind(this);
  }

  componentDidMount() {
    try {
      AsyncStorage.getAllKeys().then((keys) => {
        let stateKeys = keys.map(key => {
          let date = new Date(parseInt(key.split(":")[1]));
          return {
            key: key,
            value: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes()
          };
        });
        this.setState({
          trips: stateKeys
        });
      });
    } catch (error) {
      ToastAndroid.show('Error saving your trip', ToastAndroid.SHORT);
    }
  }

  goToTrip(trip) {
    Actions.trip({
      trip: trip
    });
  }

  render() {
    if (!this.state.trips.length) {
      return (
        <Text>Loading</Text>
      );
    }

    return (
      <View>
        {this.state.trips.map(trip => {
          return (
            <TouchableHighlight key={trip.key} onPress={() => this.goToTrip(trip)}>
              <View>
                <Card>
                  <CardSection>
                    <Text style={styles.card}>{trip.value}</Text>
                  </CardSection>
                </Card>
              </View>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 10
  }
})
export default Trips;
