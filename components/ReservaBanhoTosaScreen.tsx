import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Obter largura da tela para dimensionamento responsivo
const { width } = Dimensions.get('window');

// Mock de petshops (pode ser substituído por dados reais)
const petshops = [
  {
    id: '3',
    nome: 'Melhor Amigo',
    especialidade: 'Petshop',
    avatar: require('../assets/images/PataVida.png'),
    avaliacao: 4.6,
    avaliacoes: 230,
    phone: '(15) 2121-5454',
    email: 'contato@melhoramigo.com.br',
    endereco: 'Av Sorocaba, 1200',
    cidade: 'Sorocaba',
    estado: 'São Paulo',
    servicos: [
      { nome: 'Banho', preco: 30 },
      { nome: 'Tosa', preco: 35 },
      { nome: 'Remoção de pelos', preco: 20 },
    ],
  },
  // ... outros petshops
];

export default function ReservaBanhoTosaScreen() {
  const router = useRouter();
  const { petshopId } = useLocalSearchParams();
  const petshop = petshops.find(p => p.id === petshopId) || petshops[0];

  const handleGoBack = () => router.back();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: '#fff' }]}>Banho e tosa</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Imagem do Pet no topo com sobreposição */}
        <View style={styles.petImageContainer}>
          <Image 
            source={require('../assets/images/PerfilPet.png')} 
            style={styles.petImage}
            resizeMode="cover"
          />
          
          {/* Card principal sobreposto à imagem */}
          <View style={styles.overlayCardContainer}>
            <View style={styles.mainCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.petshopName}>{petshop.nome}</Text>
                  <Text style={styles.petshopType}>{petshop.especialidade}</Text>
                </View>
                
                {/* Ícone de tesoura */}
                <View style={styles.scissorsContainer}>
                  <Ionicons name="cut-outline" size={22} color="#354259" />
                </View>
              </View>
            </View>
            
            {/* Avaliações abaixo do card */}
            <View style={styles.ratingsContainer}>
              <View style={styles.leftRating}>
                <Text style={styles.ratingValue}>{petshop.avaliacao}</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4].map((_, index) => (
                    <Ionicons key={index} name="star" size={16} color="#FFD700" style={{marginHorizontal: 1}} />
                  ))}
                  <Ionicons name="star-outline" size={16} color="#FFD700" style={{marginHorizontal: 1}} />
                </View>
              </View>
              <Text style={styles.ratingCount}>{petshop.avaliacoes} avaliações</Text>
              
            </View>
          </View>
        </View>

    
        <View style={[styles.divider, { marginTop: 32 }]} />
 
        {/* Contato */}
        <View style={styles.infoSectionContact}>
    
          <Text style={styles.infoTitle}>Contato</Text>
          
          <View style={styles.collapsibleSection}>
            <View style={styles.contactRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Phone:</Text>
                <Text style={styles.contactValue}>{petshop.phone}</Text>
              </View>
              <TouchableOpacity style={styles.contactIconButton}>
                <Ionicons name="call-outline" size={20} color="#339CFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.contactRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Email:</Text>
                <Text style={styles.contactValue}>{petshop.email}</Text>
              </View>
              <TouchableOpacity style={styles.contactIconButton}>
                <Ionicons name="send" size={20} color="#339CFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Endereço */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Endereço</Text>
          
          <Text style={styles.infoText}>Endereço: {petshop.endereco}</Text>
          <Text style={styles.infoText}>Cidade: {petshop.cidade}</Text>
          <Text style={styles.infoText}>Estado: {petshop.estado}</Text>
          <Image source={require('../assets/images/Map.png')} style={styles.mapImage} />
        </View>
        
        <View style={styles.divider} />
        
        {/* Dia e horário */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Dia e horário</Text>
          
          <View style={styles.datesRow}>
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i, arr) => (
              <View
                key={i}
                style={[
                  styles.dayBox,
                  i === arr.length - 1 && styles.dayBoxLast
                ]}
              >
                <Text style={styles.dayText}>{d}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.timeText}>Horário: 10:00 - 11:00</Text>
        </View>
        
        <View style={styles.divider} />
        
        {/* Serviços */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Serviços</Text>
          {petshop.servicos.map((servico, idx) => (
            <View key={idx} style={styles.servicoCard}>
              <Text style={styles.servicoNome}>{servico.nome}</Text>
              <Text style={styles.servicoPreco}>R$ {servico.preco.toFixed(2)}</Text>
            </View>
          ))}
        </View>
        
        <View style={{ height: 120 }} />
      </ScrollView>
      
      {/* Botões fixos na parte inferior */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.reservarButton}
          onPress={() => router.push('/pet/agenda/agendamento')}
        >
          <Text style={styles.reservarButtonText}>Reservar a data</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  scrollContent: {
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  // Estilos para a imagem do pet e sobreposição
  petImageContainer: {
    width: '100%',
    height: 300,  // Altura aumentada para acomodar o card e as avaliações
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: 250,  // Altura da imagem em si
  },
  overlayCardContainer: {
    position: 'absolute',
    bottom: -28,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scissorsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petshopName: { 
    fontWeight: '600', 
    fontSize: 16, 
    color: '#222' 
  },
  petshopType: { 
    fontSize: 13, 
    color: '#717786', 
    marginBottom: 4 
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  leftRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 14,
    color: '#354259',
    fontWeight: '500',
    marginRight: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    fontSize: 13,
    color: '#717786',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginHorizontal: 20,
    marginVertical: 0,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 0,
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 0,
    shadowColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    marginTop: 8,
  },
  infoSectionContact: {
    backgroundColor: '#fff',
    borderRadius: 0,
    marginHorizontal: 20,
    paddingHorizontal: 0,
    shadowColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    marginTop: 8,
    paddingVertical: 16,
  },
  infoTitle: { 
    fontWeight: '600', 
    fontSize: 15, 
    color: '#354259', 
    marginBottom: 8, 
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collapsibleSection: {
    // Espaço para conteúdo colapsável
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 0,
  },
  contactLabel: {
    fontSize: 13,
    color: '#B0B0B0',
    marginBottom: 0,
  },
  contactValue: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    marginBottom: 2,
  },
  contactIconButton: {
    backgroundColor: '#FfFfFF',
    borderRadius: 12,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6, 
    marginLeft: 0 
  },
  infoText: { 
    fontSize: 14, 
    color: '#717786', 
    marginBottom: 2, 
    marginLeft: 0 
  },
  mapImage: { 
    width: '100%', 
    height: 140, 
    borderRadius: 10, 
    marginTop: 8, 
    resizeMode: 'contain' 
  },
  datesRow: { 
    flexDirection: 'row', 
    marginVertical: 8 
  },
  dayBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#D1E6FF80',
    borderWidth: 1,
    borderColor: '#D1E6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  dayText: { 
    fontSize: 15, 
    color: '#344363', 
    fontWeight: '600' 
  },
  timeText: { 
    fontSize: 15, 
    color: '#344363', 
    fontWeight: '600', 
    marginTop: 4 
  },
  servicoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  servicoNome: { 
    fontSize: 15, 
    color: '#354259', 
    fontWeight: '500' 
  },
  servicoPreco: { 
    fontSize: 15, 
    color: '#354259', 
    fontWeight: '700' 
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
  },
  reservarButton: {
    backgroundColor: '#354259',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  reservarButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  addServiceButton: {
    backgroundColor: 'transparent',
    width: '100%',
    padding: 12,
    alignItems: 'center',
  },
  addServiceButtonText: { 
    color: '#354259', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  dayBoxLast: {
    backgroundColor: '#F7FAFC',
    borderColor: '#ECEFF2',
  },
});