import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Section from './components/Section';
import Button from './components/Button';

class Trip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: {}
    };
  }

  componentDidMount() {
    try {
      AsyncStorage.getItem(this.props.trip.key).then((trip) => {
        this.setState({
          trip: JSON.parse(trip)
        });
      });
    } catch (error) {
      ToastAndroid.show('Error getting your trip', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.instructions}>Potholes: {this.state.trip.potholes}</Text>
        <Text style={styles.instructions}>Bumps: {this.state.trip.bumps}</Text>
        <Section>
          <Button onPress={Actions.home}>Back home</Button>
        </Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  instructions: {
    fontSize: 50,
  }
});

export default Trip;
