// app/(tabs)/_layout.tsx
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // Asegúrate de que esta ruta sea correcta
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, // Oculta los encabezados predeterminados de las pestañas
        tabBarStyle: {
            height: 60, // Ajusta la altura de la barra de pestañas si es necesario
            paddingBottom: 5, // Un poco de padding en la parte inferior para los iconos
        },
        tabBarLabelStyle: {
            fontSize: 12, // Tamaño de la fuente de las etiquetas
            fontWeight: 'bold',
        }
      }}>
      <Tabs.Screen
        name="index" // Corresponde a app/(tabs)/index.tsx (Dashboard del Candidato)
        options={{
          title: 'Inicio', // Título que se muestra en la pestaña
          tabBarIcon: ({ color, focused }) => (
            // Usando TabBarIcon de la plantilla de Expo con iconos de Ionicons
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      {/* Nueva pestaña para Notificaciones */}
      <Tabs.Screen
        name="notificaciones" // **CAMBIO AQUÍ: apunta a notificaciones.tsx**
        options={{
          title: 'Notificaciones', // Nuevo título de la pestaña
          tabBarIcon: ({ color, focused }) => (
            // Icono de campana para notificaciones
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil-candidato" // Corresponde a app/(tabs)/perfil-candidato.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="estadisticas" // Corresponde a app/(tabs)/estadisticas.tsx
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
