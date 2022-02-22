import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Color from '../component/Colors'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const AddGroup = () => {

  const navigation = useNavigation()
  const [values, setValues] = useState({
    groupname: "",
    dateCreate: "",
    createdBy: "",
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

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const { groupname } = values

    // let name = "Group/" + groupname
    let GroupId = "GroupId" + groupname
    let groupPart = firebase.auth()?.currentUser?.email

    firebase.database().ref('/Group/' + GroupId).set(
      {
        groupname: groupname,
        dateCreate: date,
        createdBy: firebase.auth()?.currentUser?.email,
        groupPart: groupPart
        //  [{
        //   email: firebase.auth()?.currentUser?.email,
        // }]

      }).then(() => {
        alert("Group Created");
        navigation.replace("Group")
      }).catch((error) => {
        alert("Group not created");
      });
      

}

// useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         navigation.replace("Home")
//     }
//     })

//     return unsubscribe
// }, [])

  return (

  
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

      <Text style={styles.hearder}>Create Group</Text>

      <View style={styles.inputContainer}>
      <TextInput
            placeholder="Group name"
            //   value={password}
            onChangeText={text => handleChange(text, "groupname")}
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
          onPress={() => navigation.navigate('Group', { name: 'Group' })}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default AddGroup

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