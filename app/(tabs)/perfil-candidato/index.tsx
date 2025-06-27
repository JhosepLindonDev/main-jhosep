// app/(tabs)/perfil-candidato/index.tsx
import { Colors } from '@/constants/Colors'; // Asegúrate de que esta ruta sea correcta
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import * as ImagePicker from 'expo-image-picker'; // Para seleccionar imágenes
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilCandidatoScreen() {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [partido, setPartido] = useState('Partido Nacional');
  const [biografia, setBiografia] = useState('Soy un candidato comprometido con el bienestar de mi comunidad y busco generar un impacto positivo a través de políticas inclusivas y sostenibles.');
  const [propuestas, setPropuestas] = useState('1. Educación de calidad para todos. \n2. Mejora de la infraestructura pública. \n3. Fomento del empleo local.');
  const [enlaceRedes, setEnlaceRedes] = useState('https://facebook.com/juanperez');
  const [image, setImage] = useState<string | null>(null); // Estado para la imagen de perfil

  const pickImage = async () => {
    // Solicitar permiso para acceder a la galería de imágenes
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos permiso para acceder a tu galería de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleGuardarCambios = () => {
    // Aquí iría la lógica para guardar los cambios, por ejemplo, enviarlos a una API
    Alert.alert('Cambios Guardados', 'Tu perfil ha sido actualizado exitosamente.');
    console.log('Perfil actualizado:', { nombre, partido, biografia, propuestas, enlaceRedes, image });
  };

  return (
    <View style={styles.fullContainer}>
      <Stack.Screen options={{ headerShown: false }} /> {/* Oculta el encabezado de la pantalla individual */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Sección de Foto de Perfil */}
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileAvatar} />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Ionicons name="person-circle-outline" size={80} color={Colors.electo.gray} />
              <Text style={styles.placeholderText}>Añadir Foto</Text>
            </View>
          )}
          <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>

        {/* Campo Nombre */}
        <Text style={styles.label}>Nombre del Candidato</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa tu nombre"
        />

        {/* Campo Partido Político */}
        <Text style={styles.label}>Partido Político</Text>
        <TextInput
          style={styles.input}
          value={partido}
          onChangeText={setPartido}
          placeholder="Ingresa tu partido"
        />

        {/* Campo Biografía */}
        <Text style={styles.label}>Biografía</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={biografia}
          onChangeText={setBiografia}
          placeholder="Describe tu biografía"
          multiline
          numberOfLines={4}
        />

        {/* Campo Propuestas */}
        <Text style={styles.label}>Propuestas de Campaña</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={propuestas}
          onChangeText={setPropuestas}
          placeholder="Detalla tus propuestas"
          multiline
          numberOfLines={6}
        />

        {/* Campo Enlace Redes Sociales */}
        <Text style={styles.label}>Enlace a Redes Sociales</Text>
        <TextInput
          style={styles.input}
          value={enlaceRedes}
          onChangeText={setEnlaceRedes}
          placeholder="Ej: https://facebook.com/tuperfil"
          keyboardType="url"
        />

        {/* Botón Guardar Cambios */}
        <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: Colors.electo.grayLight, // Fondo claro para toda la pantalla
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.electo.white, // Fondo del scrollview
    borderRadius: 10,
    margin: 10,
    marginTop: 60, // Espacio para el encabezado
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.electo.primary,
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.electo.grayLight, //
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.electo.gray,
  },
  placeholderText: {
    color: Colors.electo.gray,
    fontSize: 14,
  },
  changePhotoText: {
    color: Colors.electo.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.electo.black,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.electo.grayLight,
    backgroundColor: Colors.electo.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.electo.black,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.electo.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.electo.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});