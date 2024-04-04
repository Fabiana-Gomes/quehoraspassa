import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import pontosEmbarque from './PontosEmbarque';

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

      <TouchableOpacity style={styles.floatingButton} onPress={handleOverlayToggle}>
      </TouchableOpacity>

      {overlayVisible && (
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Image
              source={require('../assets/profile.png')} 
              style={[styles.overlayImage, { marginBottom: 400 }]} // Ajuste o valor conforme necessário
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

  floatingButton: {
    position: 'absolute',
    top: '20%',  
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#054dac',
  },
  buttonText: {
    color: '#2642EF',
  },
});