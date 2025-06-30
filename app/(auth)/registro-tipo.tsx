// app/(auth)/registro-tipo.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RegistroTipoScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Elige tu tipo de registro</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/(auth)/registro-ciudadano')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={40} color="#007bff" />
          </View>
          <Text style={styles.cardTitle}>Registro Ciudadano</Text>
          <Text style={styles.cardDescription}>
            Regístrate para votar, consultar información electoral y participar en los procesos democráticos
          </Text>
          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={20} color="#007bff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardSecondary]}
          onPress={() => router.push('/(auth)/registro-candidato-partido')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="podium" size={40} color="#28a745" />
          </View>
          <Text style={styles.cardTitle}>Registro Candidato/Partido</Text>
          <Text style={styles.cardDescription}>
            Regístrate como candidato o representa a un partido político para participar en las elecciones
          </Text>
          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={20} color="#28a745" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
  },
  cardSecondary: {
    borderWidth: 2,
    borderColor: '#28a745',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  arrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -10,
  },
});