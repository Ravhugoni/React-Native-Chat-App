import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/core';

export default function GroupComponent({Group}) {
  
  const navigation = useNavigation()
  
  return (
    <View style={styles.itemsList}>
      {Group.map((item, index) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('GroupChat',  { GroupName : item.groupname} )}>
            <View key={index} style={{flexDirection:'row'}}>
                <Image source={require("../assets/icon.png")}
                  style={styles.groupImage}
                  />
              <Text style={styles.itemtext}>{item.groupname}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemsList: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft:1,
    paddingBottom:20,
    
  },
  itemtext: {
    fontSize: 14,
    // fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom:30,
  },
  groupImage: {
    width: 50,
    height: 50,
    marginLeft: 20,
    borderRadius: 30,
  },
});