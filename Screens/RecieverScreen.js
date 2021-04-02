import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../Config';

export default class RecieverScreen extends React.Component{
    constructor(props){ 
        super(props); 
        this.state={ 
            userId : firebase.auth().currentUser.email, 
            userName : "", 
            recieverId : this.props.navigation.getParam('Details')["User_ID"] , 
            requestId : this.props.navigation.getParam('Details')["Request_ID"], 
            bookName : this.props.navigation.getParam('Details')["Book_Name"], 
            reason_for_requesting : this.props.navigation.getParam('Details')["Reason"], 
            recieverName : '', 
            recieverContact : '', 
            recieverAddress : '', 
            recieverRequestDocId : '' 
        } }
    GetRecieverDetails = ()=>{
        db.collection("USERS").where('Email_ID','==',this.state.userID).get()
        .then(snapshot =>{
            snapshot.forEach(Doc =>{
                this.setState({
                    recieverName:Doc.data().First_Name,
                    recieverContact:Doc.data().Phone_NO,
                    recieverAddress:Doc.data().Address,
                })
            })
        })
        db.collection("REQUESTED_BOOK").where("Request_ID",'==',this.state.requestId).get()
        .then(snapshot =>{
            snapshot.forEach(Doc=>{
                this.setState({
                    recieverRequestDocId:Doc.id
                })
            })
            
        })
    }
    GetUserDetails = (User_ID)=>{
        db.collection('USERS').where('Email_ID','==',User_ID).get()
        .then(snapshot=>{
            snapshot.forEach(Doc=>{
                this.setState({
                    userName:Doc.data().First_Name
                })
            })
        })
    }
    
    componentDidMount(){
        this.GetUserDetails(this.state.userID)
        this.GetRecieverDetails()
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex:0.1}}>
                    <Header 
                    leftComponent = {<Icon 
                        name = 'arrow-Left' 
                        type = 'feather' 
                        color = "green" 
                        onPress = {()=>{
                        this.props.navigation.goBack()
                    }} />}
                    centerComponent = {{text:DonateBook, }}
                    backgroundColor = "red"/>
                   
                     
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ 
    container: { flex:1, }, 
    buttonContainer : { 
        flex:0.3, 
        justifyContent:'center', 
        alignItems:'center' }, 
    button:{ width:200, 
        height:50, 
        justifyContent:'center', 
        alignItems : 'center', 
    borderRadius: 10, 
    backgroundColor: 'orange', 
    shadowColor: "#000", 
    shadowOffset: { 
        width: 0, 
        height: 8 }, 
        elevation : 16 } })