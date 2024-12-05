import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { usePedido } from '../context/PedidoContext';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ComandasScreen() {
  const { totalPrice } = usePedido();
  const router = useRouter();

  const [comandas, setComandas] = useState<{ idcomanda: number; nomecomanda: string; situacaocomanda: boolean }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newComandaName, setNewComandaName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComanda, setSelectedComanda] = useState<{ idcomanda: number; nomecomanda: string } | null>(null);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchComandas();
  }, []);

  const fetchComandas = async () => {
    try {
      const response = await axios.get('http://172.20.163.160:4005/comandas');
      const activeComandas = response.data.filter((comanda: { situacaocomanda: boolean }) => comanda.situacaocomanda);
      setComandas(activeComandas);
    } catch (error) {
      console.error('Error fetching comandas:', error);
    }
  };

  const openModal = (comanda: { idcomanda: number; nomecomanda: string }) => {
    setSelectedComanda(comanda);
    setIsModalVisible(true);
  };

  const handleCreateComanda = async () => {
    try {
      const newComanda = {
        nomecomanda: newComandaName,
        situacaocomanda: true,
        valorcomanda: null,
        idfuncionario: 1,
      };
      await axios.post('http://172.20.163.160:4005/comandas', newComanda);
      setIsCreateModalVisible(false);
      setNewComandaName('');
      fetchComandas();
    } catch (error) {
      console.error('Error creating comanda:', error);
    }
  };

  const currentData = comandas.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        keyExtractor={(item) => item.idcomanda.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
            <Text style={styles.cardText}>{item.nomecomanda}</Text>
            <Text style={styles.cardIdText}>#{item.idcomanda}</Text>
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
          <Text style={styles.paginationText}>Próxima</Text>
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
                <Text style={styles.modalText}>Comanda: {selectedComanda.nomecomanda}</Text>
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
    position: 'relative',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardIdText: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: 'gray',
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
