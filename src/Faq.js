import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Faq extends Component {

  render() {
    const { container, title } = styles;

    return (
      <View style={container}>
        <Text style={title}>About Road Inspector</Text>
        <Text>
          Road Inspector is an initiative to detect potholes and bumps on roads and provide the authorities with insightful
          data in order to city's streets smooth.
        </Text>
        <View style={styles.hr}></View>
        <Text style={title}>How do we do that?</Text>
        <Text>
          We collect data based on user's vehicle movements and location. We then process this data to match certain
          criterias and then the data is stored to our servers. This data is then provided to the authorities.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  hr: {
    borderColor: '#bbbbbb',
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  }
});

export default Faq;
