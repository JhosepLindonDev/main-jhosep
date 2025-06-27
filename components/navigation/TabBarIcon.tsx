import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: ComponentProps<typeof Ionicons>) {
  const colorScheme = useColorScheme();
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}