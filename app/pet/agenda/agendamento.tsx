import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Agendamento() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(4); // índice para o dia 14
  const [selectedTime, setSelectedTime] = useState(2); // índice para 11:00
  const [services, setServices] = useState([
    { id: 1, name: 'Banho', price: 30.00, selected: true },
    { id: 2, name: 'Tosa', price: 20.00, selected: true },
    { id: 3, name: 'Remoção de pelos', price: 20.00, selected: false },
  ]);
  const [observation, setObservation] = useState('');

  // Dados de exemplo para o petshop
  const petshop = {
    name: 'Melhor Amigo',
    address: 'Av. Sorocabana 1.200',
    city: 'Sorocaba',
    rating: 4.6,
    reviews: 230
  };

  // Dias da semana para seleção
  const weekDays = [
    { day: 'Seg', date: 12 },
    { day: 'Ter', date: 13 },
    { day: 'Qua', date: 14 },
    { day: 'Qui', date: 15 },
    { day: 'Sex', date: 16 },
    { day: 'Sab', date: 17 },
    { day: 'Dom', date: 18 },
    { day: 'Seg', date: 19 },
    { day: 'Ter', date: 20 },
    { day: 'Qua', date: 21 },
    { day: 'Qui', date: 22 },
    { day: 'Sex', date: 23 },
    { day: 'Sab', date: 24 },
    { day: 'Dom', date: 25 },
  ];

  // Horários disponíveis
  const availableTimes = [
    '08:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];

  // Função para alternar a seleção de um serviço
  const toggleService = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, selected: !service.selected } 
        : service
    ));
  };

  // Função para calcular o total
  const calculateTotal = () => {
    return services
      .filter(service => service.selected)
      .reduce((sum, service) => sum + service.price, 0);
  };

  const handleGoBack = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#354259" />
          <Text style={styles.headerTitle}>Banho e tosa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.petSelectorContainer}>
          <Image
            source={require('../../../assets/images/DogAvatar.png')}
            style={styles.headerPetAvatar}
          />
          <Text style={styles.headerPetName}>Billy</Text>
          <Ionicons name="chevron-down" size={20} color="#354259" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Petshop Card */}
        <View style={styles.petshopCard}>
          <Text style={styles.petshopName}>{petshop.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#717786" />
            <Text style={styles.petshopAddress}>
              {petshop.address}
            </Text>
          </View>
          <Text style={styles.petshopCity}>{petshop.city}</Text>
          
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>{petshop.rating}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4].map((_, index) => (
                <Ionicons key={index} name="star" size={14} color="#FFD700" />
              ))}
              <Ionicons name="star-outline" size={14} color="#FFD700" />
            </View>
            <Text style={styles.reviewsText}>{petshop.reviews} avaliações</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.dateHeader}>Segunda, 14 de Março</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysContainer}
          >
            {weekDays.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.dayItem,
                  selectedDate === index && styles.selectedDayItem
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text 
                  style={[
                    styles.dayText,
                    selectedDate === index && styles.selectedDayText
                  ]}
                >
                  {item.date}
                </Text>
                <Text 
                  style={[
                    styles.weekdayText,
                    selectedDate === index && styles.selectedDayText
                  ]}
                >
                  {item.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Horário</Text>
          <View style={styles.timeGrid}>
            {availableTimes.map((time, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.timeItem,
                  selectedTime === index && styles.selectedTimeItem
                ]}
                onPress={() => setSelectedTime(index)}
              >
                <Text 
                  style={[
                    styles.timeText,
                    selectedTime === index && styles.selectedTimeText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Serviços</Text>
          {services.map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={styles.serviceItem}
              onPress={() => toggleService(service.id)}
            >
              <View style={styles.checkboxContainer}>
                <View 
                  style={[
                    styles.checkbox,
                    service.selected && styles.checkboxSelected
                  ]}
                >
                  {service.selected && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </View>
              <Text style={styles.servicePrice}>R$ {service.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
          
          <Text style={styles.paymentNote}>
            O pagamento será realizado no local
          </Text>
        </View>

        {/* Observation field */}
        <View style={styles.sectionContainer}>
          <Text style={styles.obsTitle}>Adicionar Observação</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.observationInput}
              placeholder="Digite aqui sua observação..."
              value={observation}
              onChangeText={setObservation}
              multiline
              placeholderTextColor="#C0C0C0"
              textAlignVertical="top"
            />
            <Text style={styles.charCounter}>0/250</Text>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.agendarButton}
          onPress={() => {
            // Aqui você pode colocar a lógica de agendamento
            alert('Agendamento realizado!');
          }}
        >
          <Text style={styles.agendarButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginLeft: 8,
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
  scrollView: {
    flex: 1,
  },
  petshopCard: {
    backgroundColor: '#344363',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  petshopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  petshopAddress: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
    opacity: 0.8,
  },
  petshopCity: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 16,
  },
  daysContainer: {
    paddingRight: 16,
  },
  dayItem: {
    width: 50,
    height: 66,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEFF2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedDayItem: {
    backgroundColor: '#D1E6FF80',
    borderColor: '#D1E6FF',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  weekdayText: {
    fontSize: 13,
    color: '#717786',
    marginTop: 4,
  },
  selectedDayText: {
    color: '#1B85F3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 16,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '23%',
    height: 40,
    backgroundColor: '#Ffffff',
    borderWidth: 1,
    borderColor: '#ECEFF2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedTimeItem: {
    backgroundColor: '#344363',
  },
  timeText: {
    fontSize: 14,
    color: '#222',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Sombra iOS
    shadowColor: '#8B9EB8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Sombra Android
    elevation: 3,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D9DFE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#1B85F3',
    borderColor: '#1B85F3',
  },
  serviceName: {
    fontSize: 16,
    color: '#222',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  paymentNote: {
    fontSize: 14,
    color: '#717786',
    marginTop: 16,
  },
  obsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    marginBottom: 12,
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#E1E3E8',
    borderRadius: 8,
    padding: 12,
    position: 'relative',
  },
  observationInput: {
    fontSize: 14,
    color: '#222',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCounter: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    fontSize: 12,
    color: '#C0C0C0',
  },
  bottomPadding: {
    height: 80,
  },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
    alignItems: 'center',
    zIndex: 10,
  },
  agendarButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  agendarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});