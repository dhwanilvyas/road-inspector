import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { decorator as sensors } from 'react-native-sensors';

const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
});

// Normal RxJS functions
accelerationObservable
  .map(({ x, y, z }) => x + y + z)
  .filter(speed => speed > 20)
  .subscribe(speed => console.log(`You moved your phone with ${speed}`));

setTimeout(() => {
  accelerationObservable.stop();
}, 1000);

class AccelerometerComponent { 
  render() {
    const {
      Accelerometer
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Acceleration has value: {Accelerometer}
        </Text>
      </View>
    );
  }
}

export default sensors({
  Accelerometer: {
    updateInterval: 300, // optional
  },
})(AccelerometerComponent);