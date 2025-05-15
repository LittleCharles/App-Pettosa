// app/index.tsx - Home Screen com Carrossel de Pets
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { mockPets, Pet } from '../data/mockPets';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // Margem à esquerda e à direita

export default function HomeScreen() {
  const router = useRouter();
  const [activePetIndex, setActivePetIndex] = useState(0);
  const flatListRef = useRef(null);
  // Estado para favoritos dos veterinários
  const [vetFavorites, setVetFavorites] = useState({
    fernanda: true,
    rafael: false,
    camila: false,
  });
  
  const handlePetCardPress = (petId: string) => {
    // Navegar para a tela de perfil do pet com o ID correto
    router.push({
      pathname: '/pet/[id]',
      params: { id: petId }
    });
  };

  const renderPetCard = ({ item, index }: { item: Pet, index: number }) => (
    <TouchableOpacity 
      style={[styles.petCard, { width: CARD_WIDTH }]} 
      onPress={() => handlePetCardPress(item.id)}
    >
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petBreed}>{item.type} | {item.breed}</Text>
      </View>
      
      {/* Container para o avatar com efeito de círculos concêntricos */}
      <View style={styles.circlesContainer}>
        {/* Círculos concêntricos */}
        <View style={styles.avatarCircle3} />
        <View style={styles.avatarCircle2} />
        <View style={styles.avatarCircle1} />
        <Image source={item.avatar} style={styles.petPic} />
      </View>
    </TouchableOpacity>
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActivePetIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header com saudação e ícone de notificação */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Image 
              source={require('../../assets/images/ProfileAvatar.png')} 
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.greetingText}>Olá, Paula</Text>
              <Text style={styles.greetingSubText}>Bom dia!</Text>
            </View>
          </View>
            <TouchableOpacity onPress={() => router.push('/notification')}>
              <Ionicons name="notifications-outline" size={24} color="#354259" />
            </TouchableOpacity>
        </View>
        
        {/* Barra de pesquisa */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#717786" style={styles.searchIcon} />
          <TextInput 
            placeholder="Buscar serviços ou profissionais"
            style={styles.searchInput}
            placeholderTextColor="#717786"
          />
        </View>
        
        {/* Carrossel de pets */}
        <View style={styles.petCardContainer}>
          {/* Camadas de sombra */}
          <View style={styles.shadowLayer2} />
          <View style={styles.shadowLayer1} />
          
          {/* Carrossel de pets */}
          <FlatList
            ref={flatListRef}
            data={mockPets}
            renderItem={renderPetCard}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={styles.flatListContainer}
            onScroll={handleScroll}
          />
        </View>
        
        {/* Indicadores de slide */}
        <View style={styles.sliderIndicator}>
          {mockPets.map((pet, index) => (
            <View 
              key={pet.id} 
              style={[
                styles.indicator, 
                activePetIndex === index && styles.activeIndicator
              ]} 
            />
          ))}
        </View>
        
        {/* Seção de serviços com cards aprimorados */}
        <View style={styles.servicesContainer}>
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => router.push('/servicos/consulta')}
          >
            <Image 
              source={require('../../assets/images/Consulta.png')} 
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Consulta veterinária</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => router.push('/servicos/banho-tosa')}
          >
            <Image 
              source={require('../../assets/images/Banho.png')} 
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Banho e tosa</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => router.push('/servicos/cartao-vacinacao')}
          >
            <Image 
              source={require('../../assets/images/Cartao.png')} 
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Cartão de vacinação</Text>
          </TouchableOpacity>
        </View>
        
        {/* Veterinários próximos com cards aprimorados */}
        <Text style={styles.sectionTitle}>Veterinários perto de você</Text>
        
        <TouchableOpacity style={styles.vetCard}>
          <Image 
            source={require('../../assets/images/VetImage.png')} 
            style={styles.vetPic}
          />
          <View style={styles.vetInfo}>
            <View style={styles.vetNameContainer}>
              <Text style={styles.vetName}>Dra. Fernanda Alves</Text>
              <TouchableOpacity onPress={() => setVetFavorites(fav => ({ ...fav, fernanda: !fav.fernanda }))}>
                <Ionicons name={vetFavorites.fernanda ? 'star' : 'star-outline'} size={18} color={vetFavorites.fernanda ? '#FFD700' : '#717786'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.vetSpecialty}>Veterinária</Text>
            <View style={styles.vetRating}>
              <Ionicons name="star" size={14} color="#354259" />
              <Text style={styles.ratingText}>4.8</Text>
              <Ionicons name="location-outline" size={14} color="#717786" style={styles.locationIcon} />
              <Text style={styles.distanceText}>1 km</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.vetCard}>
          <Image 
            source={require('../../assets/images/VetImageMen.png')} 
            style={styles.vetPic}
          />
          <View style={styles.vetInfo}>
            <View style={styles.vetNameContainer}>
              <Text style={styles.vetName}>Dr. Rafael Rocha</Text>
              <TouchableOpacity onPress={() => setVetFavorites(fav => ({ ...fav, rafael: !fav.rafael }))}>
                <Ionicons name={vetFavorites.rafael ? 'star' : 'star-outline'} size={18} color={vetFavorites.rafael ? '#FFD700' : '#717786'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.vetSpecialty}>Veterinário</Text>
            <View style={styles.vetRating}>
              <Ionicons name="star" size={14} color="#354259" />
              <Text style={styles.ratingText}>4.8</Text>
              <Ionicons name="location-outline" size={14} color="#717786" style={styles.locationIcon} />
              <Text style={styles.distanceText}>1 km</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.vetCard}>
          <Image 
            source={require('../../assets/images/DrIsa.png')}
            style={styles.vetPic}
          />
          <View style={styles.vetInfo}>
            <View style={styles.vetNameContainer}>
              <Text style={styles.vetName}>Dra. Camila Souza</Text>
              <TouchableOpacity onPress={() => setVetFavorites(fav => ({ ...fav, camila: !fav.camila }))}>
                <Ionicons name={vetFavorites.camila ? 'star' : 'star-outline'} size={18} color={vetFavorites.camila ? '#FFD700' : '#717786'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.vetSpecialty}>Veterinária</Text>
            <View style={styles.vetRating}>
              <Ionicons name="star" size={14} color="#354259" />
              <Text style={styles.ratingText}>4.7</Text>
              <Ionicons name="location-outline" size={14} color="#717786" style={styles.locationIcon} />
              <Text style={styles.distanceText}>2 km</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Espaçamento adicional no final da ScrollView */}
        <View style={styles.scrollPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 32,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
  },
  greetingSubText: {
    fontSize: 14,
    color: '#717786',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  // Estilos para o carrossel de pets
  petCardContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 0,
  },
  petCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#354259',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 20,
    zIndex: 10,
    overflow: 'hidden', // Esconder partes dos círculos que saem do card
  },
  // Camadas de sombra refinadas
  shadowLayer1: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: -10,
    backgroundColor: '#CCE1F7',
    borderRadius: 16,
    zIndex: 0,
  },
  shadowLayer2: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: -18,
    backgroundColor: 'rgba(226, 233, 246, 0.6)',
    borderRadius: 16,
    zIndex: 0,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    color: '#ECEFF2',
  },
  // Círculos concêntricos para o avatar
  circlesContainer: {
    width: 70,
    height: 70,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 3,
  },
  avatarCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 2,
  },
  avatarCircle3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.075)',
    zIndex: 1,
  },
  petPic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  sliderIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E1E3E8',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#354259',
    width: 16,
  },
  // Resto dos estilos permanecem iguais...
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 2, // Para que a sombra não seja cortada
  },
  serviceCard: {
    width: '31%', 
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingBottom: 12, // Padding apenas na parte inferior
    paddingHorizontal: 0, // Sem padding horizontal
    paddingTop: 0, // Sem padding no topo
    
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    
    // Sombra para Android
    elevation: 3,
    
    // Borda sutil
    borderWidth: 0.5,
    borderColor: 'rgba(234, 236, 240, 0.7)',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#354259',
    fontWeight: '500',
    paddingHorizontal: 6, // Adicionando padding apenas ao texto
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#354259',
    marginBottom: 16,
  },
  // Veterinários com sombras aprimoradas
  vetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    
    // Sombra aprimorada para iOS
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 3 
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    
    // Sombra para Android
    elevation: 4,
    
    // Bordas sutis para complementar a sombra
    borderWidth: 0.5,
    borderColor: 'rgba(234, 236, 240, 0.8)',
  },
  vetPic: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  vetInfo: {
    flex: 1,
  },
  vetNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vetName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#354259',
  },
  vetSpecialty: {
    fontSize: 12,
    color: '#717786',
    marginBottom: 4,
  },
  vetRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#354259',
    marginLeft: 4,
    marginRight: 12,
  },
  locationIcon: {
    marginRight: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#717786',
  },
  scrollPadding: {
    height: 80, // Espaço para a tab bar
  },
});