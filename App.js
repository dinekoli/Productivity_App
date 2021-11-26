import React, { Component } from 'react';
// import { Dimensions, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderComponent from './Components/HeaderComponent';
import HomeScreen from './Components/HomeScreen.js';
import SearchScreen from './Components/SearchScreen.js';
import NotificationsScreen from './Components/NotificationsScreen.js';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EEEDE7',
      },
      headerTintColor: '#EEEDE7',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerTitle: (props) => <HeaderComponent {...props} />,
        headerStyle: {
          backgroundColor: '#EEEDE7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          placement:"left"
        },
      }}/>
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" options={{headerShown: false}} component={StackNavigator} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

export default class App extends Component {

  constructor() {
    super();
    this.state = { imagesData: null, loading: true, gridView: true, btnText: 'Show List' }
  }

  componentDidMount() {
    fetch('https://picsum.photos/v2/list?page=2&limit=30')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ imagesData: responseJson, loading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>

    );
  }
}