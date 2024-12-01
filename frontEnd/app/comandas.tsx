import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { usePedido } from '../context/PedidoContext';
import { useRouter } from 'expo-router';

export default function ComandasScreen() {
  const { pedido, totalItems, totalPrice } = usePedido();
  const router = useRouter();
  const comandasMockadas = [
    { id: 1, nome: 'Mesa 1' },
    { id: 2, nome: 'Mesa 2' },
    { id: 3, nome: 'Mesa 3' },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComanda, setSelectedComanda] = useState<{ id: number; nome: string } | null>(null);

  const registrarPedido = () => {
    if (selectedComanda) {
      console.log('Registrando pedido na comanda:', selectedComanda.id);

      // Aqui você pode implementar a chamada para a API para registrar o pedido
      /*
      fetch('http://sua-api.com/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idcomanda: selectedComanda.id,
          pedido: pedido, // Passar os itens do pedido
        }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      */

      // Fechar o modal e voltar para a tela de vendas
      setIsModalVisible(false);
      router.push('/vender'); // Navega de volta para a tela de vendas
    }
  };

  const openModal = (comanda: { id: number; nome: string }) => {
    setSelectedComanda(comanda);
    setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Criar Comanda</Text>
      </TouchableOpacity>
      <FlatList
        data={comandasMockadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal para registrar pedido na comanda */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Registrar Pedido na Comanda</Text>
            {selectedComanda && (
              <>
                <Text style={styles.modalText}>Comanda: {selectedComanda.nome}</Text>
                <Text style={styles.modalText}>Total: R$ {totalPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Fechar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={registrarPedido}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#3d2b19',
    padding: 15,
    marginBottom: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
