import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { mockPets, getPetById, Pet } from '../data/mockPets';

// Interface para eventos
interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  status: string;
  iconeTipo: any;
}

export default function AgendamentosScreen() {
  const router = useRouter();
  const { petId } = useLocalSearchParams();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petSelectorVisible, setPetSelectorVisible] = useState(false);

  // Converter petId para string se necessário
  const idParam = typeof petId === 'string' ? petId : Array.isArray(petId) ? petId[0] : '1';

  // Carregar o pet selecionado quando a tela é montada
  React.useEffect(() => {
    const pet = getPetById(idParam);
    if (pet) {
      setSelectedPet(pet);
    }
  }, [idParam]);

  // Navegação para a tela anterior
  const handleGoBack = () => {
    router.back();
  };

  // Navegar para a tela de detalhes do evento
  const handleEventoPress = (eventoId: string) => {
    router.push({
      pathname: '/pet/agenda/agendamento',
      params: { id: eventoId, petId: selectedPet?.id }
    });
  };

  // Alternar o pet selecionado
  const handlePetChange = () => {
    // Aqui você pode implementar a lógica para abrir um modal de seleção de pet
    // similar ao que já existe no ConsultasScreen
    console.log('Abrir seletor de pet');
  };

  const handlePetSelectorPress = () => {
    setPetSelectorVisible(true);
  };

  const handleSelectPet = (selectedPet: Pet) => {
    setPetSelectorVisible(false);
    router.push({
      pathname: '/agenda',
      params: { petId: selectedPet.id }
    });
  };

  const renderPetSelectorItem = ({ item }: { item: Pet }) => (
    <TouchableOpacity
      style={[
        styles.petSelectorItem,
        item.id === selectedPet?.id && styles.selectedPetItem
      ]}
      onPress={() => handleSelectPet(item)}
    >
      <Image source={item.avatar} style={styles.petSelectorAvatar} />
      <View style={styles.petSelectorInfo}>
        <Text style={styles.petSelectorName}>{item.name}</Text>
        <Text style={styles.petSelectorBreed}>{item.type} | {item.breed}</Text>
      </View>
      {item.id === selectedPet?.id && (
        <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  // Dados mockados de eventos
  const eventos: Evento[] = [
    {
      id: '1',
      titulo: 'Banho e Tosa',
      data: '15.05.25',
      horario: '14:00',
      status: 'Em aberto',
      iconeTipo: require('../../assets/images/PetShopBanho.png') // Substitua pelo caminho correto
    },
    {
      id: '2',
      titulo: 'Consulta Dr. Caio Oliveira',
      data: '15.05.25',
      horario: '16:30',
      status: 'Em aberto',
      iconeTipo: require('../../assets/images/DrCaio.png') // Substitua pelo caminho correto
    }
  ];

  // Renderizar cada item de evento
  const renderEventoItem = ({ item }: { item: Evento }) => (
    <TouchableOpacity 
      style={styles.eventoItem}
      onPress={() => handleEventoPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.eventoIconContainer}>
        {item.iconeTipo ? (
          <Image source={item.iconeTipo} style={styles.eventoIcon} />
        ) : (
          <View style={[styles.eventoIcon, { backgroundColor: '#FFD6A5' }]}>
            <Ionicons name="calendar" size={20} color="#FF9500" />
          </View>
        )}
      </View>
      <View style={styles.eventoInfo}>
        <Text style={styles.eventoTitulo}>{item.titulo}</Text>
        <View style={styles.dataContainer}>
          <Ionicons name="calendar-outline" size={14} color="#717786" />
          <Text style={styles.eventoData}>{item.data}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
        <View style={styles.statusBarGray}>
          <View style={styles.statusBarGrayFill} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#354259" />
            <Text style={styles.headerTitle}>Agendamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.petSelectorContainer}
            onPress={handlePetSelectorPress}
          >
            {selectedPet && (
              <>
                <Image
                  source={selectedPet.avatar}
                  style={styles.headerPetAvatar}
                />
                <Text style={styles.headerPetName}>{selectedPet.name}</Text>
                <Ionicons name="chevron-down" size={20} color="#354259" />
              </>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Próximos eventos</Text>
          
          {/* Lista de eventos */}
          {eventos.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum evento agendado.
            </Text>
          ) : (
            eventos.map((evento) => renderEventoItem({ item: evento }))
          )}
        </ScrollView>
      </SafeAreaView>

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
    paddingVertical: 6,
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
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#717786',
    marginTop: 24,
  },
  eventoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Sombra Android
    elevation: 2,
  },
  eventoIconContainer: {
    marginRight: 12,
  },
  eventoIcon: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE8D6', // Cor de fundo padrão
  },
  eventoInfo: {
    flex: 1,
  },
  eventoTitulo: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventoData: {
    fontSize: 13,
    color: '#717786',
    marginLeft: 4,
  },
  statusContainer: {
    alignItems: 'flex-end',
    minWidth: 90,
    justifyContent: 'center',
  },
  statusText: {
    fontWeight: '500',
    fontSize: 13,
    marginBottom: 4,
  },
  statusBarGray: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9DFE6',
    overflow: 'hidden',
  },
  statusBarGrayFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9DFE6',
    borderRadius: 2,
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
});