
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { MainStackNavigator} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
        
            {/* // headerShown: false,
            // tabBarShowLabel: false,
            
            // tabBarInactiveTintColor: '#fff',
            // tabBarActiveTintColor: 'yellow',
        //  */}
      <Tab.Screen name="Chat" 
            options={{tabBarStyle: {backgroundColor: '#2D4Df4'},
                     tabBarInactiveTintColor: '#ffffff',
                     tabBarActiveTintColor: '#ffffff',
                     tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color="#ffffff"/>),headerTitle: "Chats" }}
            component={MainStackNavigator}/>     
      <Tab.Screen name="Group" 
            options={{ 
                tabBarStyle: {backgroundColor: '#2D4Df4'},
                     tabBarInactiveTintColor: '#ffffff',
                     tabBarActiveTintColor: '#ffffff',
                     tabBarIcon: ({ color }) => (
            <FontAwesome name="group" size={24} color="#ffffff"/>), headerTitle: "Group"   }}
            component={MainStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;