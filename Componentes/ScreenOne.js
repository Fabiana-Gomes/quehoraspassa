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
      source={require('../assets/profile.png')}
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
    width: 150,
    height: 150,
  },
});


export default ScreenOne;