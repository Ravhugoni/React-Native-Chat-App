import React, {useEffect, useState } from 'react'
import { StyleSheet,TouchableOpacity,KeyboardAvoidingView, ScrollView,FlatList, Keyboard, View, Image, Text, TextInput, Button, Pressable  } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import  Colors  from '../component/Colors';

import UserComponent from '../component/UserComponent';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore"
import 'firebase/compat/database'

const home = () => {
  
  const navigation = useNavigation()
//   const [entityText, setEntityText] = useState('')
//   const [entities, setEntities] = useState([])


//   const entityRef = firebase.firestore().collection('entities')
//   const userID = props.extraData.id


//   // ------------function--------------------
  
let itemsRef = firebase.database().ref('/User');
let mail = firebase.auth()?.currentUser?.email;

const [itemsArray, setItemsArray] = React.useState([]);

  React.useEffect(() => {

    // itemsRef.on('value', snapshot => {
    //   let data = snapshot.val();
    //   const User = Object.values(data);
    //   setItemsArray(User);
    // });

    itemsRef.orderByChild("createdBy").equalTo(mail).on('value', snapshot => {
      let data = snapshot.val();
      const User = Object.values(data);
      setItemsArray(User);
    });
    
  }, []);


  // firebase.database().ref('User').on('value', (data) =>
  // {
  //    data = data.toJSON();
  // })

// ---------end functions----------------

  return (
    <View style={styles.container}>

      {/* --------------header------------- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{width:'40%',marginHorizontal:10, alignItems:'flex-start'}}>
          <Text style={styles.HeaderHeading}> Chats </Text>
        </TouchableOpacity>
              
          <TouchableOpacity
              style={{width:'40%',marginHorizontal:10, alignItems:'flex-end'}} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.signout}>
                  <FontAwesome name="sign-out" size={16} color="#ffffff"/>
                </Text>
          </TouchableOpacity>
      </View>
      {/* --------------end header--------- */}

    {/* ------------list-------------- */}
    <StatusBar style="light" />


  

    {/* ---------------------- */}      
      <ScrollView>
        <View style={styles.topBarSection}>
          {itemsArray.length > 0 ? (
            <UserComponent User={itemsArray} />
          ) : (
            <Text style={{paddingLeft:20}}>No Contact</Text>
          )}
          </View>
      </ScrollView>

    {/* -----------end list----------- */}

    {/* <Text style={styles.title}>Tab One</Text> */}
    
    {/* <View style={styles.container}>
      {itemsArray.length > 0 ? (
        <UserComponent User={itemsArray} />
      ) : (
        <Text>No items</Text>
      )}
    </View> */}
  
    <View style={{flexDirection: 'row', alignItems: "flex-end"}}>
        <View style={styles.AddButton} >
            <FontAwesome name="user-plus" size={16} color="#ffffff" onPress={() => navigation.navigate('AddChat', { name: 'AddChat' })}/>
        </View>

    </View>
    
    {/* ------------------footer--------------- */}
      <View style={styles.footerContainer}>     
           <TouchableOpacity
                style={{width:'40%',marginHorizontal:10}} onPress={() => navigation.navigate('Home', { name: 'Home' })}>
                 <AntDesign  style={{alignSelf:'center'}} name="message1" size={16} color="#2D4DF4"/>
              <Text style={{color:'#2D4DF4',alignSelf:'center', padding:5}}>Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{width:'40%',marginHorizontal:10}} onPress={() => navigation.navigate('Group', { name: 'Group' })}>
                   <FontAwesome style={{alignSelf:'center'}} name="group" size={16} color="gray"/>
               <Text style={{color:'gray',alignSelf:'center', padding:5}}>Group</Text>
              </TouchableOpacity>
        </View>
        {/* ------------end footer--------------- */}
  </View>
  )
}

export default home

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
      },
      headerContainer:{
        backgroundColor: Colors.blue,
        paddingBottom:20,
        flexDirection:'row',
      },

      topBar: {
        height: 100,
        // backgroundColor: Colors.deepPurple800,
        justifyContent: "center",
      },
    
      topBarSection: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
      },
      groupTitle: {
        // color: Colors.white,
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20,
      },
      groupDate: {
        // color: Colors.white,
        fontSize: 14,
        fontWeight: "400",
        marginLeft: 20,
        marginTop: 2,
      },
      groupImage: {
        width: 50,
        height: 50,
        marginLeft: 20,
        borderRadius: 30,
      },
      AddButton:
      {
        height:50,
        width:50,
        marginLeft:20,
        borderRadius: 70/2,
        backgroundColor: Colors.blue,
        alignItems:"center",
        justifyContent:"center"
    
        
      },
      signout:
      {
        paddingTop:50,
      },
      HeaderHeading:
      {
        paddingTop:50, 
        fontSize: 20,
        fontWeight: "400",
        color: Colors.white,
      },

      footerContainer:{
        // flex:1,
        // alignItems: "flex-end",
        // marginTop:"39%",
        // position: 'absolute',
        height:60,
        flexDirection:'row',
        alignItems:'flex-end',
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },
      
 
    
      title: {
        fontSize: 14,
        textAlign: "right",
        // fontWeight: "bold",
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
      },
      
})

// -----------------------------------------
