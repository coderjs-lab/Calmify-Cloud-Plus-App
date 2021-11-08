import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, ImageBackground, TextInput, SafeAreaView} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {db} from '../config.js';
import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase';
import {Icon, Input, Button, Avatar, CheckBox} from 'react-native-elements';
import HomeScreenDoctor from './HomeScreenDoctor';

export default class WelcomeScreen extends Component {
    
  constructor(){
    super()
    this.state={
      patientEmail : '',
      patientMobileNumber: "",
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      caretakerEmail: "",
      caretakerMobileNumber: "",
      doctorEmail: "",
      doctorMobileNumber: "",
      address : "",
      confirmPassword : "",
      city: "",
      country: "",
      pincode: "",
      gender:"",
      age:0,
      reason:'',
      checked_male:false,
      checked_female:false,    
      teen: false,
      millenials: false,
      gen_x: false,
      boomers: false,
      matures: false
    }
  }

  patientLogin = (patientEmail, password)=>{
    firebase.auth().signInWithEmailAndPassword(patientEmail, password)
    .then(()=>{
        this.props.navigation.navigate('PatientTab')
        return  Alert.alert(
            'Patient Logged in Successfully',
            '',
            [
              {text: 'OK'},
            ]
        );
    })
    .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
  }

  doctorLogin = (patientEmail, password)=>{
    firebase.auth().signInWithEmailAndPassword(patientEmail, password)
    .then(()=>{
        this.props.navigation.navigate('DoctorTab')
        return  Alert.alert(
            'Doctor Logged in Successfully',
            '',
            [
              {text: 'OK'},
            ]
        );
    })
    .catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
  }

