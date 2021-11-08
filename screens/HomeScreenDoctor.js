//Importing components from libraries
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Modal, FlatList, Dimensions} from 'react-native';
import {Button, Card, Icon, ListItem, Header} from 'react-native-elements';
import AppHeader from '../components/AppHeader.js';
import {db} from '../config.js';
import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase';

export default class HomeScreenDoctor extends React.Component {

    //Defining states in constructor
    constructor() {
        super();
        this.state = {
            userName : firebase.auth().currentUser.email,
            s_xarr : [],
            s_yarr : [],
            freq_xarr : [],
            freq_yarr : [],
            datearr : [],
            dayarr : [],
            tremor_iarr: [],
            timearr : [],
            sx_rate: "",
            sy_rate: '',
            time: '',
            s_x: 0,
            s_y:0,
            freq_x:0,
            freq_y:0,
            date: '',
            day: '',
            tremor_i: 0,
            hr: '',
            bp_sys: '',
            bp_dys: '',
            o2_r: '',
            temp: '',
            gsr: '',
            stress_i: 0,
            stress_rate: "",
            gender:false,
            teen: false,
            millenials:false,
            gen_x:false,
            boomers:false,
            matures:false,
            age: "",
        };
    }

    fetch_data = () => {

        const tremorRef = firebase.database().ref('users/' + 't6co0x');
        tremorRef.on('value', (snapshot) => {
            const data = snapshot.val();

            this.state.s_xarr.push(data.s_x);
            this.state.s_yarr.push(data.s_y);
            this.state.freq_xarr.push(data.freq_x);
            this.state.freq_yarr.push(data.freq_y);
            this.state.tremor_iarr.push(data.tremor_i);

            this.state.timearr.push(data.time);

        });   
        
    }

    fetch_otherdata = () => {

        const tremorRef = firebase.database().ref('users/' + 't6co0x');
        tremorRef.on('value', (snapshot) => {
            const data = snapshot.val();
            
            this.setState({
                s_x: data.s_x,
                s_y: data.s_y,
                tremor_i: data.tremor_i,
                freq_x: data.freq_x,
                freq_y: data.freq_y,
                date: data.date,
                day: data.day,
                time: data.time,
                sy_rate: data.sy_rate,
                sx_rate: data.sx_rate,
                hr: data.hr,
                bp_sys: data.bp_sys,
                bp_dys: data.bp_dys,
                temp: data.temp,
                gsr: data.gsr,
                stress_i: data.stress_i,
                stress_rate: data.stress_rate,
                o2_r: data.o2_r,
                gender: data.checked_male,
                teen:data.teen,
                millenials:data.millenials,
                gen_x:data.gen_x,
                boomers:data.boomers,
                matures:data.matures
            })

            if (data.teen == true) {
                this.setState({
                    age: "12-17"
                })
            }
            else if (data.millenials == true) {
                this.setState({
                    age: "18-33"
                })
            }
            else if (data.gen_x == true) {
                this.setState({
                    age: "34-47"
                })
            }
            else if (data.boomers == true) {
                this.setState({
                    age: "48-66"
                })
            }
            else{
                this.setState({
                    age: "67+"
                })
            }

        });   

    

        
        
    }

    componentDidMount(){
        this.fetch_otherdata();
        this.fetch_data();

        
        
    }

