import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navegar para a tela de login quando o botão for pressionado
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Imagem do cachorro com borda arredondada na parte inferior */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/DogOnboarding.png')} // Certifique-se de ter essa imagem na pasta assets/images
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      {/* Conteúdo de texto */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo ao Pettosa!</Text>
        <Text style={styles.subtitle}>
          Você está no lugar certo para cuidar do seu pet com praticidade e carinho.
        </Text>
        
        {/* Botão para começar */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Vamos começar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: '55%', // Altura da imagem
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'medium',
    color: '#344363',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#838383',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#344363',
    borderRadius: 12,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});