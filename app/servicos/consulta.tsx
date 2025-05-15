import React from 'react';
import { Stack } from 'expo-router';
import ConsultaVeterinariaScreen from '../../components/ConsultaVeterinariaScreen';

export default function ConsultaScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <ConsultaVeterinariaScreen />
    </>
  );
} 