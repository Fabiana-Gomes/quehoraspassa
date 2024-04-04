import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import pontosEmbarque from './PontosEmbarque';
import Menu from './Menu'; // Importa o componente Menu

export default function Mapa() {
  const [initialRegion, setInitialRegion] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

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

  const handleOverlayToggle = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {initialRegion && (
          pontosEmbarque.map(stop => (
            <Marker
              key={stop.id}
              coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
              title={`Parada ${stop.stopId}`}
            />
          ))
        )}
      </MapView>

      <Menu handleOverlayToggle={handleOverlayToggle} />

      {overlayVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Image
              source={require('../assets/profile.png')} 
              style={[styles.overlayImage, { marginBottom: 400 }]} 
              />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    justifyContent: 'flex-end',
  },
  overlayContent: {
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
  },
  overlayImage: {
    width: 100, 
    height: 100, 
  },
});
