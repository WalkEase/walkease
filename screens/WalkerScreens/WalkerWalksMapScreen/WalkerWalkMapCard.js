import * as React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Text, View, Button } from 'react-native';
import styles from './styles';

function WalkerWalkMap({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.tempHeader}>
        <Text>Temp Header</Text>
      </View>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 53.48093470818428,
          longitude: -2.242502936136497,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 53.48093470818428,
            longitude: -2.242502936136497,
          }}
          pinColor="black"
        >
          <Callout>
            <Text>Northcoders</Text>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.tempBottomNav}>
        <Text>Temp Bottom nav bar</Text>
        <Button title="Go to login screen" onPress={() => navigation.navigate('Login')}>
          Back to Login
        </Button>
      </View>
    </View>
  );
}

export default WalkerWalkMap;
