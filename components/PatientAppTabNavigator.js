//Importing components from libraries
import React, { Component }  from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';
import DataScreen from '../screens/DataScreen';
import HomeScreenPatient from '../screens/HomeScreenPatient';

//Displaying the bootom tab navigator
export const PatientAppTabNavigator = createMaterialBottomTabNavigator({

    PatientHomeScreen : {
        screen: HomeScreenPatient,
        navigationOptions :{
        tabBarIcon : ({ tintColor, focused }) => <Icon name="clinic-medical" type="font-awesome-5" size={23} color={tintColor} focused={true}/>,
        tabBarLabel : <Text style={{ fontSize: 12, textAlignVertical:"bottom", textAlign: 'center'}}>Home</Text>
        }
    }
},
{
    initialRouteName: 'PatientHomeScreen',
    activeColor: '#2DA3FF',
    inactiveColor: '#799197',
    barStyle: { backgroundColor: 'white', borderTopWidth: 2.5 , borderTopColor: '#55adf1'},
}
);