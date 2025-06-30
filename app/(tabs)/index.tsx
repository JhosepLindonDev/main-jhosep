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
      porcentaje: 43,
      votos: 4300000,
    },
    {
      id: '2',
      nombre: 'Keiko Fujimori',
      partido: 'Peru Libre',
      foto: '👩',
      propuesta: 'Seguridad ciudadana y desarrollo económico',
      porcentaje: 13,
      votos: 1300000,
    },
    {
      id: '3',
      nombre: 'Rafael López',
      partido: 'Partido Morado',
      foto: '👨',
      propuesta: 'Lucha contra la corrupción',
      porcentaje: 8,
      votos: 800000,
    },
    {
      id: '4',
      nombre: 'Verónika Mendoza',
      partido: 'Renovación Popular',
      foto: '👩‍💼',
      propuesta: 'Derechos sociales y medio ambiente',
      porcentaje: 7.9,
      votos: 790000,
    },
    {
      id: '5',
      nombre: 'César Acuña',
      partido: 'Alianza para el Progreso',
      foto: '👨‍💼',
      propuesta: 'Educación y emprendimiento',
      porcentaje: 7,
      votos: 700000,
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
            Alert.alert('Voto Registrado', 'Tu voto ha sido registrado exitosamente.');
          },
        },
      ]
    );
  };

  const handleVerCandidato = (candidato: any) => {
    // Navegar al perfil del candidato con sus datos
    router.push({
      pathname: '/(tabs)/perfil-candidato',
      params: {
        id: candidato.id,
        nombre: candidato.nombre,
        partido: candidato.partido,
        porcentaje: candidato.porcentaje.toString(),
      },
    });
  };

  // Si ya votó, mostrar estadísticas con botones "ver"
  if (hasVoted) {
    const votedCandidate = candidatos.find(c => c.id === selectedCandidate);
    const totalVotos = candidatos.reduce((sum, c) => sum + c.votos, 0);

    return (
      <ScrollView style={styles.container}>
        {/* Header de estadísticas */}
        <View style={styles.header}>
          <Text style={styles.title}>Resultados Electorales</Text>
          <Text style={styles.subtitle}>Tu voto ha sido registrado</Text>
        </View>

        {/* Card de confirmación de voto */}
        <View style={styles.votedConfirmation}>
          <Ionicons name="checkmark-circle" size={50} color="#2ECC71" />
          <View style={styles.votedInfo}>
            <Text style={styles.votedText}>Votaste por:</Text>
            <Text style={styles.votedCandidateName}>{votedCandidate?.nombre}</Text>
          </View>
        </View>

        {/* Resumen General */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalVotos.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total de votos</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>65%</Text>
            <Text style={styles.summaryLabel}>Participación</Text>
          </View>
        </View>

        {/* Lista de candidatos con estadísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Resultados por Candidato</Text>
          
          {candidatos.map((candidato) => (
            <View key={candidato.id} style={styles.candidatoStatCard}>
              <View style={styles.candidatoStatInfo}>
                <View style={styles.candidatoHeader}>
                  <Text style={styles.candidatoFoto}>{candidato.foto}</Text>
                  <View style={styles.candidatoDetails}>
                    <Text style={styles.candidatoNombre}>{candidato.nombre}</Text>
                    <Text style={styles.candidatoPartido}>{candidato.partido}</Text>
                  </View>
                </View>
                
                {/* Barra de progreso */}
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${candidato.porcentaje}%` }
                    ]} 
                  />
                  <Text style={styles.porcentajeText}>{candidato.porcentaje}%</Text>
                </View>
                
                <Text style={styles.votosText}>{candidato.votos.toLocaleString()} votos</Text>
              </View>
              
              {/* Botón Ver */}
              <TouchableOpacity 
                style={styles.verButton}
                onPress={() => handleVerCandidato(candidato)}
              >
                <Text style={styles.verButtonText}>VER</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Botón para votar de nuevo (solo para pruebas) */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={async () => {
            await AsyncStorage.removeItem('hasVoted');
            await AsyncStorage.removeItem('votedFor');
            setHasVoted(false);
            setSelectedCandidate(null);
          }}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.resetButtonText}>Votar de Nuevo (Pruebas)</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Si no ha votado, mostrar papeleta
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
      const registroTipo = await AsyncStorage.getItem('tipoRegistro');
      console.log('Tipo de usuario:', registroTipo);
      
      if (registroTipo === 'candidato') {
        setUserType('candidato');
      } else {
        setUserType('ciudadano');
      }
    } catch (error) {
      console.error('Error:', error);
      setUserType('ciudadano');
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
  // Estilos para estadísticas integradas
  votedConfirmation: {
    backgroundColor: '#E8F8F5',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  votedInfo: {
    marginLeft: 15,
    flex: 1,
  },
  votedText: {
    fontSize: 18,
    color: '#666',
    marginTop: 0,
  },
  votedCandidateName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  summaryCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#E0E0E0',
  },
  statsContainer: {
    paddingHorizontal: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  candidatoStatCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  candidatoStatInfo: {
    flex: 1,
  },
  candidatoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  candidatoFoto: {
    fontSize: 35,
    marginRight: 10,
  },
  candidatoDetails: {
    flex: 1,
  },
  candidatoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  candidatoPartido: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 25,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 12,
  },
  porcentajeText: {
    position: 'absolute',
    right: 10,
    top: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  votosText: {
    fontSize: 12,
    color: '#666',
  },
  verButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginLeft: 10,
  },
  verButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#E74C3C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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