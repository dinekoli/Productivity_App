import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, Dimensions, StyleSheet, View, Text } from 'react-native';
export default class HeaderComponent extends Component {
  
    constructor() {
        super();
      }
    
      render() {
        return (
            <View style={styles.HeaderRow}>

            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is profile image')}>
              <Image source={require('../Resource/ReactNative-HouseImage/user.png')} style={styles.UserImage}  />
            </TouchableWithoutFeedback>
      
            <Text style={styles.HeaderName}>Dashboard</Text>
      
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is bell image')}>
              <Image source={require('../Resource/ReactNative-HouseImage/bell.png')} style={styles.BellImage}  />
            </TouchableWithoutFeedback>
      
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is search image')}>
              <Image source={require('../Resource/ReactNative-HouseImage/search.png')} style={styles.SearchImage}  />
            </TouchableWithoutFeedback>
      
          </View>
          );
      }
  }

  const styles = StyleSheet.create(
    {
      UserImage: {
        marginRight: 10,
        width: 25,
        height: 25
      },
      BellImage: {
        right: 10,
        width: 25,
        height: 25
      },
      SearchImage: {
        right: 0,
        width: 20,
        height: 20
      },
      HeaderRow: {
        height: 40,
        width: Dimensions.get('window').width*0.93,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
      },
      HeaderName: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        fontWeight: '800'
      }
    });