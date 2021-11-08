//Importing components from libraries
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Modal, FlatList, Dimensions} from 'react-native';
import {Button, Card, Icon, ListItem, Header} from 'react-native-elements';
import AppHeader from '../components/AppHeader.js';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {db} from '../config.js';
  import { getDatabase, ref, set } from "firebase/database";
import firebase from 'firebase';

export default class DataScreen extends React.Component {

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
            hrarr : [],
            bp_sysarr : [],
            bp_dysarr : [],
            o2arr : [],
            temparr : [''],
            gsrarr : [],
            hr: '',
            bp_sys: '',
            bp_dys: '',
            o2_r: '',
            temp: '',
            gsr: '',
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
            graph1: false,
            graph2: false,
            graph3: false,
            graph4: false,
            graph5: false,
            graph6: false,
            button1: "Tremor Amplitude\nAnalysis of X and Y Spatial  \nAxes",
            button2: "Tremor Frequency\nAnalysis of X and Y Spatial  \nAxes",
            button3: "CALMIFY+ Tremor Index\nAnalysis of the Tremor as    \na whole",
            button4: "PulseOxBP Analysis\nAnalysis of the Heart Rate, \nO2 level and Blood Pressure",
            button5: "Body Temperature                 ",
            button6: "CALMIFY+ GSR Analysis      \nGalvanic Skin Response Rate"
        };
   }


    showgraph1=()=>{
    return(
        
        <Modal
        visible={this.state.graph1}
        //visible={true}
        animationType={'slide'}>  
            
        
            <View>
        <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph1: false, s_xarr: [0.00], s_yarr: [0.00]})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({s_xarr: [0.00], s_yarr: [0.00]})}}/>}
                
                />
                <ScrollView contentContainerStyle={{height: 1060}}>
           
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 13, marginLeft: 15, marginRight: 15, marginBottom:0}} >Tremor Amplitude (X-Axis)</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.s_xarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={" cm"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        
<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Amplitude(X-axis): {this.state.s_x} cm</Text>
        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: 5}} >Tremor Rating(X-axis): {this.state.sx_rate}</Text>
        
        <View
                    style={{
                        borderBottomColor: '#3F91FF',
                        borderBottomWidth: 2,
                        width: 380,
                        alignSelf: "center",
                        marginTop: 23,
                        marginBottom: 15
                    }}
                />
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 0, marginLeft: 15, marginRight: 15, marginBottom:0}} >Tremor Amplitude (Y-Axis)</Text>

        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.s_yarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={" cm"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 5}} >Amplitude(Y-axis): {this.state.s_y} cm</Text>
        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: 5}} >Tremor Rating(Y-axis): {this.state.sy_rate}</Text>

        </ScrollView>
        </View>
    </Modal>
    );
        
   }

   showgraph2=()=>{
    return(
        
        <Modal
        visible={this.state.graph2}
        //visible={true}
        animationType={'slide'}>  
        
        <View>
        <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph2: false, freq_xarr: [0.00], freq_yarr: [0.00]})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({freq_xarr: [0.00], freq_yarr: [0.00]})}}/>}
                
                />
                <ScrollView contentContainerStyle={{height: 1015}}>
           
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 13, marginLeft: 15, marginRight: 15, marginBottom:0}} >Tremor Frequency (X-Axis)</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.freq_xarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={" Hz"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        
<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Frequency(X-axis): {this.state.s_x} Hz</Text>
        <View
                    style={{
                        borderBottomColor: '#3F91FF',
                        borderBottomWidth: 2,
                        width: 380,
                        alignSelf: "center",
                        marginTop: 23,
                        marginBottom: 15
                    }}
                />
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 0, marginLeft: 15, marginRight: 15, marginBottom:0}} >Tremor Frequency (Y-Axis)</Text>

        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.freq_yarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={" Hz"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 5}} >Frequency(Y-axis): {this.state.s_y} Hz</Text>

        </ScrollView>
        </View>

    </Modal>
    );
        
   }

   showgraph3=()=>{
    return(
        
        <Modal
        visible={this.state.graph3}
        //visible={true}
        animationType={'slide'}>  
            
        
            <View>
            <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    style={{height:50}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph3: false, tremor_iarr: [0.00]})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({tremor_iarr: [0.00]})}}/>}
                
                />
                        <ScrollView contentContainerStyle={{height: 850}}>

           
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 30, marginLeft: 15, marginRight: 15, marginBottom:20}} >CALMIFY+ Tremor Index</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.tremor_iarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={500}
            
            yAxisSuffix={""}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        
        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >CALMIFY+ Tremor Index: {this.state.tremor_i} </Text>

        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 20}} >Note: CALMIFY+ Tremor Index has been designed to summatively evaluate and assess the tremors in both spatial axes gathered from the amplitude sensor data of the tremor</Text>
        </ScrollView>
        </View>
    </Modal>
    );
        
   }

   showgraph4=()=>{
    return(
        
        <Modal
        visible={this.state.graph4}
        //visible={true}
        animationType={'slide'}>  
            
        
            <View>
        <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph4: false, hrarr: [0], o2arr: [0.00], bp_sysarr: [0.00], bp_dysarr: [0.00]})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({hrarr: [0], o2arr: [0.00], bp_sysarr: [0.00], bp_dysarr: [0.00]})}}/>}
                
                />
                <ScrollView contentContainerStyle={{height: 1950}}>
           
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 13, marginLeft: 15, marginRight: 15, marginBottom:0}}>Heart Rate (Beats Per Minute)</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.hrarr,
                }
            ]
            }}
            width={Dimensions.get("window").width-10} // from react-native
            height={400}
            
            yAxisSuffix={''}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16,
            }}
        />

        
