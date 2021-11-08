//Importing components from libraries
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';


export default class AppHeader extends Component {

    

    //Displaying header component in render
    render(){
        return(
          
                <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="home" type="font-awesome" size={40} color="white" onPress={() => this.props.navigation.navigate('WelcomeScreen')} />}
                    leftContainerStyle={{marginTop:10}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Image
                        style={styles.tinyLogo}
                        source={require('../assets/logo-header.png')}
                    />}
                
                />
      
        );
    }
}

//Using Stylesheet to create different styles
const styles = StyleSheet.create({
    tinyLogo: {
      width: 45,
      height: 45,
      marginTop: 5
    }
});