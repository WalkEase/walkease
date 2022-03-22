import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './screens/SignupScreen';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalkerWalkMap from './screens/WalkerScreens/WalkerHomePage/WalkerWalkMapCard';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen name="Sign-up" component={SignupScreen} />
        <Stack.Screen name="Walker" component={WalkerWalkMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
