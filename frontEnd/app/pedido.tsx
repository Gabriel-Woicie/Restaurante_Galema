import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PedidoScreen() {
  const router = useRouter();
  const { pedidoData, totalItems, totalPrice } = useLocalSearchParams();

  const pedido = JSON.parse(pedidoData as string); // Transformando string em JSON

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Pedido</Text>

      <FlatList
        data={pedido}
        keyExtractor={(item) => item.idproduto.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.nomeproduto} x {item.quantidade}
            </Text>
            <Text style={styles.itemText}>
              R$ {(item.valorproduto * item.quantidade).toFixed(2)}
            </Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total de itens: {totalItems}</Text>
        <Text style={styles.summaryText}>Total: R$ {totalPrice}</Text>
      </View>

      <TouchableOpacity
        style={styles.finalizarButton}
        onPress={() => alert('Implementação futura: Finalizar Pedido')}
      >
        <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalizarButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#aaa',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
