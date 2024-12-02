import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';

export default function ComandasMain() {
  const [toggleAtivo, setToggleAtivo] = useState(true); // Estado do toggle bar
  interface Comanda {
    id: number;
    nome: string;
    situacao: string;
    valor: string;
    idFuncionario: number;
    idPedido: number;
    ativa: boolean;
  }

  const [comandas, setComandas] = useState<Comanda[]>([]); // Lista de comandas
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal para detalhes da comanda
  const [isCriarModalVisible, setIsCriarModalVisible] = useState(false); // Modal para criar comanda
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null); // Comanda selecionada
  const [novaComandaNome, setNovaComandaNome] = useState(''); // Nome da nova comanda
  const [novaComandaValor, setNovaComandaValor] = useState(''); // Valor da nova comanda

  const itensPorPagina = 20;

  useEffect(() => {
    const mockComandas = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      nome: `Comanda ${i + 1}`,
      situacao: i % 2 === 0 ? 'Aberta' : 'Fechada',
      valor: (Math.random() * 200).toFixed(2),
      idFuncionario: Math.floor(Math.random() * 10) + 1,
      idPedido: Math.floor(Math.random() * 1000) + 1,
      ativa: i % 2 === 0,
    }));
    setComandas(mockComandas);
  }, []);

  const comandasFiltradas = comandas.filter((c) => c.ativa === toggleAtivo);
  const comandasPaginadas = comandasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const abrirComandaDetalhes = (comanda: Comanda) => {
    setComandaSelecionada(comanda);
    setIsModalVisible(true);
  };

  const encerrarComanda = () => {
    if (comandaSelecionada) {
      setComandas((prevComandas) =>
        prevComandas.map((c) =>
          c.id === comandaSelecionada.id ? { ...c, ativa: false, situacao: 'Fechada' } : c
        )
      );
      setIsModalVisible(false);
    }
  };

  const criarComanda = () => {
    if (novaComandaNome) {
      const novaComanda = {
        id: comandas.length + 1,
        nome: novaComandaNome,
        situacao: 'Aberta',
        valor: parseFloat(novaComandaValor).toFixed(2),
        idFuncionario: Math.floor(Math.random() * 10) + 1,
        idPedido: Math.floor(Math.random() * 1000) + 1,
        ativa: true,
      };
      setComandas((prevComandas) => [novaComanda, ...prevComandas]);
      setNovaComandaNome('');
      setNovaComandaValor('');
      setIsCriarModalVisible(false);
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
          <TouchableOpacity style={styles.card} onPress={() => abrirComandaDetalhes(item)}>
            <Text style={styles.cardText}>{item.nome}</Text>
            <Text style={styles.cardInfo}>Valor: R$ {item.valor}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.lista}
      />

      {/* Paginação */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={paginaAtual === 1}
          onPress={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
          style={[styles.paginationButton, paginaAtual === 1 && styles.paginationButtonDisabled]}
        >
          <Text style={styles.paginationText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationInfo}>Página {paginaAtual}</Text>
        <TouchableOpacity
          disabled={paginaAtual * itensPorPagina >= comandasFiltradas.length}
          onPress={() =>
            setPaginaAtual((prev) =>
              prev * itensPorPagina < comandasFiltradas.length ? prev + 1 : prev
            )
          }
          style={[
            styles.paginationButton,
            paginaAtual * itensPorPagina >= comandasFiltradas.length && styles.paginationButtonDisabled,
          ]}
        >
          <Text style={styles.paginationText}>Próximo</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Criar Comanda */}
      <TouchableOpacity
        style={styles.criarButton}
        onPress={() => setIsCriarModalVisible(true)}
      >
        <Text style={styles.criarButtonText}>Criar Comanda</Text>
      </TouchableOpacity>

      {/* Modal de Detalhes da Comanda */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
         <View style={styles.modalContainer}>
          {comandaSelecionada && (
            <>
              <Text style={styles.modalTitle}>Detalhes da Comanda</Text>
              <Text style={styles.modalText}>ID: {comandaSelecionada.id}</Text>
              <Text style={styles.modalText}>Nome: {comandaSelecionada.nome}</Text>
              <Text style={styles.modalText}>Situação: {comandaSelecionada.situacao}</Text>
              <Text style={styles.modalText}>Valor: R$ {comandaSelecionada.valor}</Text>
              <Text style={styles.modalText}>ID Funcionário: {comandaSelecionada.idFuncionario}</Text>
              <Text style={styles.modalText}>ID Pedido: {comandaSelecionada.idPedido}</Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Fechar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'green' }]}
                  onPress={encerrarComanda}
                >
                  <Text style={styles.modalButtonText}>Encerrar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
         </View>
        </View>
      </Modal>

      {/* Modal Criar Comanda */}
      <Modal visible={isCriarModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Criar Nova Comanda</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Comanda"
            value={novaComandaNome}
            onChangeText={setNovaComandaNome}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: 'red' }]}
              onPress={() => setIsCriarModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: 'green' }]}
              onPress={criarComanda}
            >
              <Text style={styles.modalButtonText}>Criar</Text>
            </TouchableOpacity>
          </View>
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
      backgroundColor: '#3d2b19',
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
    },
    toggleButtonAtivo: {
      borderBottomWidth: 4,
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
      backgroundColor: '#3d2b19',
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
      backgroundColor: '#3d2b19',
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
  