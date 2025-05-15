import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  TextInput, 
  Modal,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Stack } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddPetScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Sobre');
  
  // Estados para o formulário
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

  // Adicione um estado para a data selecionada
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Referência para o ScrollView horizontal
  const tabScrollRef = useRef(null);
  
  // Array de tabs para facilitar o gerenciamento
  const tabs = ['Sobre', 'Consultas', 'Vacinas', 'Banho'];

  const handleGoBack = () => {
    router.back();
  };

  const formatBirthday = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return '';
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setBirthday(date.toISOString().split('T')[0]);
    }
  };

  const handleSave = () => {
    // Validar campos obrigatórios
    if (!name) {
      Alert.alert("Erro", "Por favor, digite o nome do pet");
      return;
    }

    // Aqui você implementaria a lógica para salvar o novo pet
    Alert.alert(
      'Pet cadastrado',
      'O novo pet foi cadastrado com sucesso!',
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  const handleEditPress = () => {
    Alert.alert("Editar", "Personalize os dados do seu pet");
  };

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
   
          <TouchableOpacity style={styles.newButtonContainer}>
            <Text style={styles.newButtonText}>novo</Text>
            <Ionicons name="chevron-down" size={16} color="#354259" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo Rolável */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                onPress={() => setActiveTab(tab)}
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
              <View style={styles.placeholderImageContainer}>
                <Ionicons name="image-outline" size={40} color="#CCCCCC" />
                <Ionicons name="add-circle" size={20} color="#CCCCCC" style={styles.addIcon} />
              </View>
            </View>
            <View style={styles.nameSection}>
              <View style={styles.nameRow}>
                <TextInput
                  style={styles.nameInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Digite o nome"
                />
                <TouchableOpacity onPress={handleEditPress} style={styles.editIconButton}>
                  <Ionicons name="pencil" size={18} color="#4A90E2" />
                </TouchableOpacity>
              </View>
              <View style={styles.typeBreedContainer}>
                <TextInput
                  style={styles.typeInput}
                  value={type}
                  onChangeText={setType}
                  placeholder="Espécie"
                />
                <Text style={styles.separator}> | </Text>
                <TextInput
                  style={styles.breedInput}
                  value={breed}
                  onChangeText={setBreed}
                  placeholder="Informe a raça"
                />
              </View>
            </View>
          </View>

          {/* Appearance section */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Aparência</Text>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Digite a descrição do seu pet aqui."
              multiline
              numberOfLines={3}
            />
            
            <TouchableOpacity 
              style={styles.detailRow}
              onPress={() => setGenderModalVisible(true)}
            >
              <Text style={styles.detailLabel}>Sexo</Text>
              <View style={styles.selectContainer}>
                <Text style={styles.selectText}>
                  {gender || "Selecione"}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="#354259" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.detailRow}
              onPress={() => setSizeModalVisible(true)}
            >
              <Text style={styles.detailLabel}>Tamanho</Text>
              <View style={styles.selectContainer}>
                <Text style={styles.selectText}>
                  {size || "Selecione"}
                </Text>
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
                  placeholder="Digite o peso"
                />
                <Text style={styles.weightUnit}>kg</Text>
              </View>
            </View>
          </View>

          {/* Dates section */}
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
                <Text style={styles.dateText}>
                  {birthday ? formatBirthday(birthday) : "Informe a data"}
                </Text>
              </View>
              <Text style={styles.dateValue}>---</Text>
            </TouchableOpacity>
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

          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>

          {/* Bottom space */}
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
        {Platform.OS === 'ios' ? (
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
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      if (date) {
                        setSelectedDate(date);
                        setBirthday(date.toISOString().split('T')[0]);
                      }
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
        ) : (
          dateModalVisible && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setDateModalVisible(false);
                if (date) {
                  setSelectedDate(date);
                  setBirthday(date.toISOString().split('T')[0]);
                }
              }}
            />
          )
        )}
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
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
  },
  newButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  newButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
    marginRight: 4,
  },
  // Tab navigation
  tabScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#F5F5F7',
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
  // Profile section
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  placeholderImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  nameSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 4,
  },
  typeBreedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeInput: {
    fontSize: 14,
    color: '#717786',
    flex: 1,
  },
  separator: {
    fontSize: 14,
    color: '#717786',
  },
  breedInput: {
    fontSize: 14,
    color: '#717786',
    flex: 1,
  },
  editIconButton: {
    padding: 8,
  },
  // Info sections
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 12,
  },
  descriptionInput: {
    fontSize: 14,
    color: '#717786',
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
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
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontSize: 14,
    color: '#354259',
    marginRight: 4,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightInput: {
    fontSize: 14,
    color: '#354259',
    textAlign: 'right',
    minWidth: 80,
  },
  weightUnit: {
    fontSize: 14,
    color: '#354259',
    marginLeft: 4,
  },
  // Date section
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
  dateText: {
    fontSize: 14,
    color: '#354259',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#354259',
  },
  // Tutor section
  tutorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 12,
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
  // Save button
  saveButton: {
    backgroundColor: '#344363',
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
  confirmDateButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmDateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});