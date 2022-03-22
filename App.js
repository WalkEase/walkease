import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import OwnerLandingScreen from './screens/OwnerLandingScreen/OwnerLandingScreen';
import SignupScreen from './screens/SignupScreen';
import { StatusBar } from 'expo-status-bar';
import UserContext from './contexts/UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Sign-up"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="OwnerLandingScreen"
            options={{ headerShown: false }}
            component={OwnerLandingScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
