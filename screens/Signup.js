
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const Signup = () => {

    const navigation = useNavigation()

    const [values, setValues] = useState({
        email: "",
        username: "",
        phone: "",
        password: "",
        password1: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function SignUp() {

        const { email, username, phone, password,  password1 } = values

        if (password == password1) {
            firebase.auth().createUserWithEmailAndPassword(email, password, username, phone)
                .then(() => {
                  alert("Successful registered"),
                    navigation.replace("Home")
                })
                .catch((error) => {
                    alert(error.message)
                });
        } else {
            alert("Passwords are different!")
        }
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
        style={styles.container} behavior="padding">
        <Text style={styles.hearder}>Register</Text>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" onChangeText={text => handleChange(text, "email")} style={styles.input}/>
          <TextInput placeholder="Phone" onChangeText={text => handleChange(text, "phone")} style={styles.input}/>
          <TextInput placeholder="Username" onChangeText={text => handleChange(text, "username")} style={styles.input} /> 
          <TextInput placeholder="Password" onChangeText={text => handleChange(text, "password")} style={styles.input} secureTextEntry/>
          <TextInput placeholder="Confirm Password" onChangeText={text => handleChange(text, "password1")} style={styles.input} secureTextEntry/>
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => SignUp()} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.loginLine}>I already have account</Text> 
              <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonOutlineText}>Login</Text>
              </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      hearder:{
        color: '#2D4DF4',
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
      loginLine:{
        marginTop:20,
        marginBottom:-20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonOutline: {
        marginTop: 5,
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
        margin: 20,
      },
})