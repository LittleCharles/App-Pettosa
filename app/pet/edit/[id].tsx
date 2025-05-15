import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  TextInput,
  ActivityIndicator,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { mockPets, getPetById, Pet } from '../../data/mockPets';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditPetScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const idParam = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '1';
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para edição
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  
  // Estados para modais de seleção
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  
  // Opções para os selects
  const sizeOptions = ['Pequeno', 'Médio', 'Grande'];
  const genderOptions = ['Macho', 'Fêmea'];

  // Tabs (mantidos para consistência visual)
  const tabs = ['Sobre', 'Consultas', 'Vacinas', 'Banho'];
  const [activeTab, setActiveTab] = useState('Sobre');
  const tabScrollRef = useRef(null);

  // Adicione um estado para a data selecionada
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Carregar dados do pet selecionado
  useEffect(() => {
    const loadPet = async () => {
      setIsLoading(true);
      const currentPet = getPetById(idParam);
      
      if (currentPet) {
        setPet(currentPet);
        
        // Preencher estados com dados existentes
        setName(currentPet.name);
        setType(currentPet.type);
        setBreed(currentPet.breed);
        setDescription(currentPet.description);
        setGender(currentPet.gender);
        setSize(currentPet.size);
        setWeight(currentPet.weight);
        setBirthday(currentPet.birthday);
      }
      
      setIsLoading(false);
    };
    
    loadPet();
  }, [idParam]);

  const handleGoBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    // Por exemplo, uma chamada API para atualizar o pet no backend
    
    Alert.alert(
      "Alterações salvas",
      "As informações do pet foram atualizadas com sucesso!",
      [
        { text: "OK", onPress: () => router.back() }
      ]
    );
  };

  const formatBirthday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Se não houver dados do pet, mostrar uma tela de carregamento
  if (isLoading || !pet) {
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

        {/* Header Fixo - Mesmo da tela original */}
        <View style={styles.headerFixed}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#354259" />
            <Text style={styles.headerTitle}>Editar pet</Text>
          </TouchableOpacity>
   
          <View style={styles.petSelectorContainer}>
            <Image
              source={pet.avatar}
              style={styles.headerPetAvatar}
            />
            <Text style={styles.headerPetName}>{name}</Text>
          </View>
        </View>

        {/* Conteúdo Rolável */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Tab navigation mantida igual visualmente */}
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
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pet profile main info - Agora com campos editáveis */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={pet.avatar}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editPhotoButton}>
                <Ionicons name="camera" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.nameSection}>
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Digite o nome"
              />
              <View style={styles.typeBreedContainer}>
                <TextInput
                  style={styles.typeInput}
                  value={type}
                  onChangeText={setType}
                  placeholder="Tipo"
                />
                <Text style={styles.separator}> | </Text>
                <TextInput
                  style={styles.breedInput}
                  value={breed}
                  onChangeText={setBreed}
                  placeholder="Raça"
                />
              </View>
            </View>
          </View>

          {/* Appearance section - Campos editáveis */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Aparência</Text>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Digite a descrição do seu pet aqui"
              multiline
              numberOfLines={3}
            />
            
            <TouchableOpacity 
              style={styles.detailRow}
              onPress={() => setGenderModalVisible(true)}
            >
              <Text style={styles.detailLabel}>Sexo</Text>
              <View style={styles.selectContainer}>
                <Text style={styles.detailValue}>{gender}</Text>
                <Ionicons name="chevron-forward" size={18} color="#354259" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.detailRow}
              onPress={() => setSizeModalVisible(true)}
            >
              <Text style={styles.detailLabel}>Tamanho</Text>
              <View style={styles.selectContainer}>
                <Text style={styles.detailValue}>{size}</Text>
                <Ionicons name="chevron-forward" size={18} color="#354259" />
              </View>
            </TouchableOpacity>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Peso</Text>
              <View style={styles.weightContainer}>
                <TextInput
                  style={styles.weightInput}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="0.0"
                />
                <Text style={styles.weightUnit}>kg</Text>
              </View>
            </View>
          </View>

          {/* Dates section - Campo de data editável */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Registro de datas</Text>
            
            <TouchableOpacity 
              style={styles.dateCard}
              onPress={() => setDateModalVisible(true)}
            >
              <View style={styles.dateIconContainer}>
                <Ionicons name="calendar-outline" size={24} color="#4A90E2" />
              </View>
              <View style={styles.dateDetails}>
                <Text style={styles.dateType}>Aniversário</Text>
                <View style={styles.selectContainer}>
                  <Text style={styles.dateValue}>{formatBirthday(birthday)}</Text>
                </View>
              </View>
              <Text style={styles.ageValue}>{pet.age}</Text>
            </TouchableOpacity>
          </View>

        
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Tutor</Text>
            
            <View style={styles.tutorContainer}>
              <Image
                source={require('../../../assets/images/ProfileAvatar.png')}
                style={styles.tutorImage}
              />
              <View style={styles.tutorDetails}>
                <Text style={styles.tutorName}>Paula Carvalho</Text>
                <Text style={styles.tutorEmail}>paula.carvalho@gmail.com</Text>
              </View>
            </View>
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          <View style={styles.bottomPadding} />
        </ScrollView>
        
        {/* Modal para selecionar Tamanho */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={sizeModalVisible}
          onRequestClose={() => setSizeModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecione o tamanho</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSizeModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#354259" />
                </TouchableOpacity>
              </View>
              
              {sizeOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionItem, size === option && styles.selectedOption]}
                  onPress={() => {
                    setSize(option);
                    setSizeModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {size === option && (
                    <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
        
        {/* Modal para selecionar Sexo */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={genderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Selecione o sexo</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setGenderModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#354259" />
                </TouchableOpacity>
              </View>
              
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionItem, gender === option && styles.selectedOption]}
                  onPress={() => {
                    setGender(option);
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {gender === option && (
                    <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
        
        {/* Modal para selecionar Data de Aniversário */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={dateModalVisible}
          onRequestClose={() => setDateModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Data de Aniversário</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setDateModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#354259" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.datePickerContainer}>
                {/* DatePicker nativo */}
                <DateTimePicker
                  value={selectedDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date: Date | undefined) => {
                    if (date) setSelectedDate(date);
                  }}
                  style={{ width: '100%' }}
                />
                <TouchableOpacity
                  style={styles.confirmDateButton}
                  onPress={() => setDateModalVisible(false)}
                >
                  <Text style={styles.confirmDateButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
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
    position: 'relative',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editPhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4A90E2',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameSection: {
    flex: 1,
  },
  nameInput: {
    width: "50%",
    fontSize: 20,
    fontWeight: 'bold',
    color: '#354259',
    marginBottom: 4,
    padding: 0,
  },
  typeBreedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeInput: {
    width: "50%",
    fontSize: 14,
    color: '#717786',
    flex: 1,
    padding: 0,
  },
  separator: {
    fontSize: 14,
    color: '#717786',
  },
  breedInput: {
    fontSize: 14,
    color: '#717786',
    flex: 1,
    padding: 0,
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
  descriptionInput: {
    fontSize: 14,
    color: '#717786',
    lineHeight: 20,
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
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
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightInput: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
    minWidth: 50,
    padding: 0,
  },
  weightUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
    marginLeft: 4,
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
    backgroundColor: '#E8F1FD',
    borderRadius: 20,
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
  saveButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    margin: 20,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
  // Estilos para modais
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
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F5F5F7',
  },
  selectedOption: {
    backgroundColor: '#E1E9FF',
  },
  optionText: {
    fontSize: 16,
    color: '#354259',
  },
  datePickerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  datePickerPlaceholder: {
    fontSize: 16,
    color: '#717786',
    marginBottom: 20,
  },
  confirmDateButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  confirmDateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});