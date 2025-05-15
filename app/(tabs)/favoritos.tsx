import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const favoritos = [
  {
    id: '1',
    nome: 'Dra. Fernanda Alves',
    especialidade: 'Veterinária',
    avatar: require('../../assets/images/VetImage.png'),
    avaliacao: 4.8,
    distancia: '1 km',
    tipo: 'vet',
  },
  {
    id: '2',
    nome: 'Dra. Beatriz Amaral',
    especialidade: 'Veterinária',
    avatar: require('../../assets/images/DrBea.png'),
    avaliacao: 4.9,
    distancia: '1.5 km',
    tipo: 'vet',
  },
  {
    id: '3',
    nome: 'Petshop Pata Vida',
    especialidade: 'Petshop',
    avatar: require('../../assets/images/PataVida.png'),
    avaliacao: 4.7,
    distancia: '2.1 km',
    tipo: 'petshop',
  },
  {
    id: '4',
    nome: 'Petshop Melhor Amigo',
    especialidade: 'Petshop',
    avatar: require('../../assets/images/PetShopBanho.png'), 
    avaliacao: 4.6,
    distancia: '2.8 km',
    tipo: 'petshop',
  },
];

export default function FavoritosScreen() {
  const router = useRouter();
  const profissionais = favoritos.filter(f => f.tipo === 'vet');
  const petshops = favoritos.filter(f => f.tipo === 'petshop');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.sectionTitle}>Profissionais e serviços</Text>
        <View style={{ height: 8 }} />
        {profissionais.map((fav) => (
          <View key={fav.id} style={styles.card}>
            <Image source={fav.avatar} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{fav.nome}</Text>
              <Text style={styles.especialidade}>{fav.especialidade}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 2 }} />
                <Text style={styles.rating}>{fav.avaliacao}</Text>
                <Ionicons name="location-outline" size={14} color="#717786" style={{ marginLeft: 10, marginRight: 2 }} />
                <Text style={styles.distancia}>{fav.distancia}</Text>
              </View>
            </View>
            <Ionicons name="star" size={24} color="#FFD700" style={styles.favIcon} />
          </View>
        ))}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Petshops</Text>
        <View style={{ height: 8 }} />
        {petshops.map((fav) => (
          <View key={fav.id} style={styles.card}>
            <Image source={fav.avatar} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{fav.nome}</Text>
              <Text style={styles.especialidade}>{fav.especialidade}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 2 }} />
                <Text style={styles.rating}>{fav.avaliacao}</Text>
                <Ionicons name="location-outline" size={14} color="#717786" style={{ marginLeft: 10, marginRight: 2 }} />
                <Text style={styles.distancia}>{fav.distancia}</Text>
              </View>
            </View>
            <Ionicons name="star" size={24} color="#FFD700" style={styles.favIcon} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerFixed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#354259',
    textAlign: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginLeft: 20,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: '#F5F5F7',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  especialidade: {
    fontSize: 13,
    color: '#717786',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    color: '#717786',
    marginRight: 8,
  },
  distancia: {
    fontSize: 13,
    color: '#717786',
  },
  favIcon: {
    marginLeft: 10,
  },
});