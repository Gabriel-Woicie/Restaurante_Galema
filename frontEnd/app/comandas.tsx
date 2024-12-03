import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { usePedido } from '../context/PedidoContext';
import { useRouter } from 'expo-router';

export default function ComandasScreen() {
  const { totalPrice } = usePedido();
  const router = useRouter();

  const comandasMockadas = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    nome: `Mesa ${index + 1}`,
  }));

  const [comandas, setComandas] = useState(comandasMockadas);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newComandaName, setNewComandaName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComanda, setSelectedComanda] = useState<{ id: number; nome: string } | null>(null);

  const ITEMS_PER_PAGE = 20;

  const currentData = comandas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreateComanda = () => {
    if (newComandaName.trim()) {
      const newComanda = { id: comandas.length + 1, nome: newComandaName.trim() };
      setComandas([...comandas, newComanda]);
      setNewComandaName('');
      setIsCreateModalVisible(false);
    } else {
      alert('Insira um nome válido.');
    }
  };

  const openModal = (comanda: { id: number; nome: string }) => {
    setSelectedComanda(comanda);
    setIsModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setIsCreateModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Criar Comanda</Text>
      </TouchableOpacity>

      <FlatList
        data={currentData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
        >
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationCenterText}>Página {currentPage}</Text>
        <TouchableOpacity
          disabled={currentPage === Math.ceil(comandas.length / ITEMS_PER_PAGE)}
          onPress={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(comandas.length / ITEMS_PER_PAGE)))}
          style={[
            styles.paginationButton,
            currentPage === Math.ceil(comandas.length / ITEMS_PER_PAGE) && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>Próximo</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para Criar Comanda */}
      <Modal visible={isCreateModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criar Comanda</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da comanda"
              value={newComandaName}
              onChangeText={setNewComandaName}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleCreateComanda}>
              <Text style={styles.modalButtonText}>Criar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsCreateModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Detalhes da Comanda */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Registrar Pedido na Comanda</Text>
            {selectedComanda && (
              <>
                <Text style={styles.modalText}>Comanda: {selectedComanda.nome}</Text>
                <Text style={styles.modalText}>Total: R$ {totalPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Fechar</Text>
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
    backgroundColor: '#000',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationCenterText: {
    color: '#3d2b19',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
