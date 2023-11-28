import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

const ScreenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    setEmail('');
    setPassword('');
    navigation.navigate('Mapa');
  }

  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      resizeMode: 'stretch',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'normal',
      marginBottom: 12,
      color: 'white',
    },
    input: {
      height: 40,
      width: 300,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 25,
      borderRadius: 8,
      color: 'white',
    },
    button: {
      width: 100,
      height: 35,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: 'blue',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/loginfundo.png')} style={styles.backgroundImage}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Realize seu login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={handleEmailChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              placeholderTextColor="white"
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default ScreenLogin;
