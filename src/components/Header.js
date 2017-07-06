//Import Libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return(
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle:{
        backgroundColor: '#F8F8F8',
        justifyContent:'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4 },
        shadowOpacity: 0.4,
        elevation: 2,
        position: 'relative'
    },
    textStyle:{
        fontSize: 30
    }
};

// Make the component available to other parts of the app
 export default Header;