import { Stack } from 'expo-router';
import { PedidoProvider } from '../context/PedidoContext'; // Ajuste o caminho, se necessário

export default function RootLayout() {
  return (
    <PedidoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Login' }} />
        <Stack.Screen name="home" options={{ title: 'Início' }} />
        <Stack.Screen name="vender" options={{ title: 'Produtos' }} />
        <Stack.Screen name="comandas" options={{ title: 'Comandas' }} />
        <Stack.Screen name="ajuda" options={{ title: 'Ajuda' }} />
        <Stack.Screen name="configuracoes" options={{ title: 'Configurações' }} />
        <Stack.Screen name="comandasMain" options={{ title: 'Comandas' }} />
        <Stack.Screen name="funcionarios" options={{ title: 'Funcionários' }} />
        <Stack.Screen name="produtos" options={{ title: 'Produtos' }} />
      </Stack>
    </PedidoProvider>
  );
}
