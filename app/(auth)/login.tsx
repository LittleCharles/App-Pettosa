import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/enter');
  };
 
  const handleCreateAccount = () => {
    router.push('/(auth)/register');
  };

  const handleGoogleSignIn = () => {
 
    console.log('Login com Google');
    router.replace('/(tabs)');
  };

  const handleFacebookSignIn = () => {
 
    console.log('Login com Facebook');
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Conteúdo centralizado */}
      <View style={styles.centeredContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/LogoPetTosa.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        {/* Botões de login */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleLogin}
          >
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleCreateAccount}
          >
            <Text style={styles.secondaryButtonText}>Criar conta</Text>
          </TouchableOpacity>
          
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Ou</Text>
            <View style={styles.divider} />
          </View>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={handleGoogleSignIn}
          >
            <Image 
              source={require('../../assets/images/Google.png')} 
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continuar com Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={handleFacebookSignIn}
          >
            <Image 
              source={require('../../assets/images/Facebook.png')} 
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continuar com Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64,
  },
  logo: {
    width: 250,
    height: 60,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 320, 
  },
  primaryButton: {
    backgroundColor: '#344363',
    borderRadius: 8,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#344363',
    marginBottom: 32,
  },
  secondaryButtonText: {
    color: '#344363',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E3E8',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#717786',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E3E8',
    marginBottom: 20,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});