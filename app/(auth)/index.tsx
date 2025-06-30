// app/(auth)/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Importa Alert

function AuthWelcomeScreen() {
  const handleContinueToRegistration = () => {
    // Navegar a la selección de tipo de registro
    router.push('/(auth)/registro-tipo');
  };

  // Función para limpiar los datos de AsyncStorage (para depuración)
  const limpiarDatos = async () => {
    try {
      await AsyncStorage.removeItem('tipoRegistro');
      await AsyncStorage.removeItem('hasVoted');
      await AsyncStorage.removeItem('votedFor');
      await AsyncStorage.removeItem('userToken'); // Limpia el token de autenticación
      Alert.alert('Datos limpiados', 'Puedes empezar de nuevo el flujo de registro/login.');
      console.log('Datos de AsyncStorage limpiados.');
    } catch (error) {
      console.error('Error al limpiar datos de AsyncStorage:', error);
      Alert.alert('Error', 'No se pudieron limpiar los datos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a Election System!</Text>
      <Text style={styles.subtitle}>
        Participa en el proceso democrático de tu comunidad
      </Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleContinueToRegistration}
      >
        <Text style={styles.buttonText}>INICIAR REGISTRO</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => {
          // Aquí podrías agregar lógica para login si ya tiene cuenta
          console.log('Login - Por implementar');
          Alert.alert('Login', 'La funcionalidad de login aún no está implementada.');
        }}
      >
        <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
      </TouchableOpacity>

      {/* Botón de depuración para limpiar datos */}
      <TouchableOpacity 
        style={styles.debugButton}
        onPress={limpiarDatos}
      >
        <Text style={styles.debugButtonText}>🧹 Limpiar Datos (Debug)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  // Nuevos estilos para el botón de depuración
  debugButton: {
    backgroundColor: '#FF6B6B', // Un rojo suave para indicar "peligro" o "debug"
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20, // Espacio superior para separarlo de los otros botones
    alignItems: 'center',
  },
  debugButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AuthWelcomeScreen;