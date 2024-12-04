import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";

export default function ComandasMain() {
  const [toggleAtivo, setToggleAtivo] = useState(true); // Estado do toggle bar
  interface Comanda {
    id: number;
    nomecomanda: string;
    situacaocomanda: boolean;
    valorcomanda: number;
  }

  const [comandas, setComandas] = useState<Comanda[]>([]); // Lista de comandas
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal para detalhes da comanda
  const [isCriarModalVisible, setIsCriarModalVisible] = useState(false); // Modal para criar comanda
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null); // Comanda selecionada
  const [novaComanda, setNovaComanda] = useState({ nome: "", valor: "" }); // Nova comanda

  const itensPorPagina = 20;

  // Função para carregar todas as comandas
  const carregarComandas = async () => {
    try {
      const response = await axios.get("http://192.168.3.29/comandas");
      setComandas(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as comandas.");
      console.error(error);
    }
  };

  useEffect(() => {
    carregarComandas();
  }, []);

  const comandasFiltradas = comandas.filter((c) =>
    toggleAtivo ? c.situacaocomanda == true : c.situacaocomanda == false
  );

  const comandasPaginadas = comandasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  // Função para criar uma nova comanda
  const criarComanda = async () => {
    if (!novaComanda.nome || !novaComanda.valor) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.3.29/comandas", {
        nomecomanda: novaComanda.nome,
        situacaocomanda: "Aberta",
        valorcomanda: parseFloat(novaComanda.valor),
        idfuncionario: 1, // Substituir com o ID real do funcionário
        idpedido: 0, // Substituir com o ID real do pedido
      });
      setComandas([response.data, ...comandas]);
      setNovaComanda({ nome: "", valor: "" });
      setIsCriarModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a comanda.");
      console.error(error);
    }
  };

  // Função para encerrar uma comanda
  const encerrarComanda = async () => {
    if (!comandaSelecionada) return;

    try {
      await axios.put(
        `http://192.168.3.29/comandas/${comandaSelecionada.id}`,
        {
          ...comandaSelecionada,
          situacaocomanda: "Fechada",
        }
      );
      setComandas((prev) =>
        prev.map((c) =>
          c.id === comandaSelecionada.id
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

  // Função para deletar uma comanda
  const deletarComanda = async (id: number) => {
    try {
      await axios.delete(`http://192.168.3.29/comandas/${id}`);
      setComandas((prev) => prev.filter((c) => c.id !== id));
      Alert.alert("Sucesso", "Comanda deletada com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a comanda.");
      console.error(error);
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
        keyExtractor={(item) => item.id.toString()}
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
          </View>
        </View>
      </Modal>

      {/* Modal Detalhes da Comanda */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {comandaSelecionada && (
              <>
                <Text style={styles.modalTitle}>Detalhes da Comanda</Text>
                <Text style={styles.modalText}>
                  Nome: {comandaSelecionada.nomecomanda}
                </Text>
                <Text style={styles.modalText}>
                  Valor: R$ {comandaSelecionada.valorcomanda}
                </Text>
                <Text style={styles.modalText}>
                  Situação: {comandaSelecionada.situacaocomanda}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={encerrarComanda}
                >
                  <Text style={styles.modalButtonText}>Encerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => deletarComanda(comandaSelecionada.id)}
                >
                  <Text style={styles.modalButtonText}>Deletar</Text>
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
      marginBottom: 60,
    },
    criarButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
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
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      modalButton: {
        flex: 1,
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#3d2b19',
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
  });
  