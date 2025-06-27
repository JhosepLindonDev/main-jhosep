// app/(auth)/index.tsx
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function AuthWelcomeScreen() {
  const handleContinueToRegistration = () => {
    // Navegar a la selección de tipo de registro
    router.push('/(auth)/registro-tipo');
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
        }}
      >
        <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
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
});

export default AuthWelcomeScreen;