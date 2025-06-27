// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Componente de votación para ciudadanos
const CiudadanoHomeScreen = () => {
  const router = useRouter();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const candidatos = [
    {
      id: '1',
      nombre: 'Martin Vizcarra',
      partido: 'Peru Primero',
      foto: '👤',
      propuesta: 'Reforma del sistema de salud y educación',
    },
    {
      id: '2',
      nombre: 'Keiko Fujimori',
      partido: 'Peru Libre',
      foto: '👩',
      propuesta: 'Seguridad ciudadana y desarrollo económico',
    },
    {
      id: '3',
      nombre: 'Rafael López',
      partido: 'Partido Morado',
      foto: '👨',
      propuesta: 'Lucha contra la corrupción',
    },
  ];

  useEffect(() => {
    checkVoteStatus();
  }, []);

  const checkVoteStatus = async () => {
    try {
      const voted = await AsyncStorage.getItem('hasVoted');
      const votedFor = await AsyncStorage.getItem('votedFor');
      if (voted === 'true') {
        setHasVoted(true);
        setSelectedCandidate(votedFor);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleVote = (candidatoId: string) => {
    const candidato = candidatos.find(c => c.id === candidatoId);
    
    Alert.alert(
      'Confirmar Voto',
      `¿Estás seguro de votar por ${candidato?.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            await AsyncStorage.setItem('hasVoted', 'true');
            await AsyncStorage.setItem('votedFor', candidatoId);
            setHasVoted(true);
            setSelectedCandidate(candidatoId);
            Alert.alert('Éxito', 'Tu voto ha sido registrado');
          },
        },
      ]
    );
  };

  if (hasVoted) {
    const votedCandidate = candidatos.find(c => c.id === selectedCandidate);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Ya has votado</Text>
        </View>
        <View style={styles.votedCard}>
          <Ionicons name="checkmark-circle" size={80} color="#2ECC71" />
          <Text style={styles.votedText}>Votaste por:</Text>
          <Text style={styles.votedCandidateName}>{votedCandidate?.nombre}</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => router.push('/(tabs)/estadisticas')}
          >
            <Ionicons name="bar-chart" size={40} color="#3498DB" />
            <Text style={styles.optionTitle}>Ver Estadísticas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emite tu Voto</Text>
        <Text style={styles.subtitle}>Selecciona un candidato</Text>
      </View>
      <View style={styles.ballotContainer}>
        {candidatos.map((candidato) => (
          <TouchableOpacity
            key={candidato.id}
            style={styles.candidateCard}
            onPress={() => handleVote(candidato.id)}
          >
            <Text style={styles.candidatePhoto}>{candidato.foto}</Text>
            <View style={styles.candidateInfo}>
              <Text style={styles.candidateName}>{candidato.nombre}</Text>
              <Text style={styles.candidateParty}>{candidato.partido}</Text>
              <Text style={styles.candidateProposal}>{candidato.propuesta}</Text>
            </View>
            <View style={styles.voteButton}>
              <Text style={styles.voteButtonText}>VOTAR</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Componente dashboard para candidatos
const CandidatoHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Candidato</Text>
        <Text style={styles.subtitle}>Gestiona tu campaña</Text>
      </View>

      {/* Dashboard del candidato */}
      <View style={styles.dashboardContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={40} color="#3498DB" />
            <Text style={styles.statNumber}>15,234</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={40} color="#2ECC71" />
            <Text style={styles.statNumber}>+5.2%</Text>
            <Text style={styles.statLabel}>Esta semana</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="create" size={30} color="#E74C3C" />
          <Text style={styles.actionTitle}>Actualizar Propuestas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="calendar" size={30} color="#F39C12" />
          <Text style={styles.actionTitle}>Próximos Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="megaphone" size={30} color="#9B59B6" />
          <Text style={styles.actionTitle}>Nueva Publicación</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Componente principal que decide qué mostrar
export default function HomeScreen() {
  const [userType, setUserType] = useState<'ciudadano' | 'candidato' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserType();
  }, []);

  const checkUserType = async () => {
    try {
      // Aquí deberías obtener el tipo de usuario del AuthContext o AsyncStorage
      // Por ahora, vamos a verificar si se registró como candidato
      const registroTipo = await AsyncStorage.getItem('tipoRegistro');
      
      if (registroTipo === 'candidato') {
        setUserType('candidato');
      } else {
        setUserType('ciudadano');
      }
    } catch (error) {
      console.error('Error:', error);
      setUserType('ciudadano'); // Default
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Mostrar la pantalla correspondiente según el tipo de usuario
  return userType === 'candidato' ? <CandidatoHomeScreen /> : <CiudadanoHomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#3498DB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  // Estilos para ciudadanos
  ballotContainer: {
    padding: 20,
  },
  candidateCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  candidatePhoto: {
    fontSize: 40,
    marginRight: 15,
  },
  candidateInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  candidateParty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  candidateProposal: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  voteButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  voteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  votedCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  votedText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
  votedCandidateName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  optionsContainer: {
    padding: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  // Estilos para candidatos
  dashboardContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
  },
});