import { Stack } from 'expo-router';
import { PedidoProvider } from '../context/PedidoContext'; // Ajuste o caminho, se necessário

export default function RootLayout() {
  return (
    <PedidoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Login' }} />
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="vender" options={{ title: 'Produtos' }} />
        <Stack.Screen name="comandas" options={{ title: 'Comandas' }} />
      </Stack>
    </PedidoProvider>
  );
}
