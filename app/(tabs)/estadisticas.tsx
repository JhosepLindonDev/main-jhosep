// app/(tabs)/estadisticas.tsx
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface ResultadoElectoral {
  candidato: string;
  partido: string;
  porcentaje: number;
  votos: number;
  color: string;
}

const resultados: ResultadoElectoral[] = [
  { candidato: 'Martin Vizcarra', partido: 'Peru Primero', porcentaje: 43, votos: 4300000, color: '#3498DB' },
  { candidato: 'Keiko Fujimori', partido: 'Peru Libre', porcentaje: 13, votos: 1300000, color: '#E74C3C' },
  { candidato: 'Rafael López', partido: 'Partido Morado', porcentaje: 8, votos: 800000, color: '#9B59B6' },
  { candidato: 'Verónika Mendoza', partido: 'Renovación Popular', porcentaje: 7.9, votos: 790000, color: '#2ECC71' },
  { candidato: 'César Acuña', partido: 'Alianza para el Progreso', porcentaje: 7, votos: 700000, color: '#F39C12' },
  { candidato: 'Otros', partido: 'Varios', porcentaje: 21.1, votos: 2110000, color: '#95A5A6' },
];

export default function EstadisticasScreen() {
  const router = useRouter();
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);

  useEffect(() => {
    checkVoteStatus();
  }, []);

  const checkVoteStatus = async () => {
    try {
      const voted = await AsyncStorage.getItem('hasVoted');
      const candidate = await AsyncStorage.getItem('votedFor');
      if (voted !== 'true') {
        // Si no ha votado, redirigir a home
        router.replace('/(tabs)');
      } else {
        setHasVoted(true);
        setVotedFor(candidate);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!hasVoted) {
    return null;
  }

  const totalVotos = resultados.reduce((sum, r) => sum + r.votos, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estadísticas Electorales</Text>
        <Text style={styles.subtitle}>Resultados en tiempo real</Text>
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

      {/* Gráfico de Barras */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Distribución de Votos</Text>
        {resultados.map((resultado, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.candidateName}>{resultado.candidato}</Text>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    width: `${resultado.porcentaje}%`,
                    backgroundColor: resultado.color 
                  }
                ]} 
              />
              <Text style={styles.percentage}>{resultado.porcentaje}%</Text>
            </View>
            <Text style={styles.voteCount}>{resultado.votos.toLocaleString()} votos</Text>
          </View>
        ))}
      </View>

      {/* Tu voto */}
      {votedFor && (
        <View style={styles.yourVoteCard}>
          <Text style={styles.yourVoteTitle}>Tu Voto</Text>
          <Text style={styles.yourVoteText}>
            Has votado por: {votedFor === 'blank' ? 'Voto en Blanco' : resultados.find(r => r.candidato.includes(votedFor))?.candidato}
          </Text>
        </View>
      )}

      {/* Información adicional */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Datos Importantes</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Última actualización:</Text>
          <Text style={styles.infoValue}>{new Date().toLocaleTimeString()}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Mesas escrutadas:</Text>
          <Text style={styles.infoValue}>78.5%</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Próxima actualización:</Text>
          <Text style={styles.infoValue}>En 5 minutos</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.electo.grayLight,
  },
  header: {
    backgroundColor: '#3498DB',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
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
    fontSize: 32,
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
    height: 60,
    backgroundColor: '#E0E0E0',
  },
  chartCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  barContainer: {
    marginBottom: 20,
  },
  candidateName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  barWrapper: {
    height: 30,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 5,
  },
  bar: {
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
  },
  percentage: {
    position: 'absolute',
    right: 10,
    top: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  voteCount: {
    fontSize: 12,
    color: '#666',
  },
  yourVoteCard: {
    backgroundColor: '#E8F8F5',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  yourVoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 10,
  },
  yourVoteText: {
    fontSize: 16,
    color: '#27AE60',
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});