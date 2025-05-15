import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const initialPetshops = [
  {
    id: '1',
    nome: 'Pata & Vida',
    especialidade: 'Petshop',
    avatar: require('../assets/images/PataVida.png'),
    favorito: false,
    avaliacao: 4.8,
    distancia: '1 km',
  },
  {
    id: '2',
    nome: 'Rei dos Bichos',
    especialidade: 'Petshop',
    avatar: require('../assets/images/Rei.png'),
    favorito: false,
    avaliacao: 4.2,
    distancia: '1.8 km',
  },
  {
    id: '3',
    nome: 'Melhor Amigo',
    especialidade: 'Petshop',
    avatar: require('../assets/images/PetShopBanho.png'),
    favorito: false,
    avaliacao: 4.6,
    distancia: '1.9 km',
  },
  {
    id: '4',
    nome: 'Viva Pet',
    especialidade: 'Petshop',
    avatar: require('../assets/images/Viva.png'),
    favorito: false,
    avaliacao: 4.6,
    distancia: '2.2 km',
  },
  {
    id: '5',
    nome: 'Mundo Animal',
    especialidade: 'Petshop',
    avatar: require('../assets/images/Mundo.png'),
    favorito: false,
    avaliacao: 4.5,
    distancia: '3.8 km',
  },
];

export default function BanhoTosaScreen() {
  const router = useRouter();
  const [petshops, setPetshops] = useState(initialPetshops);
  const handleGoBack = () => router.push('/(tabs)');

  const toggleFavorite = (id: string) => {
    setPetshops((prev) =>
      prev.map((shop) =>
        shop.id === id ? { ...shop, favorito: !shop.favorito } : shop
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Banho e tosa</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.sectionTitle}>Petshops disponíveis</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {petshops.map((shop) => (
          <TouchableOpacity key={shop.id} style={styles.card} onPress={() => router.push({ pathname: '/servicos/reserva/[petshopId]', params: { petshopId: shop.id } })}>
            <Image source={shop.avatar} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{shop.nome}</Text>
              <Text style={styles.specialty}>{shop.especialidade}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={14} color="#354259" />
                <Text style={styles.rating}>{shop.avaliacao}</Text>
                <Ionicons name="location-outline" size={14} color="#717786" style={{ marginLeft: 8 }} />
                <Text style={styles.distance}>{shop.distancia}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(shop.id)}>
              <Ionicons
                name={shop.favorito ? 'star' : 'star-outline'}
                size={24}
                color={shop.favorito ? '#FFD700' : '#D9DFE6'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 32,
    backgroundColor: '#fff',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginLeft: 20,
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 16,
  },
  info: { flex: 1 },
  name: { fontWeight: '600', fontSize: 15, color: '#222' },
  specialty: { fontSize: 13, color: '#717786', marginBottom: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  rating: { fontSize: 13, color: '#354259', marginLeft: 4 },
  distance: { fontSize: 13, color: '#717786', marginLeft: 4 },
}); 