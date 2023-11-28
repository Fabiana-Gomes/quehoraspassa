import {React,  useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ScreenOne = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);


return (
  <View style={styles.container}>
    <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
    />
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});


export default ScreenOne;