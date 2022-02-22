import React, {useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, Image, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons';
import Color from '../component/Colors'
import GroupComponent from '../component/GroupComponent'; 
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore"
import 'firebase/compat/database'

const Group = () => {

  const navigation = useNavigation()

  let itemsRef = firebase.database().ref('/Group');
  let mail = firebase.auth()?.currentUser?.email;

  const [itemsArray, setItemsArray] = React.useState([]);
    React.useEffect(() => {
    itemsRef.orderByChild("createdBy").equalTo(mail).on('value', snapshot => {
      let data = snapshot.val();
      const Group = Object.values(data);
      setItemsArray(Group);
    });
  }, []);

  return (
    <View style={styles.container}>

      {/* ----------Header--------------- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{width:'40%',marginHorizontal:10, alignItems:'flex-start'}}>
          <Text style={styles.HeaderHeading}> Group </Text>
        </TouchableOpacity>
              
          <TouchableOpacity
              style={{width:'40%',marginHorizontal:10, alignItems:'flex-end'}} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.signout}>
                  <FontAwesome name="sign-out" size={16} color="#ffffff"/>
                </Text>
          </TouchableOpacity>
      </View>
      {/* ------------\end header----------- */}
    
      <ScrollView>
        <View style={styles.topBarSection}>
          {itemsArray.length > 0 ? (
            <GroupComponent Group={itemsArray} />
          ) : (
            <Text>No Groups</Text>
          )}
          </View>
      </ScrollView>

      <View style={{flexDirection: 'row', alignItems: "flex-end"}}>
        <View style={styles.AddButton} >
            <MaterialIcons name="group-add" size={20} color="#ffffff" onPress={() => navigation.navigate('AddGroup', { name: 'AddGroup' })}/>
        </View>
      </View>

      {/* --------------footer -------------------------*/}
      <View style={styles.footerContainer}>     
           <TouchableOpacity
                style={{width:'40%',marginHorizontal:10}} onPress={() => navigation.navigate('Home', { name: 'Home' })}>
                 <AntDesign  style={{alignSelf:'center'}} name="message1" size={16} color="gray"/>
              <Text style={{color:'gray',alignSelf:'center', padding:5}}>Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{width:'40%',marginHorizontal:10}} onPress={() => navigation.navigate('Group', { name: 'Group' })}>
                   <FontAwesome style={{alignSelf:'center'}} name="group" size={16} color="#2D4DF4"/>
               <Text style={{color:'#2D4DF4',alignSelf:'center', padding:5}}>Group</Text>
              </TouchableOpacity>
        </View>
        {/* --------------End footer --------------------*/}
    </View>
  )
}

export default Group

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerContainer:{
    backgroundColor:"#2D4Df4",
    paddingBottom:20,
    flexDirection:'row',
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
    color:"white",
  },

  AddButton:{
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
    // backgroundColor: Colors.deepPurple300,
  },

  footerContainer:{
    // flex:1,
    // mar/ginTop:"70%",
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
})