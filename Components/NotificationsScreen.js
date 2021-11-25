
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class NotificationsScreen extends Component {
  
    constructor() {
        super();
        this.state = { imagesData: null, loading: false, gridView: true, btnText: 'Show List' }
      }
    
      render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Notifications</Text>
          </View>
        );
      }
    
  }