// app/(auth)/_layout.tsx
// Este archivo define las pantallas para el flujo de autenticación/registro.
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      {/* La pantalla 'index' dentro de la carpeta '(auth)' será la primera que se muestre.
        Es donde deberías tener tu formulario de registro principal (por ejemplo, el que era registro-candidato.tsx
        y que renombraste a index.tsx dentro de (auth)).
        Puedes elegir si quieres que tenga un encabezado o no.
      */}
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, // Puedes poner true si quieres ver un encabezado por defecto
          title: "Iniciar Sesión o Registrarse" // Este título se mostrará en el encabezado si headerShown es true
        }} 
      />

      {/* Aquí defines las otras pantallas de tu flujo de registro.
        Asegúrate de que los 'name' coincidan exactamente con los nombres de tus archivos .tsx
        dentro de la carpeta 'app/(auth)/' (sin el .tsx).
      */}
      <Stack.Screen 
        name="registro-candidato-partido" 
        options={{ 
          headerShown: true, 
          title: "Registro de Partido" 
        }} 
      />
      <Stack.Screen 
        name="registro-ciudadano" 
        options={{ 
          headerShown: true, 
          title: "Registro de Ciudadano" 
        }} 
      />

      {/* Si tu pantalla original de 'registro-candidato.tsx' NO la renombraste a 'index.tsx'
        y quieres que siga existiendo como una ruta separada, DEBERÍAS descomentar esta línea:
        <Stack.Screen name="registro-candidato" options={{ headerShown: true, title: "Registro de Candidato" }} />
        Pero, lo más común para el inicio del flujo es renombrar el primer paso a 'index.tsx'.
      */}
    </Stack>
  );
}