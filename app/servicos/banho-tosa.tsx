import React from 'react';
import { Stack } from 'expo-router';
import BanhoTosaScreen from '../../components/BanhoTosaScreen';

export default function BanhoTosaRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BanhoTosaScreen />
    </>
  );
} 