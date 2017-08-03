import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return(
      <TouchableOpacity onPress={onPress} style={buttonStyle} title='hello'>
        <View>
          <Text style={textStyle}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
};

const styles ={
    textStyle:{
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle:{
        flex: 1,
        alignSelf:'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export default Button;
