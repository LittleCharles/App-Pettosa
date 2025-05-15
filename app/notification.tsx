import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Interface para agrupar notificações por data
interface NotificationGroup {
  date: string;
  notifications: {
    id: string;
    message: string;
    type: 'purchase' | 'reservation' | 'vaccine';
  }[];
}

export default function NotificationScreen() {
  const router = useRouter();

  // Dados agrupados por data como na imagem de referência
  const notificationGroups: NotificationGroup[] = [
    {
      date: 'Hoje',
      notifications: [
        {
          id: '1',
          message: 'Compra de banho realizada com sucesso',
          type: 'purchase',
        },
        {
          id: '2',
          message: 'Banho reservado com sucesso',
          type: 'reservation',
        },
      ],
    },
    {
      date: '29 de Abril',
      notifications: [
        {
          id: '3',
          message: 'Compra de banho realizada com sucesso',
          type: 'purchase',
        },
        {
          id: '4',
          message: 'Banho reservado com sucesso',
          type: 'reservation',
        },
        {
          id: '5',
          message: 'Agendamento da vacina realizado com sucesso',
          type: 'vaccine',
        },
      ],
    },
    {
      date: '16 de março',
      notifications: [
        {
          id: '6',
          message: 'Compra de banho realizada com sucesso',
          type: 'purchase',
        },
        {
          id: '7',
          message: 'Banho reservado com sucesso',
          type: 'reservation',
        },
        {
          id: '8',
          message: 'Agendamento da vacina realizado com sucesso',
          type: 'vaccine',
        },
      ],
    },
    {
      date: '20 de fevereiro',
      notifications: [
        {
          id: '9',
          message: 'Compra de banho realizada com sucesso',
          type: 'purchase',
        },
        {
          id: '10',
          message: 'Banho reservado com sucesso',
          type: 'reservation',
        },
      ],
    },
  ];

  // Função para renderizar o ícone apropriado baseado no tipo
  const getNotificationIcon = (type: string) => {
    // Escolhe o ícone correto mas mantém o mesmo estilo para todos
    let iconName = 'notifications-outline';
    
    switch (type) {
      case 'purchase':
        iconName = 'document-text-outline';
        break;
      case 'reservation':
        iconName = 'checkmark';
        break;
      case 'vaccine':
        iconName = 'heart';
        break;
    }
    
    return (
      <View style={styles.iconContainer}>
        <Ionicons name={iconName as any} size={20} color="#344363" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - mantido conforme indicado pelo usuário */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Conteúdo principal - ajustado para se parecer com a imagem */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notificationGroups.map((group) => (
          <View key={group.date} style={styles.groupContainer}>
            <Text style={styles.dateHeader}>{group.date}</Text>
            <View style={styles.notificationsCard}>
              {group.notifications.map((notification, index) => (
                <View 
                  key={notification.id} 
                  style={[
                    styles.notificationItem
                  ]}
                >
                  {getNotificationIcon(notification.type)}
                  <Text style={styles.notificationText}>{notification.message}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={22} color="#717786" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Ionicons name="calendar-outline" size={22} color="#717786" />
          <Text style={styles.tabText}>Agenda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="star-outline" size={22} color="#717786" />
          <Text style={styles.tabText}>Favoritos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/perfil')}>
          <Ionicons name="person-outline" size={22} color="#717786" />
          <Text style={styles.tabText}>Perfil</Text>
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
  // Header styles mantidos do código original
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
    flex: 1,
    textAlign: 'center',
  },
  // Novos estilos ajustados para a imagem de referência
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 70, // Espaço para a barra de navegação
  },
  groupContainer: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    paddingLeft: 4,
  },
  notificationsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Sombra Android
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10, // Novo radius de 10
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B85F31A', // Nova cor de fundo
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#354259',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#717786',
  },
});