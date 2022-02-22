
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import AddChat from "../screens/AddChat";
import Chat from "../screens/Chat";
import Group from "../screens/Group";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false, tabBarVisible: false, }} component={Login} />
      <Stack.Screen name="Signup" options={{ headerShown: false}} component={Signup} />
      <Stack.Screen name="Home" options={{ headerShown: false, tabBarVisible: false}} component={Home} />
      <Stack.Screen name="AddChat" options={{ headerShown: false}} component={AddChat} />
      <Stack.Screen name="Chat"  options={{ headerShown: false}} component={Chat} />
      <Stack.Screen name="Group" options={{ headerShown: false, tabBarVisible: false}} component={Group} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };