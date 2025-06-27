// app/(tabs)/notificaciones.tsx
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// --- Datos de prueba para las notificaciones (Mock Data) ---
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'general' | 'alert' | 'update'; // Tipo de notificación
  isRead: boolean;
  timestamp: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif1',
    title: 'Nueva propuesta de ley',
    message: 'El político Martín Vizcarra ha publicado una nueva propuesta sobre economía.',
    type: 'update',
    isRead: false,
    timestamp: 'Hace 5 minutos',
  },
  {
    id: 'notif2',
    title: '¡Tienes un nuevo seguidor!',
    message: 'Carlos P. te está siguiendo ahora.',
    type: 'general',
    isRead: false,
    timestamp: 'Hace 30 minutos',
  },
  {
    id: 'notif3',
    title: 'Alerta: Próximas elecciones',
    message: 'Recordatorio: Las inscripciones de candidatos cierran en 7 días.',
    type: 'alert',
    isRead: true,
    timestamp: 'Hace 1 día',
  },
  {
    id: 'notif4',
    title: 'Actualización de perfil',
    message: 'Tu perfil ha sido actualizado con éxito.',
    type: 'update',
    isRead: true,
    timestamp: 'Hace 2 días',
  },
  {
    id: 'notif5',
    title: 'Mensaje de apoyo',
    message: 'María S. te ha enviado un mensaje de apoyo.',
    type: 'general',
    isRead: true,
    timestamp: 'Hace 3 días',
  },
];

// --- Componente de Tarjeta de Notificación ---
const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <Pressable
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadNotification, // Estilo para notificaciones no leídas
      ]}>
      <View style={styles.iconContainer}>
        {notification.type === 'alert' && (
          <Ionicons name="alert-circle-outline" size={24} color={Colors.electo.primary} />
        )}
        {notification.type === 'update' && (
          <Ionicons name="information-circle-outline" size={24} color={Colors.electo.success} />
        )}
        {notification.type === 'general' && (
          <Ionicons name="notifications-outline" size={24} color={Colors.electo.gray} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>{notification.message}</Text>
        <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
      </View>
      {!notification.isRead && (
        <View style={styles.unreadDot} /> // Pequeño punto para indicar no leído
      )}
    </Pressable>
  );
};

// --- Pantalla Principal de Notificaciones ---
export default function NotificacionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Notificaciones</Text>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5', // Un gris claro para el fondo
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.electo.black,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20, // Espacio al final de la lista
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.electo.white,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: Colors.electo.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#E6F0FF', // Un color más claro para notificaciones no leídas
    borderLeftWidth: 4,
    borderLeftColor: Colors.electo.primary,
  },
  iconContainer: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.electo.black,
    marginBottom: 3,
  },
  notificationMessage: {
    fontSize: 13,
    color: Colors.electo.gray,
    marginBottom: 3,
  },
  notificationTimestamp: {
    fontSize: 11,
    color: Colors.electo.gray,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.electo.primary,
    marginLeft: 10,
  },
});