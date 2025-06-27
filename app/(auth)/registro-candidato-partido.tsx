// app/(auth)/registro-candidato-partido.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegistroCandidatoPartidoScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    edad: '',
    telefono: '',
    direccion: '',
    partido: '',
    cargo: '',
    experiencia: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Validación básica
    const requiredFields = ['dni', 'nombre', 'edad', 'telefono', 'direccion', 'partido', 'cargo'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    // Aquí iría la lógica de registro con el backend
    Alert.alert(
      'Registro Exitoso',
      'Tu registro como candidato ha sido completado correctamente.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Por ahora, navegamos a las tabs
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Registro de Candidato/Partido</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>DNI</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu DNI"
              value={formData.dni}
              onChangeText={(value) => handleInputChange('dni', value)}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre completo"
              value={formData.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu edad"
              value={formData.edad}
              onChangeText={(value) => handleInputChange('edad', value)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu número de teléfono"
              value={formData.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingresa tu dirección completa"
              value={formData.direccion}
              onChangeText={(value) => handleInputChange('direccion', value)}
              multiline
              numberOfLines={3}
            />
          </View>

          <Text style={styles.sectionTitle}>Ámbito Político</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Partido Político</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Partido Democrático, Independiente, etc."
              value={formData.partido}
              onChangeText={(value) => handleInputChange('partido', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cargo al que postula</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Alcalde, Regidor, Gobernador, etc."
              value={formData.cargo}
              onChangeText={(value) => handleInputChange('cargo', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Experiencia Política (Opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe tu experiencia política previa"
              value={formData.experiencia}
              onChangeText={(value) => handleInputChange('experiencia', value)}
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>REGISTRAR CANDIDATO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>VOLVER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#28a745',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});