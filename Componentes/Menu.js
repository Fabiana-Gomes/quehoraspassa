import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Menu = ({ handleOverlayToggle }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handleOverlayToggle}>
      <Image
        source={require('../assets/profile.png')}
        style={styles.buttonImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  buttonImage: {
    width: 30, // Ajuste o tamanho do ícone conforme necessário
    height: 30, // Ajuste o tamanho do ícone conforme necessário
  },
});

export default Menu;
