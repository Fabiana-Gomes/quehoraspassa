import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importe o GestureHandlerRootView
import ScreenOne from './ScreenOne';
import ScreenLogin from './ScreenLogin';
import Mapa from './Mapa';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={ScreenOne}
          />
          <Stack.Screen name="Login" component={ScreenLogin} />
          <Stack.Screen name="Mapa" component={Mapa} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigation;
