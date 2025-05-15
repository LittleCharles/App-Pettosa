import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [notificacoesPromo, setNotificacoesPromo] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#354259" />
        </TouchableOpacity>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Cabeçalho do perfil */}
          <View style={styles.profileHeader}>
            <Image 
              source={require('../../assets/images/ProfileAvatar.png')} 
              style={styles.profilePic}
            />
            <Text style={styles.name}>Paula Carvalho</Text>
            <Text style={styles.email}>paula.carvalho@gmail.com</Text>
          </View>
          
          {/* Seção Minha Conta */}
          <Text style={styles.sectionTitle}>Minha conta</Text>
          
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Informação pessoal</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="globe-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Idioma</Text>
              <Text style={styles.menuItemDetail}>Português (BR)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Política de privacidade</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Configurações</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
            </TouchableOpacity>
          </View>
          
          {/* Seção Notificações */}
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.menuSection}>
            <View style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Ativar notificações</Text>
              <Switch
                trackColor={{ false: '#DDDDDD', true: '#4CAF50' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="#DDDDDD"
                onValueChange={setNotificacoesAtivas}
                value={notificacoesAtivas}
              />
            </View>
            
            <View style={styles.menuItem}>
              <Ionicons name="megaphone-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Notificações promocionais</Text>
              <Switch
                trackColor={{ false: '#DDDDDD', true: '#4CAF50' }}
                thumbColor={'#FFFFFF'}
                ios_backgroundColor="#DDDDDD"
                onValueChange={setNotificacoesPromo}
                value={notificacoesPromo}
              />
            </View>
          </View>
          
          {/* Seção More */}
          <Text style={styles.sectionTitle}>Mais</Text>
          
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="help-circle-outline" size={20} color="#354259" />
              <Text style={styles.menuItemText}>Central de Ajuda</Text>
              <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
              <Text style={styles.menuItemTextLogout}>Desconectar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  backButton: {
    padding: 16,
    position: 'absolute',
    top: 36,
    left: 10,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginTop: 60,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#717786',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    color: '#000000',
  },
  menuItemTextLogout: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    color: '#FF3B30',
  },
  menuItemDetail: {
    fontSize: 14,
    color: '#717786',
    marginRight: 4,
  },
});