<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Heart Rate: {this.state.hr} BPM</Text>
        <View
                    style={{
                        borderBottomColor: '#3F91FF',
                        borderBottomWidth: 2,
                        width: 380,
                        alignSelf: "center",
                        marginTop: 23,
                        marginBottom: 15
                    }}
                />
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 0, marginLeft: 15, marginRight: 15, marginBottom:0}} >Oxygen Saturation Level</Text>

        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.o2arr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={" %"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{fontSize: 17, textAlign: 'center', color: '#53D41C',marginLeft: 80,  marginTop: 7}}>Oxygen Saturation: {this.state.o2_r} % SPO</Text>
            <Text style={{fontSize: 11, textAlign: 'center', color: '#53D41C', marginLeft: 20,lineHeight: 45, textAlignVertical: 'bottom', marginLeft: 0}}>2</Text>
        </View>

        <View
                    style={{
                        borderBottomColor: '#3F91FF',
                        borderBottomWidth: 2,
                        width: 380,
                        alignSelf: "center",
                        marginTop: 23,
                        marginBottom: 15
                    }}
                />

<Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 13, marginLeft: 15, marginRight: 15, marginBottom:0}}>Systolic Blood Pressure (in mmHg)</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.bp_sysarr,
                }
            ]
            }}
            width={Dimensions.get("window").width-10} // from react-native
            height={400}
            
            yAxisSuffix={''}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16,
            }}
        />

        
<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Blood Pressure: {this.state.bp_sys}/{this.state.bp_dys} mmHg</Text>
        <View
                    style={{
                        borderBottomColor: '#3F91FF',
                        borderBottomWidth: 2,
                        width: 380,
                        alignSelf: "center",
                        marginTop: 23,
                        marginBottom: 15
                    }}
                />
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 0, marginLeft: 15, marginRight: 15, marginBottom:0}} >Dystolic Blood Pressure (in mmHg)</Text>

        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.bp_dysarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={400}
            
            yAxisSuffix={""}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

<Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Blood Pressure: {this.state.bp_sys}/{this.state.bp_dys} mmHg</Text>


        </ScrollView>
        </View>
    </Modal>
    );
        
   }

   showgraph5=()=>{
    return(
        
        <Modal
        visible={this.state.graph5}
        //visible={true}
        animationType={'slide'}>  
            
        
            <View>
            <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph5: false, temparr: ['0.00']})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({temparr: ['0.00']})}}/>}
                
                />
           
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 50, marginLeft: 15, marginRight: 15, marginBottom:20}} >Body Temperature</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.temparr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={500}
            
            yAxisSuffix={"°F"}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        
        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Body Temperature: {this.state.temp} °F</Text>


        </View>
    </Modal>
    );
        
   }

   showgraph6=()=>{
    return(
        
        <Modal
        visible={this.state.graph6}
        //visible={true}
        animationType={'slide'}>  
            
        
            <View>
            <Header 
                    backgroundImage={require("../assets/cloud-header.png")}
                    backgroundImageStyle={{resizeMode:'cover', height:87}}
                    containerStyle={{height:90}}
                    leftComponent={<Icon name="arrow-left" type="font-awesome" size={30} color="white" onPress={()=>{this.setState({graph6: false, gsrarr: [0.00]})}}/>}
                    leftContainerStyle={{paddingTop:0}}
                    placement="center"
                    backgroundColor = {'#55adf1'}
                    rightComponent={<Icon name="redo" type="font-awesome-5" size={30} color="white" onPress={()=>{this.setState({gsrarr: [0.00]})}}/>}
                
                />
                                <ScrollView contentContainerStyle={{height: 800}}>
   
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 20, marginLeft: 15, marginRight: 15, marginBottom:20}} >Galvanic Skin Response (Microsiemens or μS)</Text>
        
        <LineChart
            data={{
            datasets: [
                {
                
                data: this.state.gsrarr,
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={500}
            
            yAxisSuffix={""}
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `#9ADE7D90`,
            labelColor: (opacity = 1) => `#008FFF`,
            style: {
                borderRadius: 16            
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#008FFF"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />

        
        <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 15, marginRight: 15, marginTop: -73}} >Time: {this.state.time} {this.state.day}, {this.state.date}</Text>
        <Text style={{fontSize: 17, color: '#53D41C', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 7}} >Galvanic Skin Response: {this.state.gsr} μS</Text>
        <Text style={{fontSize: 20, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginLeft: 10, marginTop: 20}} >Note: GSR Values are based on the Electrodermal Activity (EDA)</Text>

        </ScrollView>
        </View>
    </Modal>
    );
        
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

            this.state.hrarr.push(data.hr);
            this.state.bp_sysarr.push(data.bp_sys);
            this.state.bp_dysarr.push(data.bp_dys);
            this.state.o2arr.push(data.o2_r);
            this.state.temparr.push(data.temp);
            this.state.gsrarr.push(data.gsr);

            this.state.timearr.push(data.time);
            
            this.showgraph1();
            this.showgraph2();
            this.showgraph3();
            this.showgraph4();
            this.showgraph5();
            this.showgraph6();

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
                o2_r: data.o2_r
            })
            
        });   
        
    }

    componentDidMount(){
        this.fetch_otherdata();
        this.fetch_data();
    }

    
    render() {

        

        return(
            <View>
                <AppHeader navigation ={this.props.navigation}/>

                {this.showgraph1()}
                {this.showgraph2()}
                {this.showgraph3()}
                {this.showgraph4()}
                {this.showgraph5()}
                {this.showgraph6()}

                <ImageBackground source={require('../assets/calmify-bg.png')} style={styles.image}>

                <Image style={{width: 100, height: 100, alignSelf: 'center', marginTop: 5, marginBottom: 10}} source={require('../assets/data.png')} />
                    <Button
                                    
                                    buttonStyle={{borderRadius: 7, width:140, height:40, backgroundColor: '#8ADD67'}}
                                    containerStyle={{borderRadius: 7, width:140, height:40, alignSelf: 'center' }}
                                    title='Data Analysis'
                                    titleStyle={{color: 'white', fontSize: 20}}
                                    onPress={()=>{this.setState({
                                        s_xarr : [0.00],
                                        s_yarr : [0.00],
                                        freq_xarr : [0.00],
                                        freq_yarr : [0.00],
                                        
                                        tremor_iarr: [0.00],
                                        
                                        hrarr : [0.00],
                                        bp_sysarr : [0.00],
                                        bp_dysarr : [0.00],
                                        o2arr : [0.00],
                                        temparr : ['0.00'],
                                        gsrarr : [0.00],
                                        hr: '',
                                        bp_sys: '',
                                        bp_dys: '',
                                        o2_r: '',
                                        temp: '',
                                        gsr: '',
                                        sx_rate: "",
                                        sy_rate: '',
                                        s_x: 0,
                                        s_y:0,
                                        freq_x:0,
                                        freq_y:0,  
                                        tremor_i: 0,
                                    })}}
                                /> 
                    
                    <Text style={{fontSize: 17, color: '#1175fa', textAlign: 'center', alignSelf: 'center', marginTop: 13, marginLeft: 15, marginRight: 15}}>In-Depth Analysis of Patient's Health Vitals</Text>

                    <View
                        style={{
                            borderBottomColor: '#3F91FF',
                            borderBottomWidth: 2,
                            width: 400,
                            alignSelf: "center",
                            marginTop: 15,
                            marginBottom: 7
                        }}
                    />

                <ScrollView contentContainerStyle={{height: 780}}>

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#9ade7d', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/amp.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button1}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph1: true})}}
                />

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#5EB2F4', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/freq.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button2}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph2: true})}}
                />

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#9ade7d', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/trem.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button3}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph3: true})}}
                />

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#5EB2F4', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/heart.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button4}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph4: true})}}
                />

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#9ade7d', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/temp.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button5}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph5: true})}}
                />

                <Button
                    raised
                    buttonStyle={{borderRadius: 10, width:340, height:80, backgroundColor: '#5EB2F4', alignSelf: 'center'}}
                    containerStyle={{borderRadius: 10, width:340, height:80, alignSelf: 'center', marginTop: 10, marginBottom: 8}}
                    icon={
                        <Image source={require('../assets/skin.png')} style={styles.buttonImage}/>
                    }
                    iconLeft
                    title={this.state.button6}
                    titleStyle={styles.buttonText}
                    onPress={()=>{this.setState({graph6: true})}}
                />

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
        height: 120,
        backgroundColor: '#5EB2F4',
        paddingTop: 8,
        borderRadius: 30,
        marginTop: 20,
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
    },
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d6ffff',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
  },
    heading: {
      color:'#00bcd4',
      fontWeight: "400",
      fontSize: 20,
      marginBottom: 5,
      marginVertical: 30,
    },
    semiHeading: {
      color:'#008384',
      fontWeight:"400",
      fontSize:15,
      justifyContent: 'flex-end',
      marginBottom: 25,
    },
    tinyLogo: {
        width: 45,
        height: 45,
        marginTop: 4
      },
      buttonImage: {
        width: 50,
        height: 50
    },
    buttonText: {
        color: 'white', 
        fontSize: 16, 
        textAlign: 'left', 
        paddingLeft: 25
    }
});