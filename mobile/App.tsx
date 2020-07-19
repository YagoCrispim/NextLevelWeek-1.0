import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading } from 'expo'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import Routes from './src/routes'

// <></> = fragment

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

// Exibe o app apenas quando todas as fontes forem carregadas
  if (!fontsLoaded) {
    return <AppLoading />
  }


  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    <Routes />
    </>
  );
}
