import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity,  Image, Button, Header, TouchableWithoutFeedback, Dimensions, FlatList, ActivityIndicator, StyleSheet, View, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class ImageComponent extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.imageHolder}>
        <Image source={this.props.imageURI} style={styles.image} />
        <View style={styles.textViewHolder}>
          <Text numberOfLines={1} style={styles.textOnImage}>
            {this.props.name}
          </Text>
          <Text numberOfLines={1} style={styles.textOnImage1}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }

}

const Stack = createStackNavigator();

var flatListData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name : 'Apple',
    imageUrl : require('./Resource/ReactNative-HouseImage/Apple.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    name : 'Camera',
    imageUrl : require('./Resource/ReactNative-HouseImage/Camera.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
    name : 'Car',
    imageUrl : require('./Resource/ReactNative-HouseImage/Car.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
    name : 'Taj Mahal',
    imageUrl : require('./Resource/ReactNative-HouseImage/Taj_Mahal.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    name : 'Nature',
    imageUrl : require('./Resource/ReactNative-HouseImage/Nature.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    name : 'Leaves',
    imageUrl : require('./Resource/ReactNative-HouseImage/leaves.jpeg')
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
    name : 'Sunrise',
    imageUrl : require('./Resource/ReactNative-HouseImage/sunrise.jpeg')
  }
]

class HomeScreen extends Component {

  constructor() {
    super();
    this.state = { imagesData: null, loading: false, gridView: true, btnText: 'Show List' }
  }

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

              {/* <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign} onPress={this.changeView}>
                <Text style={styles.buttonText}>{this.state.btnText}</Text>
              </TouchableOpacity> */}

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

function HeaderComponent() {
  return (
    <View style={styles.HeaderRow}>

      <TouchableWithoutFeedback style={{flex: 2}} onPress={() => alert('This is profile image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/user.png')} style={styles.UserImage}  />
      </TouchableWithoutFeedback>

      <Text style={styles.HeaderName}>Dashboard</Text>

      <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is bell image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/bell.png')} style={styles.BellImage}  />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={{flex: 1}} onPress={() => alert('This is search image')}>
        <Image source={require('./Resource/ReactNative-HouseImage/search.png')} style={styles.SearchImage}  />
      </TouchableWithoutFeedback>

    </View>
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
    <NavigationContainer>
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
    </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor:'#EEEDE7'
    },
    imageHolder: {
      margin: 5,
      height: 160,
      flex: 1,
      position: 'relative',
      backgroundColor:'#FFF'
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
      backgroundColor: 'white',
      paddingHorizontal: 5,
      paddingVertical: 5,
      alignItems: 'center'
    },
    textOnImage: {
      color: '#055C9D',
      alignSelf: 'flex-start'
    },
    textOnImage1: {
      color: 'black',
      alignSelf: 'flex-start',
      fontSize: 10
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
    },
    HeaderRow: {
      height: 'auto',
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
