import React, { Component } from 'react';

import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform, Image, Button, Header, TouchableWithoutFeedback, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';


class HomeScreen extends Component {

 constructor(props)
 {
   super(props);

   this.state = { GridViewItems: [
     {key: 'One'},
     {key: 'Two'},
     {key: 'Three'},
     {key: 'Four'},
     {key: 'Five'},
     {key: 'Six'},
     {key: 'Seven'}
   ]}
 }

 GetGridViewItem (item) {

 Alert.alert(item);

 }

 static navigationOptions = {
  title: 'Home',
};

 render() {
   return (


<View style={styles.MainContainer}>

      <FlatList

         data={ this.state.GridViewItems }

         renderItem={({item}) =><View style={styles.GridViewBlockStyle}>

            <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>

            </View>}

         numColumns={2}

        />


</View>
   );
 }
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerTitle: (props) => <HeaderComponent {...props} />,
          title: 'Dashboard',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            placement:"left"
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HeaderComponent() {
  return (
    <View style={{ height: 'auto', width: Dimensions.get('window').width*0.93, borderStyle: 'solid', borderWidth: 1, borderColor: '#0000ff', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>

      <TouchableWithoutFeedback style={{flex: 2}} onPress={() => alert('This is profile image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/user.png')} style={styles.UserImage}  />
      </TouchableWithoutFeedback>

      <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 20, fontWeight: '800'}}>Dashboard</Text>

      <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is bell image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/bell.png')} style={styles.BellImage}  />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is search image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/search.png')} style={styles.SearchImage}  />
      </TouchableWithoutFeedback>

    </View>
  );
}
const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0

},

GridViewBlockStyle: {

  justifyContent: 'center',
  flex:1,
  alignItems: 'center',
  height: 100,
  margin: 5,
  backgroundColor: '#00BCD4'

}
,

GridViewInsideTextItemStyle: {

   color: '#fff',
   padding: 10,
   fontSize: 18,
   justifyContent: 'center',

 },
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
 }


});

export default App;
