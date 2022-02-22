
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Center } from 'native-base'
import Color from '../component/Colors'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const Login = () => {

  const navigation = useNavigation()
  
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [values, setValues] = useState({
    email: "",
    password: ""
})

  function handleChange(text, eventName) {
    setValues(prev => {
        return {
            ...prev,
            [eventName]: text
        }
    })
  }

  function Login() {

    const { email, password } = values

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.replace("Home")
        })
        .catch((error) => {
            alert(error.message)
            // ..
        });
  }

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          navigation.replace("Home")
        }
      })

      return unsubscribe
    }, [])


  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

      <Text style={styles.hearder}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          // value={email}
          onChangeText={text => handleChange(text, "email")}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          // value={password}
          onChangeText={text => handleChange(text, "password")}
          style={styles.input}
          secureTextEntry
        />
      </View>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => Login()}
          style={styles.button}>

          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.loginLine} >
        I dont have account
       </Text> 
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Signup')}>

            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default Login

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
        backgroundColor: Color.white,
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
        backgroundColor: Color.blue,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        marginTop: 5,
      },
      buttonText: {
        color: Color.white,
        fontWeight: '700',
        fontSize: 17,
      },
      loginLine:{
        marginTop:20,
        marginBottom:-20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonOutlineText: {
        color: Color.blue,
        fontWeight: '700',
        fontSize: 16,
        margin: 20,
      },
})