import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import OwnerLandingScreen from './screens/OwnerLandingScreen/OwnerLandingScreen';
import SignupScreen from './screens/SignupScreen';
import { StatusBar } from 'expo-status-bar';
import UserContext from './contexts/UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import MyDogsScreen from './screens/MyDogsScreen/MyDogsScreen';
import ListAWalkScreen from './screens/ListAWalkScreen/ListAWalkScreen';
import MyDetailsScreen from './screens/MyDetailsScreen/MyDetailsScreen';
import MyListedWalksScreen from './screens/MyListedWalksScreen/MyListedWalksScreen';

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
           <Stack.Screen
            name="MyDogsScreen"
            options={{ headerShown: false }}
            component={MyDogsScreen}
          />
           <Stack.Screen
            name="ListAWalkScreen"
            options={{ headerShown: false }}
            component={ListAWalkScreen}
          />
           <Stack.Screen
            name="MyDetailsScreen"
            options={{ headerShown: false }}
            component={MyDetailsScreen}
          />
          <Stack.Screen
            name="MyListedWalksScreen"
            options={{ headerShown: false }}
            component={MyListedWalksScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
