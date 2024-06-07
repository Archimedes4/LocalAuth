import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';
import React from 'react';

enum authModeEnum {
  Local,
  Password,
  NoComp,
  Authenticate
}

export default function App() {
  const [authMode, setAuthMode] = useState(authModeEnum.Local);

  // It is possible to hnave a state if their is an login operation going and then call this on every rerender. But I would not recommend it.
  useEffect(() => {
    onAuthenticate();
  }, []);

  async function onAuthenticate() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Touch ID",
        fallbackLabel: "Enter Password",
      });
      auth.success ? setAuthMode(authModeEnum.Authenticate) : setAuthMode(authModeEnum.Password);
    } else {
      setAuthMode(authModeEnum.NoComp)
    }
  }

  if (authMode === authModeEnum.Local) {
    return (
      <View style={styles.container}>
        <Text>Local Authentication</Text>
        <Pressable onPress={() => onAuthenticate()}>
          <Text>Login</Text>
        </Pressable>
      </View>
    );
  }


  if (authMode === authModeEnum.NoComp) {
    return (
      <View style={styles.container}>
        <Text>Cannot authenticate add some logic</Text>
      </View>
    );
  }

  if (authMode === authModeEnum.Authenticate) {
    return (
      <View style={styles.container}>
        <Text>Yay we logged in</Text>
      </View>
    );
  }


  if (authMode === authModeEnum.Password) {
    return (
      <View style={styles.container}>
        <Text>Some password auth</Text>
        <Text>This page is not need the user could just be brought back to the local page,</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
