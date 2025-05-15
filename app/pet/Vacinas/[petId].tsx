import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { mockPets, getPetById, Pet } from '../../data/mockPets';

interface Vacina {
  id: string;
  petId: string;
  nome: string;
  veterinario: string;
  avatar: any;
  data: string;
  status: string;
  statusColor: string;
}

export default function VacinasScreen() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [petSelectorVisible, setPetSelectorVisible] = useState(false);
  const [expandedVacinaId, setExpandedVacinaId] = useState<string | null>(null);

  const idParam = typeof petId === 'string' ? petId : Array.isArray(petId) ? petId[0] : '1';

  useEffect(() => {
    const currentPet = getPetById(idParam);
    if (currentPet) setPet(currentPet);
  }, [idParam]);

  const handleGoBack = () => {
    router.push({
      pathname: '/pet/[id]',
      params: { id: idParam }
    });
  };
  const handlePetSelectorPress = () => setPetSelectorVisible(true);
  const handleSelectPet = (selectedPet: Pet) => {
    setPetSelectorVisible(false);
    router.push({
      pathname: '/pet/Vacinas/[petId]',
      params: { petId: selectedPet.id }
    });
  };

  const renderPetSelectorItem = ({ item }: { item: Pet }) => (
    <TouchableOpacity
      style={[
        styles.petSelectorItem,
        item.id === idParam && styles.selectedPetItem
      ]}
      onPress={() => handleSelectPet(item)}
    >
      <Image source={item.avatar} style={styles.petSelectorAvatar} />
      <View style={styles.petSelectorInfo}>
        <Text style={styles.petSelectorName}>{item.name}</Text>
        <Text style={styles.petSelectorBreed}>{item.type} | {item.breed}</Text>
      </View>
      {item.id === idParam && (
        <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  // Mock de vacinas
  const vacinas: Vacina[] = [
    {
      id: '1',
      petId: '1',
      nome: 'V10',
      veterinario: 'Dr. José Silveira',
      avatar: require('../../../assets/images/VetImageM.png'),
      data: '10.04.25',
      status: 'Concluído',
      statusColor: '#27AE60'
    },
    {
      id: '2',
      petId: '1',
      nome: 'Antirrábica',
      veterinario: 'Dr. José Silveira',
      avatar: require('../../../assets/images/VetImageM.png'),
      data: '10.03.25',
      status: 'Concluído',
      statusColor: '#27AE60'
    }
  ];

  const vacinasFiltradas = vacinas.filter(v => v.petId === idParam);

  if (!pet) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#354259" />
        <Text style={styles.loadingText}>Carregando informações do pet...</Text>
      </SafeAreaView>
    );
  }

  const renderVacinaItem = ({ item }: { item: Vacina }) => {
    const isExpanded = expandedVacinaId === item.id;
    return (
      <View style={styles.consultaItem}>
        <TouchableOpacity
          onPress={() => setExpandedVacinaId(isExpanded ? null : item.id)}
          activeOpacity={0.8}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image source={item.avatar} style={styles.vetAvatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.vetName}>{item.nome}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Ionicons name="calendar-outline" size={14} color="#717786" />
              <Text style={styles.consultaData}>{item.data}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', minWidth: 90 }}>
            <Text style={[styles.statusText]}>{item.status}</Text>
            <View style={[styles.statusBar, { backgroundColor: item.statusColor }]} />
          </View>
        </TouchableOpacity>
        {/* Se quiser expandir detalhes da vacina, coloque aqui */}
        {isExpanded && (
          <View style={{ alignItems: 'center', marginTop: 12, width: '100%' }}>
            <Image 
              source={require('../../../assets/images/VacinasDetalhes.png')} 
              style={styles.vacinaDetalheImage} 
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#354259" />
            <Text style={styles.headerTitle}>Vacinas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.petSelectorContainer}
            onPress={handlePetSelectorPress}
          >
            <Image source={pet.avatar} style={styles.headerPetAvatar} />
            <Text style={styles.headerPetName}>{pet.name}</Text>
            <Ionicons name="chevron-down" size={20} color="#354259" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Histórico de vacinas</Text>
          {vacinasFiltradas.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#717786', marginTop: 24 }}>
              Nenhuma vacina encontrada para este pet.
            </Text>
          ) : (
            vacinasFiltradas.map((vacina) => renderVacinaItem({ item: vacina }))
          )}
        </ScrollView>
        {/* Tab Bar igual à de consultas */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}> 
            <Ionicons name="home-outline" size={24} color="#717786" />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="calendar-outline" size={24} color="#717786" />
            <Text style={styles.tabText}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="star-outline" size={24} color="#717786" />
            <Text style={styles.tabText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={24} color="#717786" />
            <Text style={styles.tabText}>Perfil</Text>
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
                data={mockPets}
                renderItem={renderPetSelectorItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.petSelectorList}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 36,
    },
    backButton: {
      padding: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
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
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#354259',
      marginBottom: 16,
    },
    consultasList: {
      marginBottom: 20,
    },
    consultaItem: {
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      // Sombra iOS
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      // Sombra Android
      elevation: 2,
    },
    vetAvatar: {
      width: 56,
      height: 56,
      borderRadius: 12,
    },
    vetName: {
      fontWeight: '600',
      fontSize: 15,
      color: '#222',
    },
    consultaData: {
      fontSize: 13,
      color: '#717786',
      marginLeft: 4,
    },
    statusText: {
      fontWeight: '500',
      fontSize: 13,
      marginBottom: 4,
    },
    statusBar: {
      width: 60,
      height: 4,
      borderRadius: 2,
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
    },
    tabItem: {
      alignItems: 'center',
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
      color: '#717786',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#354259',
    },
    closeButton: {
      padding: 4,
    },
    petSelectorList: {
      padding: 16,
    },
    petSelectorItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 8,
      marginBottom: 8,
    },
    selectedPetItem: {
      backgroundColor: '#F0F0F0',
    },
    petSelectorAvatar: {
      width: 48,
      height: 48,
      borderRadius: 8,
      marginRight: 12,
    },
    petSelectorInfo: {
      flex: 1,
    },
    petSelectorName: {
      fontWeight: '600',
      fontSize: 15,
      color: '#222',
    },
    petSelectorBreed: {
      fontSize: 13,
      color: '#717786',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#354259',
      marginTop: 16,
    },
    vacinaDetalheImage: {
      width: '100%',
      height: 340,
      borderRadius: 12,
      resizeMode: 'contain',
    },
  });