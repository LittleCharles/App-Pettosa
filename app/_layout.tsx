// app/_layout.js
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? '#121212' : '#FFFFFF',
          },
        }}
      >
        {/* Adicione as telas de autenticação aqui */}
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="+not-found" 
          options={{
            title: 'Oops!',
            // Mantemos headerShown: true apenas para not-found para mostrar título
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="pet" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}