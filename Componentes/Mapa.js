import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'react-native';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

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
            <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} />
          )}
        </MapView>
    
        <TouchableOpacity style={styles.floatingButton} onPress={handleOverlayToggle}>
          <Text style={styles.buttonText}>{overlayVisible ? 'Fechar' : 'Abrir'}</Text>
        </TouchableOpacity>
    
        {overlayVisible && (
          <View style={styles.overlayContainer}>
            <View style={styles.overlayContent}>
              <Text style={styles.overlayText}>Sobreposição com desfoque</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Ajuste o valor do último componente (0.5) para a opacidade desejada
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    color: 'black',
  },
  floatingButton: {
    position: 'absolute',
    top: '20%',  // Ajustado para manter o botão a 60% da página
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
