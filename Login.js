/**
 * Example for a Azure B2C application using a B2CClient helper class
 */

 import React from 'react';
 import { Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
 import B2CClient from './utils/msal/b2cClient';
 import { b2cConfig, b2cScopes as scopes } from './utils/msal/msalConfig';
 
 const b2cClient = new B2CClient(b2cConfig, false);
 const promptType=3;

 export default function Msal() {
   const [authResult, setAuthResult] = React.useState(null);
   const [iosEphemeralSession, setIosEphemeralSession] = React.useState(false);
  //  const webviewParameters = {
     //ios_prefersEphemeralWebBrowserSession: iosEphemeralSession,
   //};
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
     <SafeAreaView style={styles.container}>
       <View style={styles.buttonContainer}>
         {authResult ? (
           <>
             <TouchableOpacity style={styles.button} onPress={handleAcquireTokenPress}>
               <Text>Acquire Token (Silent)</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={handleSignoutPress}>
               <Text>Sign Out</Text>
             </TouchableOpacity>
           </>
         ) : (
           <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
             <Text>Sign In</Text>
           </TouchableOpacity>
         )}
 
         {Platform.OS === 'ios' && (
           <TouchableOpacity
             style={[styles.button, styles.switchButton]}
             onPress={() => setIosEphemeralSession(!iosEphemeralSession)}
           >
             <Text>Prefer ephemeral browser session (iOS only)</Text>
             <Switch value={iosEphemeralSession} onValueChange={setIosEphemeralSession} />
           </TouchableOpacity>
         )}
       </View>
       <ScrollView style={styles.scrollView}>
         <Text>{JSON.stringify(authResult, null, 2)}</Text>
       </ScrollView>
     </SafeAreaView>
   );

 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: '1%',
   },
   buttonContainer: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     paddingBottom: '1%',
     margin: '-0.5%',
   },
   button: {
     backgroundColor: 'aliceblue',
     borderWidth: 1,
     margin: '0.5%',
     padding: 8,
     width: '49%',
     alignItems: 'center',
   },
   disabledButton: {
     backgroundColor: '#ddd',
   },
   switchButton: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     padding: 4,
     margin: '0.5%',
     width: '99%',
   },
   scrollView: {
     borderWidth: 1,
     padding: 1,
   },
 });