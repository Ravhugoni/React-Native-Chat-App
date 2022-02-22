import React, { Component, useState, useLayoutEffect, useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Color from '../component/Colors'
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from '@react-navigation/core'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/firestore"
import 'firebase/compat/database'

const Chat = ({ route, User }) => {

    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {

    //get previous messages  
    firebase.database().ref('/ChatMessages').on('value', snapshot => {
        console.log(snapshot.val());
        let data = Object.values(snapshot.val());
        setMessages(data);
      });

    //send messages to database
    firebase.database().ref('/ChatMessages').push(
      {
        messages: messages,  
      }).then(() => {
          console.log(messages);
          setMessages(messages);
      }).catch((error) => {
        alert(error);
      });
  
  });

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
      );
    }, []);


    function Mylocation()
    {
        let v
    }
  return (
  
  <View style={styles.container}>
    {/* --------------header------------- */}
    <View style={styles.headerContainer}>
        <TouchableOpacity 
            style={{paddingTop:50, paddingLeft:20}} onPress={() => navigation.navigate('Home', { name: 'Home' })}>
          <Ionicons name="ios-chevron-back-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={{width:'30%',marginHorizontal:10, alignItems:'flex-start'}}>
          <Text style={styles.HeaderHeading}>{ route.params.UserName }</Text>
        </TouchableOpacity>
              
          <TouchableOpacity
              style={{width:'40%',marginHorizontal:10, alignItems:'flex-end'}} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.signout}>
                  <FontAwesome name="sign-out" size={16} color="#ffffff"/>
                </Text>
          </TouchableOpacity>
      </View>
      {/* --------------end header--------- */}

      <View style={{flexDirection: 'row', alignItems: "flex-end"}}>
        <View style={styles.AddButton} >
            <FontAwesome name="location-arrow" size={16} color="#ffffff" onPress={() => Mylocation}/>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          senderID: firebase.auth()?.currentUser?.email,
          avatar: "https://placeimg.com/140/140/any",
          recieverID:  route.params.email,
        }}
        // handleLoadEarlier={handleLoadEarlier}
      />
      
  </View>

  )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: Color.white,
      },
      headerContainer:{
        backgroundColor: Color.blue,
        paddingBottom:20,
        flexDirection:'row',
      },
      HeaderHeading:
      {
        paddingTop:50, 
        fontSize: 20,
        fontWeight: "400",
        color: Color.white,
      },
      signout:
      {
        paddingTop:50,
      },
      AddButton:
      {
        height:50,
        width:50,
        marginLeft:20,
        borderRadius: 70/2,
        backgroundColor: Color.blue,
        alignItems:"center",
        justifyContent:"center"
        
      },

      topBar: {
        height: 100,
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
        // backgroundColor: Colors.deepPurple300,
      },
      messageBox: {
        position: "absolute",
        bottom: 0,
        // backgroundColor: Colors.grey300,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 16,
      },
      messageInput: {
        width: "80%",
        fontSize: 14,
        // backgroundColor: Colors.white,
        paddingVertical: 12,
        color: Color.black,
        borderRadius: 8,
        paddingHorizontal: 12,
        borderWidth: 2,
        // borderColor: Colors.deepPurple300,
      },
      fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        color:"#ffffff",
        backgroundColor:Color.blue,
      },
})