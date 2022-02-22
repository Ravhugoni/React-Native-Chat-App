import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Color from '../component/Colors'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const AddChat = () => {

  const navigation = useNavigation()
  const [values, setValues] = useState({
    email: "",
    phone: "",
    username: "",
    createdBy: ""
})

  function handleChange(text, eventName) {
    setValues(prev => {
        return {
            ...prev,
            [eventName]: text
        }
    })
  }
// ------------------------------



// -------------------------
  function AddUser() {

    const { email, phone, username, createdBy } = values

    // let name = "User/" + username
    let createUser = firebase.auth()?.currentUser?.email

    firebase.database().ref('/User').push(
      {
        username: username,
        phone: phone,
        email: email,
        createdBy: createUser,

      }).then(() => {
        alert("User Inserted");
        navigation.replace("Home")
      }).catch((error) => {
        alert("User not Inserted");
      });

}

  return (

  
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

      <Text style={styles.hearder}>Add Contact</Text>

      <View style={styles.inputContainer}>
      <TextInput
            placeholder="User name"
            //   value={password}
            onChangeText={text => handleChange(text, "username")}
            style={styles.input}
        />
        <TextInput
            placeholder="Phone Number"
            //   value={password}
            onChangeText={text => handleChange(text, "phone")}
            style={styles.input}
        />
        {/* <Text style={styles.orText}>Or</Text> */}
        <TextInput
          placeholder="Email"
        //   value={email}
          onChangeText={text => handleChange(text, "email")}
          style={styles.input}
        />
      </View>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => AddUser()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', { name: 'Home' })}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hearder:{
        color: Color.blue,
        fontWeight: '700',
        fontSize: 35,
        paddingBottom:15,
      },

      inputContainer: {
        width: '80%'
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
      button: {
        backgroundColor: '#2D4DF4',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#2D4DF4',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 17,
      },
      buttonOutlineText: {
        color: '#2D4DF4',
        fontWeight: '700',
        fontSize: 16,
      },
      orText:{
        margin:10,
      },
})