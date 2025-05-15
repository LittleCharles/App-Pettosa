import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const initialVeterinarios = [
  {
    id: '1',
    nome: 'Dra. Fernanda Alves',
    especialidade: 'Veterinária',
    avatar: require('../assets/images/VetImage.png'),
    favorito: true,
    avaliacao: 4.8,
    distancia: '1 km',
  },
  {
    id: '2',
    nome: 'Dra. Beatriz Amaral',
    especialidade: 'Veterinária',
    avatar: require('../assets/images/VetImageW.png'),
    favorito: true,
    avaliacao: 4.9,
    distancia: '1.5 km',
  },
  {
    id: '3',
    nome: 'Dr. Roberto Ferraz',
    especialidade: 'Veterinário',
    avatar: require('../assets/images/DrRoberto.png'),
    favorito: false,
    avaliacao: 4.6,
    distancia: '2.2 km',
  },
  {
    id: '4',
    nome: 'Dra. Nathália Martins',
    especialidade: 'Veterinária',
    avatar: require('../assets/images/DrNati.png'),
    favorito: false,
    avaliacao: 4.2,
    distancia: '3.5 km',
  },
  {
    id: '5',
    nome: 'Dra. Isabel Ferraz',
    especialidade: 'Veterinária',
    avatar: require('../assets/images/DrIsa.png'),
    favorito: false,
    avaliacao: 4.8,
    distancia: '5.1 km',
  },
];

export default function ConsultaVeterinariaScreen() {
  const router = useRouter();
  const [veterinarios, setVeterinarios] = useState(initialVeterinarios);
  const handleGoBack = () => router.push('/(tabs)');

  const toggleFavorite = (id: string) => {
    setVeterinarios((prev) =>
      prev.map((vet) =>
        vet.id === id ? { ...vet, favorito: !vet.favorito } : vet
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consulta veterinária</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Veterinários disponíveis</Text>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {veterinarios.map((vet) => (
          <View key={vet.id} style={styles.card}>
            <Image source={vet.avatar} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{vet.nome}</Text>
              <Text style={styles.specialty}>{vet.especialidade}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={14} color="#354259" />
                <Text style={styles.rating}>{vet.avaliacao}</Text>
                <Ionicons name="location-outline" size={14} color="#717786" style={{ marginLeft: 8 }} />
                <Text style={styles.distance}>{vet.distancia}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(vet.id)}>
              <Ionicons
                name={vet.favorito ? 'star' : 'star-outline'}
                size={24}
                color={vet.favorito ? '#FFD700' : '#D9DFE6'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
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
  info: { 
    flex: 1 
  },
  name: { 
    fontWeight: '600', 
    fontSize: 15, 
    color: '#222' 
  },
  specialty: { 
    fontSize: 13, 
    color: '#717786', 
    marginBottom: 4 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 4 
  },
  rating: { 
    fontSize: 13, 
    color: '#354259', 
    marginLeft: 4 
  },
  distance: { 
    fontSize: 13, 
    color: '#717786', 
    marginLeft: 4 
  },
}); 