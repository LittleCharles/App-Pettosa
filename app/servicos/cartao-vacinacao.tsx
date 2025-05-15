import React from 'react';
import { Stack } from 'expo-router';
import CartaoVacinacaoScreen from '../../components/CartaoVacinacaoScreen';

export default function CartaoVacinacaoRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CartaoVacinacaoScreen />
    </>
  );
} 