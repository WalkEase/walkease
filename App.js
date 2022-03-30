import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import OwnerLandingScreen from './screens/OwnerLandingScreen/OwnerLandingScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import UserContext from './contexts/UserContext';
import WalksMapScreen from './screens/WalkerScreens/WalksMapScreen/WalksMapScreen';
import WalksListScreen from './screens/WalkerScreens/WalksListScreen/WalksListScreen';
import MyDogsScreen from './screens/MyDogsScreen/MyDogsScreen';
import ListAWalkScreen from './screens/ListAWalkScreen/ListAWalkScreen';
import MyDetailsScreen from './screens/MyDetailsScreen/MyDetailsScreen';
import EditMyDetailsScreen from './screens/EditMyDetailsScreen/EditMyDetailsScreen';
import MyListedWalksScreen from './screens/MyListedWalksScreen/MyListedWalksScreen';
import WalkerLandingScreen from './screens/WalkerScreens/WalkerLandingScreen/WalkerLandingScreen';
import SingleDogScreen from './screens/SingleDogScreen/SingleDogScreen';
import AddDogScreen from './screens/AddDogScreen/AddDogScreen';

import Header from './components/Header/Header';
import SingleWalkPage from './screens/SingleWalkPage/SingleWalkPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Header />
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen name="Sign-up" options={{ headerShown: false }} component={SignUpScreen} />

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
            name="MyListedWalksScreen"
            options={{ headerShown: false }}
            component={MyListedWalksScreen}
          />
          <Stack.Screen
            name="MyDetailsScreen"
            options={{ headerShown: false }}
            component={MyDetailsScreen}
          />
          <Stack.Screen
            name="EditMyDetailsScreen"
            options={{ headerShown: false }}
            component={EditMyDetailsScreen}
          />
          <Stack.Screen
            name="WalkerLandingScreen"
            options={{ headerShown: false }}
            component={WalkerLandingScreen}
          />
          <Stack.Screen
            name="WalksListScreen"
            options={{ headerShown: false }}
            component={WalksListScreen}
          />
          <Stack.Screen
            name="WalksMapScreen"
            options={{ headerShown: false }}
            component={WalksMapScreen}
          />

          <Stack.Screen
            name="SingleDogScreen"
            options={{ headerShown: false }}
            component={SingleDogScreen}
          />

          <Stack.Screen
            name="AddDogScreen"
            options={{ headerShown: false }}
            component={AddDogScreen}
          />

          <Stack.Screen
            name="SingleWalkPage"
            options={{ headerShown: false }}
            component={SingleWalkPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
