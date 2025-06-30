// app/(tabs)/_layout.tsx
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [userType, setUserType] = useState<'ciudadano' | 'candidato'>('ciudadano');
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    checkUserTypeAndVoteStatus();
    
    // Verificar el estado cada vez que el usuario navega
    const interval = setInterval(() => {
      checkUserTypeAndVoteStatus();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const checkUserTypeAndVoteStatus = async () => {
    try {
      const tipoRegistro = await AsyncStorage.getItem('tipoRegistro');
      const voted = await AsyncStorage.getItem('hasVoted');
      
      console.log('Tipo de usuario en tabs:', tipoRegistro);
      console.log('Ha votado:', voted);
      
      if (tipoRegistro === 'candidato') {
        setUserType('candidato');
      } else {
        setUserType('ciudadano');
      }
      
      setHasVoted(voted === 'true');
    } catch (error) {
      console.error('Error checking user type:', error);
    }
  };

  // Si es candidato, mostrar todas las pestañas
  if (userType === 'candidato') {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="notificaciones"
          options={{
            title: 'Notificaciones',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="estadisticas"
          options={{
            title: 'Estadísticas',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explorar',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="perfil-candidato"
          options={{
            href: null,
          }}
        />
      </Tabs>
    );
  }

  // Si es ciudadano, mostrar pestañas limitadas
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      
      {/* Home - Siempre visible */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      {/* Notificaciones - Siempre visible */}
      <Tabs.Screen
        name="notificaciones"
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />

      {/* Estadísticas - Solo visible después de votar */}
      <Tabs.Screen
        name="estadisticas"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
          ),
          href: hasVoted ? '/(tabs)/estadisticas' : null,
        }}
      />

      {/* Explorar - Solo visible después de votar */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Candidatos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
          href: hasVoted ? '/(tabs)/explore' : null,
        }}
      />

      {/* Perfil candidato - Siempre oculto del tab bar */}
      <Tabs.Screen
        name="perfil-candidato"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}