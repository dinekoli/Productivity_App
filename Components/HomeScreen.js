import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import FlatListData from '../Data/FlatListData.json';
import ImageComponent from '../Components/ImageComponent.js';



export default class HomeScreen extends Component {
  
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
    
                <FlatList
                  key={(this.state.gridView) ? 1 : 0}
                  numColumns={2}
                  data={FlatListData}
                  renderItem={({ item }) =>
                    <ImageComponent imageURI={require('../Resource/ReactNative-HouseImage/Default.jpg')} name={item.name.toUpperCase()} name1={item.name1.toUpperCase()} />
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
        backgroundColor:'#EEEDE7',
      },
      textOnImage: {
        color: '#055C9D',
        alignSelf: 'flex-start'
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
    });