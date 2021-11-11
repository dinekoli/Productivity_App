// import React, { Component } from 'react';

// import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';

// import { createStackNavigator } from '@react-navigation/stack';


// class HomeScreen extends Component {
 
//  constructor(props)
//  {
//    super(props);

//    this.state = { GridViewItems: [
//      {key: 'One'},
//      {key: 'Two'},
//      {key: 'Three'},
//      {key: 'Four'},
//      {key: 'Five'},
//      {key: 'Six'},
//      {key: 'Seven'}
//    ]}
//  }

//  GetGridViewItem (item) {
  
//  Alert.alert(item);

//  }

//  static navigationOptions = {
//   title: 'Home',
// };

//  render() {
//    return (


// <View style={styles.MainContainer}>
 
//       <FlatList
      
//          data={ this.state.GridViewItems }

//          renderItem={({item}) =><View style={styles.GridViewBlockStyle}>

//             <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
            
//             </View>}

//          numColumns={2}

//         />
   
   
// </View>           
//    );
//  }
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//         <Stack.Screen name="Home" component={HomeScreen} options={{
//           title: 'My home',
//           headerTitleAlign: 'left',
//           headerStyle: {
//             backgroundColor: '#f4511e',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//             fontWeight: 'bold',
//             placement:"left"
//           },
//         }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// const styles = StyleSheet.create({

// MainContainer :{

// justifyContent: 'center',
// flex:1,
// margin: 10,
// paddingTop: (Platform.OS) === 'ios' ? 20 : 0

// },

// GridViewBlockStyle: {

//   justifyContent: 'center',
//   flex:1,
//   alignItems: 'center',
//   height: 100,
//   margin: 5,
//   backgroundColor: '#00BCD4'

// }
// ,

// GridViewInsideTextItemStyle: {

//    color: '#fff',
//    padding: 10,
//    fontSize: 18,
//    justifyContent: 'center',
   
//  },

// });

// export default App;




import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, View, Platform, Text } from 'react-native';

class ImageComponent extends Component {

  constructor() {
    super();
  }
  render() {
    return (
      <View style={styles.imageHolder}>
        <Image source={{ uri: this.props.imageURI }} style={styles.image} />
        <View style={styles.textViewHolder}>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}


var flatListData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name : 'Apple',
    imageUrl : '/Users/m_ambin04021/Documents/GitHub/productivity_app/producuctivity_app/Resource/ReactNative-HouseImage/Apple.jpeg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    name : 'Camera',
    imageUrl : '/Users/m_ambin04021/Documents/GitHub/productivity_app/producuctivity_app/Resource/ReactNative-HouseImage/Camera.jpeg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
    name : 'Car',
    imageUrl : '/Users/m_ambin04021/Documents/GitHub/productivity_app/producuctivity_app/Resource/ReactNative-HouseImage/Car.jpeg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
    name : 'Taj Mahal',
    imageUrl : '/Users/m_ambin04021/Documents/GitHub/productivity_app/producuctivity_app/Resource/ReactNative-HouseImage/Taj_Mahal.jpeg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    name : 'Nature',
    imageUrl : '/Users/m_ambin04021/Documents/GitHub/productivity_app/producuctivity_app/Resource/ReactNative-HouseImage/Nature.jpeg'
  }
]


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

  // changeView = () => {
  //   this.setState({ gridView: !this.state.gridView }, () => {
  //     if (this.state.gridView) {
  //       this.setState({ btnText: 'Show List' });
  //     }
  //     else {
  //       this.setState({ btnText: 'Show Grid' });
  //     }
  //   });
  // }

  render() {
    return (
      <View style={styles.container} >
        {
          (this.state.loading)
            ?
            (<View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Please Wait...</Text>
            </View>)
            :
            (<View style={{ flex: 1 }}>

              <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={this.changeView}>
                <Text style={styles.buttonText}>{this.state.btnText}</Text>
              </TouchableOpacity>
              {/* for (let i = 0; i < 7; i++) { 
              } */}


              <FlatList 
                key={(this.state.gridView) ? 1 : 0}
                numColumns={2}
                // data={this.state.imagesData}
                data={flatListData}
                renderItem={({ item }) =>
                  <ImageComponent imageURI={item.imageUrl} name={item.name.toUpperCase()} />
                }
                keyExtractor={(item) => item.id}
                />

            </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
    },
    imageHolder: {
      margin: 5,
      height: 160,
      flex: 1,
      position: 'relative'
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover'
    },
    textViewHolder: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 10,
      paddingVertical: 13,
      alignItems: 'center'
    },
    textOnImage: {
      color: 'white'
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loadingText: {
      paddingTop: 10,
      fontSize: 18,
      color: 'black'
    },
    buttonDesign: {
      padding: 15,
      backgroundColor: '#e91e63'
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch'
    }
  });