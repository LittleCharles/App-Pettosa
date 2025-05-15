import React from 'react';
import { Stack } from 'expo-router';
import ReservaBanhoTosaScreen from '../../../components/ReservaBanhoTosaScreen';

export default function ReservaBanhoTosaRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ReservaBanhoTosaScreen />
    </>
  );
} 