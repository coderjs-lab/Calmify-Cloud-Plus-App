import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { DoctorAppTabNavigator } from './components/DoctorAppTabNavigator';
import { PatientAppTabNavigator } from './components/PatientAppTabNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  DoctorTab: {screen: DoctorAppTabNavigator},
  PatientTab: {screen: PatientAppTabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);