  userSignUp = (patientEmail, password, confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("Password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(patientEmail, password)
      .then((response)=>{
        var userId = Math.random().toString(36).substring(7);
        firebase.database().ref('users/' + 't6co0x').set({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            patient_mobile_number:this.state.patientMobileNumber,
            doctor_mobile_number:this.state.doctorMobileNumber,
            caretaker_mobile_number: this.state.caretakerMobileNumber,
            patient_email: this.state.patientEmail,
            doctor_email: this.state.caretakerEmail,
            caretaker_email: this.state.doctorEmail,
            address:this.state.address,
            city:this.state.city,
            country:this.state.country,
            pincode:this.state.pincode,
            user_id:'t6co0x',
            checked_male:this.state.checked_male,
            checked_female:this.state.checked_female,
            teen:this.state.teen,
            millenials:this.state.millenials,
            gen_x:this.state.gen_x,
            boomers:this.state.boomers,
            matures:this.state.matures
        })
        return  Alert.alert(
            'User Added Successfully',
            '',
            [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
            ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>{
    return(
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      visible={this.state.isVisible}
      >
      <View style={{backgroundColor: '#ffffff'}}>
        <ScrollView style={{width:'100%', length: '100%'}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(22),fontWeight:"bold",color:"#008FFF", marginBottom:20, marginTop:50}}> SIGN UP </Text>
          </View>
          <View style={{flex:0.95}}>
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>First Name</Text>
            <Input 
                placeholder="First Name"
                
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                    <Icon
                        name='user'
                        type="font-awesome"
                        size={24}
                        color='#008FFF'
                    />
                }
                onChangeText={(text)=>{
                    this.setState({
                        firstName: text
                    })
                }}
                value={this.state.firstName}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Last Name</Text>
            <Input 
                placeholder="Last Name"
                
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                    <Icon
                        name='user'
                        type="font-awesome"
                        size={24}
                        color='#008FFF'
                    />
                }
                onChangeText={(text)=>{
                    this.setState({
                        lastName: text
                    })
                }}
                value={this.state.lastName}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18,marginBottom:5}}>Gender</Text>
            <View style={{ flexDirection: 'row', marginBottom: 15, alignSelf: 'center'}}>
            <CheckBox
              center
              title='Male'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.checked_male}
              onPress={() => this.setState({checked_male: !this.state.checked_male})}
            />
            <CheckBox
              center
              title='Female'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.checked_female}
              onPress={() => this.setState({checked_female: !this.state.checked_female})}
            />
            </View>
            
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18,marginBottom:5}}>Age Group</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5, alignSelf: 'center'}}>
            <CheckBox
              center
              title='12-17'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.teen}
              onPress={() => this.setState({teen: !this.state.teen})}
            />
            <CheckBox
              center
              title='18-33'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.millenials}
              onPress={() => this.setState({millenials: !this.state.millenials})}
            />
            <CheckBox
              center
              title='34-47'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.gen_x}
              onPress={() => this.setState({gen_x: !this.state.gen_x})}
            />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 15, alignSelf: 'center'}}>

            <CheckBox
              center
              title='48-66'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.boomers}
              onPress={() => this.setState({boomers: !this.state.boomers})}
            />
            <CheckBox
              center
              title='67+'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.matures}
              onPress={() => this.setState({matures: !this.state.matures})}
            />
            </View>


            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Patient Mobile Number</Text>
            <Input 
                placeholder="Patient Mobile Number"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                keyboardType={'numeric'}
                leftIcon={
                    <Icon
                        name='phone'
                        type="font-awesome"
                        size={24}
                        color='#008FFF'
                    />
                }
                onChangeText={(text)=>{
                    this.setState({
                        patientMobileNumber: text
                    })
                }}
                value={this.state.patientMobileNumber}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Caretaker Mobile Number</Text>
            <Input 
                placeholder="Caretaker Mobile Number"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                keyboardType={'numeric'}
                leftIcon={
                    <Icon
                        name='phone'
                        type="font-awesome"
                        size={24}
                        color='#008FFF'
                    />
                }
                onChangeText={(text)=>{
                    this.setState({
                        caretakerMobileNumber: text
                    })
                }}
                value={this.state.caretakerMobileNumber}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Doctor Mobile Number</Text>
            <Input 
                placeholder="Doctor Mobile Number"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                keyboardType={'numeric'}
                leftIcon={
                    <Icon
                        name='phone'
                        type="font-awesome"
                        size={24}
                        color='#008FFF'
                    />
                }
                onChangeText={(text)=>{
                    this.setState({
                        doctorMobileNumber: text
                    })
                }}
                value={this.state.doctorMobileNumber}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Address</Text>
            <Input 
                placeholder="House no, Street, Locality"
                numberOfLines={2}
                multiline
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                <Icon
                    name='map-marker'
                    type="font-awesome"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        address: text
                    })
                }}
                value={this.state.address}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>City</Text>
            <Input 
                placeholder="City"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                <Icon
                    name='city'
                    type="font-awesome-5"
                    size={20}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        city: text
                    })
                }}
                value={this.state.city}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Pincode</Text>
            <Input 
                placeholder="Pincode"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                <Icon
                    name='map-pin'
                    type="font-awesome-5"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        pincode: text
                    })
                }}
                value={this.state.pincode}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Country</Text>
            <Input 
                placeholder="Country"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                leftIcon={
                <Icon
                    name='flag'
                    type="font-awesome"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        country: text
                    })
                }}
                value={this.state.country}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Patient Email</Text>
            <Input 
                placeholder="Patient Email"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                autoCapitalize='none'
                keyboardType ={'email-address'}
                leftIcon={
                <Icon
                    name='envelope'
                    type="font-awesome-5"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        patientEmail: text
                    })
                }}
                value={this.state.patientEmail}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Caretaker Email</Text>
            <Input 
                placeholder="Caretaker Email"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                autoCapitalize='none'
                keyboardType ={'email-address'}
                leftIcon={
                <Icon
                    name='envelope'
                    type="font-awesome-5"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        caretakerEmail: text
                    })
                }}
                value={this.state.caretakerEmail}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Doctor Email</Text>
            <Input 
                placeholder="Doctor Email"
                autoCapitalize='none'
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                keyboardType ={'email-address'}
                leftIcon={
                <Icon
                    name='envelope'
                    type="font-awesome-5"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        doctorEmail: text
                    })
                }}
                value={this.state.doctorEmail}
            />
            <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Password</Text>
            <Input 
                placeholder="Password"
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                autoCapitalize='none'
                secureTextEntry = {true}
                leftIcon={
                <Icon
                    name='unlock'
                    type="font-awesome"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        password: text
                    })
                }}
                value={this.state.password}
            />
          <Text style={{marginLeft:10, color: '#008FFF', fontSize: 18}}>Confirm Password</Text>
            <Input 
                placeholder="Confirm Password"
                autoCapitalize='none'
                inputContainerStyle={{borderColor: '#008FFF', borderBottomWidth: 2}}
                leftIconContainerStyle={{marginRight:10}}
                secureTextEntry = {true}
                leftIcon={
                <Icon
                    name='unlock'
                    type="font-awesome"
                    size={24}
                    color='#008FFF'
                />
                }
                onChangeText={(text)=>{
                    this.setState({
                        confirmPassword: text
                    })
                }}
                value={this.state.confirmPassword}
            />
          
        </View>
        <View style={{flex:0.2,alignItems:'center', marginTop:0, marginBottom: 30}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.patientEmail, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{  fontSize : RFValue(20),
                fontWeight:'bold',
                color: "#008FFF",
                marginTop:RFValue(0)
                }}>
                  Cancel
                </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
    </Modal>
    )
              }


  render(){
    return(
      
      <SafeAreaView>
        
          <ImageBackground source={require('../assets/cloud-login.png')} style={styles.container}>
        
          {
            this.showModal()
          }

        
        <KeyboardAvoidingView style={styles.buttonContainer}>
          <Text style={{color:'#ffffff', fontSize:20, fontWeight:'bold',marginLeft:55}}>PATIENT EMAIL</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
            style={styles.loginBox}
            keyboardType ={'email-address'}
            autoCapitalize='none'
            onChangeText={(text)=>{
              this.setState({
                patientEmail: text
              })
            }}
            />
          </View>
          <Text style={{color:'#ffffff', fontSize:20, fontWeight:'bold',marginLeft:55}}>PASSWORD</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
              autoCapitalize='none'
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.patientLogin(this.state.patientEmail, this.state.password)}}
              >
              <Text style={{color:'#008FFF', fontSize:18, fontWeight:'bold'}}>LOGIN AS PATIENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.doctorLogin(this.state.patientEmail, this.state.password)}}
              >
              <Text style={{color:'#74D44C', fontSize:18, fontWeight:'bold'}}>LOGIN AS DOCTOR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:'#008FFF', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        </SafeAreaView>
        
    )
  }
}


const styles = StyleSheet.create({
  container:{
    resizeMode: "cover",
    height: "100%"
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:60,
    fontWeight:'300',
    // fontFamily:'AvenirNext-Heavy',
    color : '#32867d'
  },
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor:'#f2e9e4',
    fontSize: 20,
    marginBottom:20,
    marginTop:5

  },
  button:{
    width:"70%",
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    elevation:10
  },
  buttonContainer:{
    flex:1,
    marginTop: 340
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:0,
  },
  formTextInput:{
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth:2,
      borderRadius:2,
      borderColor:"#008FFF",
      paddingBottom:RFValue(10),
      marginLeft:RFValue(20),
      marginBottom:RFValue(14),
      borderRadius: 50
  },
  registerButton: {
    width: "40%",
    height: RFValue(30),
    marginTop:RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(5),
    backgroundColor: "#74D44C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginBottom: 20
  },
})