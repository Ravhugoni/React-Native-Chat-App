import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import group from '../screens/group';
import chat from '../screens/chat';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="group" component={group} />
      <Tab.Screen name="chat" component={chat} />
    </Tab.Navigator>
  );
};

export default TabNavigator;