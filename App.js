import 'react-native-gesture-handler';

// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from "./navigation/TabNavigator";
import { MainStackNavigator} from "./navigation/StackNavigator";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';
import Group from './screens/Group';
import GroupChat from './screens/GroupChat';
import AddGroup from './screens/AddGroup';
import AddGroupPart from './screens/AddGroupPart';
// import { initializeApp } from "firebase/app"
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App( ) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyCq-55xynTUW5sbZAWkpUJSg3l_Ngmpe_k",
    authDomain: "lasapp-18063.firebaseapp.com",
    projectId: "lasapp-18063",
    storageBucket: "lasapp-18063.appspot.com",
    messagingSenderId: "838231747110",
    appId: "1:838231747110:web:93467841e647cc3fb054e7"
  };

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else 
  {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    // <StatusBar barStyle="light-content" />
    

    <NavigationContainer>
          
          {isLoggedIn ?<Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false, tabBarVisible: false}}>
              {props => <Home {...props} extraData={isLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="AddChat" options={{ headerShown: false}} component={AddChat} />
            <Stack.Screen name="Chat"  options={{ headerShown: false}} component={Chat} />
            <Stack.Screen name="Group" options={{ headerShown: false, tabBarVisible: false}} component={Group} />
            <Stack.Screen name="GroupChat" options={{ headerShown: false, tabBarVisible: false}} component={GroupChat} />
            <Stack.Screen name="AddGroup" options={{ headerShown: false, tabBarVisible: false}} component={AddGroup} />
            <Stack.Screen name="AddGroupPart" options={{ headerShown: false, tabBarVisible: false}} component={AddGroupPart} />
          </Stack.Navigator>:

          <Stack.Navigator> 
            <Stack.Screen name="Login" options={{ headerShown: false, tabBarVisible: false, }} component={Login} />
            <Stack.Screen name="Signup" options={{ headerShown: false}} component={Signup} />
        </Stack.Navigator>}

      {/* < MainStackNavigator/> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
