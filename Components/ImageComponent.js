import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet, View, Text } from 'react-native';

export default class ImageComponent extends Component {
  
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
                {this.props.name1}
              </Text>
            </View>
          </View>
        );
      }
  }
  

  const styles = StyleSheet.create(
    {
      imageHolder: {
        margin: 5,
        height: Dimensions.get('window').width*0.5 - 10,
        width: Dimensions.get('window').width*0.5 - 10,
        // flex: 1,
        position: 'relative',
        backgroundColor:'#FFF',
        borderColor: '#000',
      },
      image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5
      },
      textViewHolder: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5
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
    });
  