    render() {
        const windowWidth = Dimensions.get('window').width;


        return (

            
           
            <View>
                <AppHeader navigation ={this.props.navigation}/>
                
                <ImageBackground source={require('../assets/calmify-bg.png')} style={styles.image}>

                        <View>
                            <Card containerStyle={styles.sosCard}>
                            <View style={{flexDirection: "row", marginTop: 10, width: windowWidth-50, alignSelf: 'center', alignItems: 'center', alignContent: 'center'}}>
                            <Image source={require('../assets/stress.png')} style={{width:90, height: 90, marginLeft: 10}} />

                            <View style={{flexDirection: 'column', marginLeft: 0}}>

                                <Text style={{marginLeft: 25, fontSize: 21, color: '#ffffff', fontWeight: 'bold'}}>Mental Health Index</Text>

                                <Button
                                    
                                    buttonStyle={{borderRadius: 7, width:110, height:40, backgroundColor: '#8ADD67'}}
                                    containerStyle={{borderRadius: 7, width:110, height:40, alignSelf: 'center', marginTop: 10, marginLeft: 30 }}
                                    title={this.state.stress_i}
                                    titleStyle={{color: 'white', fontSize: 20, fontWeight: 'bold'}}
                                    onPress={()=>{this.setState({stress_rate: '0: Calm', stress_i: 0.0001})}}
                                /> 

                                <Text style={{alignSelf: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 9, marginLeft: 25}} >{this.state.stress_rate}</Text> 

                            </View>

                        </View>                       
                                                             
                            </Card>
                        </View> 

                        <View
                            style={{
                                borderBottomColor: '#3F91FF',
                                borderBottomWidth: 2,
                                width: 380,
                                alignSelf: "center",
                                marginTop: 10
                            }}
                        />

                        <ScrollView style={{backgroundColor: 'white',height:510, paddingTop: 1, borderBottomColor: '#3F91FF', borderBottomWidth: 2, alignSelf: "center",width: windowWidth}} contentContainerStyle={{height: 720}}>
                        <Image source={require('../assets/helath.png')} style={{width:240, height: 60, alignSelf: 'center', marginBottom: 15, marginTop: 10}} />

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Amplitude(X): {this.state.s_x} cm</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Amplitude(Y): {this.state.s_y} cm</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Frequency(X): {this.state.freq_x} Hz</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Frequency(Y): {this.state.freq_y} Hz</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Rating(X):  {this.state.sx_rate}</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Tremor Rating(Y):  {this.state.sy_rate}</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 15}}>CALMIFY+ Tremor Index:  {this.state.tremor_i}</Text>

                                <Text style={{fontSize: 19, textAlign: 'center', color: '#53D41C', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Heart Rate: {this.state.hr} BPM</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#53D41C', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Blood Pressure: {this.state.bp_sys}/{this.state.bp_dys} mmHg</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{fontSize: 19, textAlign: 'center', color: '#53D41C',marginLeft: 20, marginBottom: 3}}>Oxygen Saturation: {this.state.o2_r} % SPO</Text>
                                    <Text style={{fontSize: 13, textAlign: 'center', color: '#53D41C', marginLeft: 20,lineHeight: 38, textAlignVertical: 'bottom', marginLeft: 0}}>2</Text>
                                </View>
                                
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 3}}>Body Temperature: {this.state.temp} °F</Text>
                                <Text style={{fontSize: 19, textAlign: 'center', color: '#439DE4', marginLeft: 20, marginRight: 7, marginBottom: 15}}>Galvanic Skin Response: {this.state.gsr} μS</Text>
                                
                            </View>

                            <Text style={{fontSize: 19, textAlign: 'center', color: '#53D41C', marginBottom: 3}}>Gender: {this.state.gender ? "Male" : "Female"}</Text>
                            <Text style={{fontSize: 19, textAlign: 'center', color: '#53D41C', marginBottom: 3}}>Age Group: {this.state.age}</Text>


                        </ScrollView>

                </ImageBackground>
                
            </View>
        
        )
    }
}

//Using Stylesheet to create different styles
const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        height: "100%"
    },
    sosText: {
        color:'white',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        width: 300,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    sosCard: {
        height: 140,
        backgroundColor: '#5EB2F4',
        paddingTop: 0,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
        width: Dimensions.get('window').width-20
    },
    callButton: {
        width: 250,
        backgroundColor: '#55adf1',
        alignSelf: 'center',
    },
    callButtonText: {
        color: '#fff',
        fontSize: 18
    },
    callImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop: 25, 
        marginBottom: 15
    },
    selfHelp: {
        fontSize: 18,
        marginLeft: 17,
        color: '#1175fa'
    }
});