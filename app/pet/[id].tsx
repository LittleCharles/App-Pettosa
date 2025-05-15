// app/pet/[id].tsx - PetProfileScreen com Modal de Seleção de Pets
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { mockPets, getPetById, Pet } from '../data/mockPets';

export default function PetProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Sobre');
  const [pet, setPet] = useState<Pet | null>(null);
  const [petSelectorVisible, setPetSelectorVisible] = useState(false);
  const [activePetIndex, setActivePetIndex] = useState(0);
  
  // Ref para o ScrollView dos tabs
  const tabScrollRef = useRef(null);
  
  // Array de tabs para facilitar o gerenciamento
  const tabs = ['Sobre', 'Consultas', 'Vacinas', 'Banho'];

  // Corrigir o erro de TypeScript convertendo id para o tipo esperado
  const idParam = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '1';

  // Carregar dados do pet selecionado
  useEffect(() => {
    const currentPet = getPetById(idParam);
    if (currentPet) {
      setPet(currentPet);
    }
  }, [idParam]);

  const handleGoBack = () => {
    router.push('/(tabs)');
  };

  const handleEditPress = () => {
    router.push({
      pathname: '/pet/edit/[id]',
      params: { id: idParam }
    });
  };

  // Função para mostrar o seletor de pets
  const handlePetSelectorPress = () => {
    setPetSelectorVisible(true);
  };

  // Função para selecionar um pet
  const handleSelectPet = (selectedPet: Pet) => {
    setPetSelectorVisible(false);
    router.push({
      pathname: '/pet/[id]',
      params: { id: selectedPet.id }
    });
  };

  // Renderizar item do seletor de pets
  const renderPetSelectorItem = ({ item }: { item: Pet }) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.petSelectorItem, item.id === idParam && styles.selectedPetItem]} 
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

  const handleTabPress = (tabName: typeof tabs[number]) => {
    if (tabName === 'Consultas') {
      router.push({
        pathname: '/pet/consultas/[petId]',
        params: { petId: idParam }
      });
    } else if (tabName === 'Vacinas') {
      router.push({
        pathname: '/pet/Vacinas/[petId]',
        params: { petId: idParam }
      });
    } else if (tabName === 'Banho') {
      router.push({
        pathname: '/pet/banho/[petId]',
        params: { petId: idParam }
      });
    } else {
      setActiveTab(tabName);
    }
  };

  // Se não houver dados do pet, mostrar uma tela de carregamento
  if (!pet) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#354259" />
        <Text style={styles.loadingText}>Carregando informações do pet...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {/* Header Fixo */}
        <View style={styles.headerFixed}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#354259" />
            <Text style={styles.headerTitle}>Perfil do pet</Text>
          </TouchableOpacity>
   
          <TouchableOpacity 
            style={styles.petSelectorContainer}
            onPress={handlePetSelectorPress}
          >
            <Image
              source={pet.avatar}
              style={styles.headerPetAvatar}
            />
            <Text style={styles.headerPetName}>{pet.name}</Text>
            <Ionicons name="chevron-down" size={20} color="#354259" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo Rolável */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Tab navigation com ScrollView horizontal */}
          <ScrollView
            ref={tabScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => handleTabPress(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pet profile main info */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={pet.avatar}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petBreed}>{pet.type} | {pet.breed}</Text>
            </View>
            <TouchableOpacity style={styles.editIconButton} onPress={handleEditPress}>
              <Image
                source={require('../../assets/images/EditButton.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Appearance section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Aparência</Text>
            <Text style={styles.sectionDescription}>
              {pet.description}
            </Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sexo</Text>
              <Text style={styles.detailValue}>{pet.gender}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tamanho</Text>
              <Text style={styles.detailValue}>{pet.size}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Peso</Text>
              <Text style={styles.detailValue}>{pet.weight} kg</Text>
            </View>
          </View>

          {/* Dates section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Registro de datas</Text>
            
            <View style={styles.dateCard}>
              <View style={styles.dateIconContainer}>
                <Image source={require('../../assets/images/Date.png')} />
              </View>
              <View style={styles.dateDetails}>
                <Text style={styles.dateType}>Aniversário</Text>
                <Text style={styles.dateValue}>
                  {new Date(pet.birthday).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>
              </View>
              <Text style={styles.ageValue}>{pet.age}</Text>
            </View>
          </View>

          {/* Tutor section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Tutor</Text>
            
            <View style={styles.tutorContainer}>
              <Image
                source={require('../../assets/images/ProfileAvatar.png')}
                style={styles.tutorImage}
              />
              <View style={styles.tutorDetails}>
                <Text style={styles.tutorName}>Paula Carvalho</Text>
                <Text style={styles.tutorEmail}>paula.carvalho@gmail.com</Text>
              </View>
            </View>
          </View>

          {/* Edit button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          {/* Bottom space */}
          <View style={styles.bottomPadding} />
        </ScrollView>
        
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
              
              <TouchableOpacity 
                style={styles.addPetButton}
                onPress={() => {
                  setPetSelectorVisible(false);
                  router.push('/pet/add');
                }}
              >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.addPetButtonText}>Adicionar novo pet</Text>
              </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#354259',
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
  // Container para ScrollView horizontal dos tabs
  tabScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  tab: {
    width: 100,
    height: 41,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 16,
    backgroundColor: '#ECEFF2',
    borderWidth: 1,
    borderColor: '#D9DFE6',
    color: '#838383',
  },
  activeTab: {
    backgroundColor: '#344363',
  },
  tabText: {
    fontSize: 14,
    color: '#717786',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  nameSection: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#354259',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    color: '#717786',
  },
  editIconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#717786',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#717786',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    padding: 12,
  },
  dateIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateDetails: {
    flex: 1,
  },
  dateType: {
    fontSize: 14,
    color: '#717786',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
  },
  ageValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
  },
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tutorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tutorDetails: {
    flex: 1,
  },
  tutorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
  },
  tutorEmail: {
    fontSize: 12,
    color: '#717786',
  },
  editButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    margin: 20,
    padding: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
  // Estilos para o modal de seleção de pets
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
  petSelectorBreed: {
    fontSize: 14,
    color: '#717786',
  },
  addPetButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginTop: 8,
  },
  addPetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sliderIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9DFE6',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#354259',
  },
});