import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Exemplo de pets (ajuste os avatares conforme seu projeto)
const pets = [
  { id: '1', name: 'Thor', avatar: require('../assets/images/DogAvatar.png') },
  { id: '2', name: 'Luna', avatar: require('../assets/images/DogAvatar.png') },
  { id: '3', name: 'Mel', avatar: require('../assets/images/DogAvatar.png') },
];

const vacinas = [
  { id: '1', nome: 'V8', data: '10/01/2024', status: 'Em dia' },
  { id: '2', nome: 'Raiva', data: '15/02/2024', status: 'Em dia' },
  { id: '3', nome: 'Gripe', data: '10/03/2024', status: 'Pendente' },
];

export default function CartaoVacinacaoScreen() {
  const router = useRouter();
  const [petSelecionado, setPetSelecionado] = useState(pets[0]);
  const [petSelectorVisible, setPetSelectorVisible] = useState(false);
  const handleGoBack = () => router.back();     

  // Abre o modal de seleção de pet
  const handlePetSelectorPress = () => {
    setPetSelectorVisible(true);
  };

  // Seleciona um pet no modal
  const handleSelectPet = (pet: typeof pets[0]) => {
    setPetSelecionado(pet);
    setPetSelectorVisible(false);
  };

  // Renderiza item do seletor de pets
  const renderPetSelectorItem = ({ item }: { item: typeof pets[0] }) => (
    <TouchableOpacity 
      style={[styles.petSelectorItem, item.id === petSelecionado.id && styles.selectedPetItem]} 
      onPress={() => handleSelectPet(item)}
    >
      <Image source={item.avatar} style={styles.petSelectorAvatar} />
      <View style={styles.petSelectorInfo}>
        <Text style={styles.petSelectorName}>{item.name}</Text>
      </View>
      {item.id === petSelecionado.id && (
        <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header igual ao perfil do pet */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#354259" />
          <Text style={styles.headerTitle}>Cartão de vacinação</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.petSelectorContainer}
          onPress={handlePetSelectorPress}
        >
          <Image
            source={petSelecionado.avatar}
            style={styles.headerPetAvatar}
          />
          <Text style={styles.headerPetName}>{petSelecionado.name}</Text>
          <Ionicons name="chevron-down" size={20} color="#354259" />
        </TouchableOpacity>
      </View>

      {/* Modal para seleção de pet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={petSelectorVisible}
        onRequestClose={() => setPetSelectorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione um pet</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setPetSelectorVisible(false)}
              >
                <Ionicons name="close" size={24} color="#354259" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={pets}
              renderItem={renderPetSelectorItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.petSelectorList}
            />
          </View>
        </View>
      </Modal>

      <Text style={styles.sectionTitle}>Vacinas de {petSelecionado.name}</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {vacinas.map((vacina) => (
          <View key={vacina.id} style={styles.card}>
            <Text style={styles.vacinaNome}>{vacina.nome}</Text>
            <Text style={styles.vacinaData}>Data: {vacina.data}</Text>
            <Text style={[
              styles.vacinaStatus,
              vacina.status === 'Em dia' ? styles.statusOk : styles.statusPendente
            ]}>
              {vacina.status}
            </Text>
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
    paddingVertical: 12,
    marginTop: 36,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  backButton: {
    padding: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
  },
  petSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerPetAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 4,
  },
  headerPetName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
    marginRight: 4,
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
  vacinaNome: { fontWeight: '600', fontSize: 15, color: '#222' },
  vacinaData: { fontSize: 13, color: '#717786', marginBottom: 4 },
  vacinaStatus: { fontSize: 13, marginTop: 4 },
  statusOk: { color: '#2ecc71' },
  statusPendente: { color: '#e67e22' },
  // Modal styles reaproveitados do perfil do pet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#354259',
  },
  closeButton: {
    padding: 4,
  },
  petSelectorList: {
    paddingBottom: 16,
  },
  petSelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F5F5F7',
  },
  selectedPetItem: {
    backgroundColor: '#E1E9FF',
  },
  petSelectorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  petSelectorInfo: {
    flex: 1,
  },
  petSelectorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 4,
  },
}); 