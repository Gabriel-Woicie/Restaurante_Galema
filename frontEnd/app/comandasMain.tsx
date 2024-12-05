import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Alert, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';

const ComandasMain = () => {
  interface Comanda {
    idcomanda: number;
    situacaocomanda: boolean;
    valorcomanda: string;
    nomecomanda: string;
    idfuncionario: number;
  }

  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [toggleAtivo, setToggleAtivo] = useState(true); // Estado do toggle bar
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal para detalhes da comanda
  const [isCriarModalVisible, setIsCriarModalVisible] = useState(false); // Modal para criar comanda
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null); // Comanda selecionada
  const [novaComanda, setNovaComanda] = useState({ nome: "", valor: "" }); // Nova comanda

  const itensPorPagina = 20;

  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await axios.get('http://172.20.163.160:4005/comandas');
        setComandas(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível buscar as comandas.");
        console.error(error);
      }
    };

    fetchComandas();
  }, []);

  const comandasFiltradas = comandas.filter((c) =>
    toggleAtivo ? c.situacaocomanda : !c.situacaocomanda
  );

  const comandasPaginadas = comandasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const criarComanda = async () => {
    if (!novaComanda.nome || !novaComanda.valor) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await axios.post("http://172.20.163.160:4005/comandas", {
        nomecomanda: novaComanda.nome,
        situacaocomanda: true,
        valorcomanda: parseFloat(novaComanda.valor),
        idfuncionario: 1, // Substituir com o ID real do funcionário
      });
      setComandas([response.data, ...comandas]);
      setNovaComanda({ nome: "", valor: "" });
      setIsCriarModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a comanda.");
      console.error(error);
    }
  };

  const encerrarComanda = async (comandaSelecionada: Comanda) => {
    try {
      await axios.put(
        `http://172.20.163.160:4005/comandas/${comandaSelecionada.idcomanda}`,
        { situacaocomanda: false }
      );
      setComandas((prev) =>
        prev.map((c) =>
          c.idcomanda === comandaSelecionada.idcomanda
            ? { ...c, situacaocomanda: false }
            : c
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encerrar a comanda.");
      console.error(error);
    }
  };

  const deletarComanda = async (id: number) => {
    try {
      await axios.delete(`http://172.20.163.160:4005/comandas/${id}`);
      setComandas((prev) => prev.filter((c) => c.idcomanda !== id));
      Alert.alert("Sucesso", "Comanda deletada com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a comanda.");
      console.error(error);
    }
  };

  const handleEditComanda = (field: string, value: string) => {
    if (comandaSelecionada) {
      setComandaSelecionada({ ...comandaSelecionada, [field]: value });
    }
  };

  return (
    <View style={styles.container}>
      {/* Toggle Bar */}
      <View style={styles.toggleBar}>
        <TouchableOpacity
          style={[styles.toggleButton, toggleAtivo && styles.toggleButtonAtivo]}
          onPress={() => setToggleAtivo(true)}
        >
          <Text style={styles.toggleText}>Abertas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !toggleAtivo && styles.toggleButtonAtivo]}
          onPress={() => setToggleAtivo(false)}
        >
          <Text style={styles.toggleText}>Fechadas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Comandas */}
      <FlatList
        data={comandasPaginadas}
        keyExtractor={(item) => item.idcomanda.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setComandaSelecionada(item);
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.cardText}>{item.nomecomanda}</Text>
            <Text style={styles.cardInfo}>Valor: R$ {item.valorcomanda}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.lista}
      />

      {/* Botão Criar Comanda */}
      <TouchableOpacity
        style={styles.criarButton}
        onPress={() => setIsCriarModalVisible(true)}
      >
        <Text style={styles.criarButtonText}>Criar Comanda</Text>
      </TouchableOpacity>

      {/* Modal Criar Comanda */}
      <Modal visible={isCriarModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criar Nova Comanda</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Comanda"
              value={novaComanda.nome}
              onChangeText={(text) =>
                setNovaComanda({ ...novaComanda, nome: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Valor da Comanda"
              keyboardType="numeric"
              value={novaComanda.valor}
              onChangeText={(text) =>
                setNovaComanda({ ...novaComanda, valor: text })
              }
            />
            <TouchableOpacity style={styles.modalButton} onPress={criarComanda}>
              <Text style={styles.modalButtonText}>Criar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButton]}
              onPress={() => setIsCriarModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Detalhes da Comanda */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {comandaSelecionada && (
              <>
                <Text style={styles.modalTitle}>Editar Comanda</Text>
                <TextInput
                  style={styles.modalInput}
                  value={comandaSelecionada.nomecomanda}
                  onChangeText={(text) => handleEditComanda('nomecomanda', text)}
                />
                <TextInput
                  style={styles.modalInput}
                  value={comandaSelecionada.valorcomanda}
                  onChangeText={(text) => handleEditComanda('valorcomanda', text)}
                />
                <TouchableOpacity style={styles.modalButton} onPress={() => encerrarComanda(comandaSelecionada)}>
                  <Text style={styles.modalButtonText}>Encerrar</Text>
                </TouchableOpacity>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  toggleBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleButtonAtivo: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paginationText: {
    fontSize: 14,
    color: '#3d2b19',
    fontWeight: 'bold',
  },
  paginationInfo: {
    fontSize: 14,
    color: '#fff',
  },
  criarButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  criarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonSecondary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  modalButtonClose: {
    backgroundColor: '#FF6347',
  },
  modalFecharText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default ComandasMain;