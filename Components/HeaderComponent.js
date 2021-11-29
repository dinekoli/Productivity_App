import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, Dimensions, StyleSheet, View, Text } from 'react-native';

import B2CClient from '../utils/msal/b2cClient';
import { b2cConfig, b2cScopes as scopes } from '../utils/msal/msalConfig';

const b2cClient = new B2CClient(b2cConfig, false);

export default function HeaderComponent (){

  const [authResult, setAuthResult] = React.useState(null);
  const [iosEphemeralSession, setIosEphemeralSession] = React.useState(false);
  const webviewParameters = {
    ios_prefersEphemeralWebBrowserSession: iosEphemeralSession,
  }

  React.useEffect(() => {
    async function init() {
      try {
        await b2cClient.init();
        const isSignedIn = await b2cClient.isSignedIn();
        if (isSignedIn) {
          setAuthResult(await b2cClient.acquireTokenSilent({ scopes }));
        }
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  const handleSignInPress = async () => {
    try {
      const res = await b2cClient.signIn({ scopes: ["user.read"],
      authority: 'https://login.microsoftonline.com/a9c0bc09-8b46-4206-9351-2ba12fb4a5c0',
      promptType: 3,
      prompt: 'select_account' });
      setAuthResult(res);
      alert(JSON.stringify(res));
    } catch (error) {
      console.warn(error);
      alert(error);
    }
  };

  const handleAcquireTokenPress = async () => {
    const accounts = await b2cClient.pca.getAccounts();
    setAuthResult(null);
    try {
      const res = await b2cClient.pca.acquireTokenSilent({ scopes: ["user.read"] , account: accounts[0]});
      setAuthResult(res);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSignoutPress = async () => {
    try {
      await b2cClient.signOut();
      setAuthResult(null);
    } catch (error) {
      console.warn(error);
    }
  };
  
   
  return (
    <View style={styles.HeaderRow}>

      <TouchableWithoutFeedback style={{flex: 1}} onPress={ authResult ? handleSignoutPress : handleSignInPress } >
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
};

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