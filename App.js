import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './screens/SignUpScreen/SignUpScreen';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  // change befor push
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Sign-up" component={SignupScreen} />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
