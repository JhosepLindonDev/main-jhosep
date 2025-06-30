// app/(tabs)/perfil-candidato/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function PerfilCandidatoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const { nombre, partido, porcentaje } = params;

  // Datos simulados del candidato (en producción vendrían del backend)
  const candidatoData = {
    descripcion: "32 años, masculino, lima, ámbito político y actual líder de votos",
    competidores: "competidores directos",
    ideologia: "centrista",
    votos: "123,294",
    incremento: "3459 esta semana",
    reformas: [
      "Reforma del Consejo Nacional de la Magistratura: Creación de la Junta Nacional de Justicia para mejorar la selección y nombramiento de jueces y fiscales.",
      "Regulación del financiamiento de campañas electorales: Implementación de normas para aumentar la transparencia y reducir la influencia del dinero en la política.",
      "Prohibición de reelección inmediata de parlamentarios: Aprobación de una ley que impide la reelección consecutiva de congresistas para promover la renovación y reducir la corrupción.",
      "Eliminación del voto preferencial: Supresión del voto preferencial para fortalecer los partidos políticos y reducir la personalización de la política.",
      "Fortalecimiento de la lucha contra la corrupción: Implementación de medidas para combatir la corrupción y mejorar la transparencia en el gobierno."
    ]
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil del Candidato</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Card principal del candidato */}
      <View style={styles.mainCard}>
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
            <View style={styles.voteBadge}>
              <Text style={styles.voteNumber}>{porcentaje}%</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.candidateName}>{nombre || 'Martin Vizcarra'}</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionTitle}>Descripción:</Text>
              <Text style={styles.descriptionText}>{candidatoData.descripcion}</Text>
            </View>
            
            <View style={styles.competidoresBox}>
              <Text style={styles.competidoresText}>{candidatoData.competidores}</Text>
            </View>
            
            <View style={styles.ideologiaBox}>
              <Ionicons name="flask" size={20} color="#666" />
              <Text style={styles.ideologiaLabel}>ideología política</Text>
              <Text style={styles.ideologiaText}>{candidatoData.ideologia}</Text>
            </View>
          </View>
        </View>

        {/* Sección de estadísticas */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{candidatoData.votos}</Text>
            <Text style={styles.statLabel}>votos totales</Text>
          </View>
          
          <View style={[styles.statBox, styles.statBoxHighlight]}>
            <Text style={styles.statHighlight}>NO se</Text>
            <Text style={styles.statHighlight}>intersecciones</Text>
            <Text style={styles.statIncrement}>+3M+</Text>
            <Text style={styles.statIncrementLabel}>{candidatoData.incremento}</Text>
          </View>
        </View>
      </View>

      {/* Sección de reformas políticas */}
      <View style={styles.reformasCard}>
        <Text style={styles.reformasTitle}>
          Reformas políticas del candidato:
        </Text>
        <Text style={styles.reformasSubtitle}>
          Reforma del Consejo Nacional de la Magistratura: Creación de la Junta Nacional 
          de Justicia para mejorar la selección y nombramiento de jueces y fiscales.
        </Text>
        
        {candidatoData.reformas.map((reforma, index) => (
          <View key={index} style={styles.reformaItem}>
            <Text style={styles.reformaPrefix}>- </Text>
            <Text style={styles.reformaText}>{reforma}</Text>
          </View>
        ))}
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.followButton}>
          <Ionicons name="person-add" size={20} color="white" />
          <Text style={styles.followButtonText}>Seguir Candidato</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => {
            // Implementar compartir
          }}
        >
          <Ionicons name="share-social" size={20} color="#3498DB" />
          <Text style={styles.shareButtonText}>Compartir</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF8DC',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mainCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 40,
  },
  voteBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  voteNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoSection: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 12,
    color: '#333',
  },
  competidoresBox: {
    backgroundColor: '#FFF3CD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  competidoresText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
  },
  ideologiaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 10,
    gap: 5,
  },
  ideologiaLabel: {
    fontSize: 12,
    color: '#666',
  },
  ideologiaText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 15,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF3CD',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  statBoxHighlight: {
    backgroundColor: '#FFE0B2',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  statHighlight: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  statIncrement: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 5,
  },
  statIncrementLabel: {
    fontSize: 12,
    color: '#666',
  },
  reformasCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reformasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reformasSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  reformaItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reformaPrefix: {
    color: '#3498DB',
    marginRight: 5,
  },
  reformaText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#3498DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 10,
  },
  followButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 10,
    borderWidth: 2,
    borderColor: '#3498DB',
  },
  shareButtonText: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: 'bold',
  },
});