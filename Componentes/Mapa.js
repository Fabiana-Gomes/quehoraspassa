import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function ScreenLogin() {
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await getCurrentPositionAsync({});
        const { coords } = location;

        setInitialRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
