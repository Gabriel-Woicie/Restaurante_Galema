import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import axios from 'axios';

export default function FuncionariosScreen() {
  interface Funcionario {
    id: number;
    nome: string;
    dataContratacao: string;
    salario: string;
    datademissao?: string | null;
  }
  
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [newFuncionario, setNewFuncionario] = useState({
    nome: '',
    dataContratacao: '',
    salario: '',
  });


  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);

  const URL = 'http://192.168.3.29:4005';

  // Buscar todos os funcionários
  const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(`${URL}/funcionario`);
        const data = response.data.map((func: any) => ({
          id: func.idfuncionario,
          nome: func.nomefuncionario,
          cargo: 'Não informado', // Adapte conforme necessário
          dataContratacao: func.datacontratacao,
          salario: func.salario,
        }));
        setFuncionarios(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        alert('Erro ao buscar funcionários. Verifique a conexão com o servidor.');
      }
    };

  useEffect(() => {
    fetchFuncionarios();
  }, []);
  // Criar um novo funcionário
  const handleCreateFuncionario = async () => {
    if (
      newFuncionario.nome.trim() &&
      newFuncionario.dataContratacao.trim() &&
      newFuncionario.salario.trim()
    ) {
      try {
        const response = await axios.post(`${URL}/funcionario`, {
          nomefuncionario: newFuncionario.nome,
          salario: newFuncionario.salario,
          datacontratacao: newFuncionario.dataContratacao,
          datademissao: null, // Novo funcionário não tem data de demissão
          situacaofuncionario: 1, // Ativo por padrão
        });
        if (response.status === 201) {
          alert("Funcionário criado com sucesso!");
          fetchFuncionarios(); // Atualiza a lista após criar
          setIsCreateModalVisible(false);
          setNewFuncionario({ nome: "", dataContratacao: "", salario: "" });
        }
      } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        alert("Erro ao criar funcionário. Tente novamente.");
      }
    } else {
      alert("Preencha todos os campos.");
    }
  };

  // Editar funcionário
  const handleEditFuncionario = async () => {
    if (selectedFuncionario) {
      try {
        const response = await axios.put(
          `${URL}/funcionario/${selectedFuncionario.id}`,
          {
            nomefuncionario: selectedFuncionario.nome,
            salario: selectedFuncionario.salario,
            datacontratacao: selectedFuncionario.dataContratacao,
            datademissao: null, // Pode ser ajustado pelo usuário futuramente
            situacaofuncionario: 1, // Exemplo: sempre ativo na edição
          }
        );
        if (response.status === 200) {
          alert("Funcionário atualizado com sucesso!");
          fetchFuncionarios(); // Atualiza a lista
          setIsEditModalVisible(false);
        }
        else {
          alert("Erro ao editar funcionário. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao editar funcionário:", error);
        alert("Erro ao editar funcionário. Tente novamente.");
      }
    }
  };
  

  // Deletar funcionário
  const handleDeleteFuncionario = async () => {
    if (selectedFuncionario) {
      try {
        const response = await axios.delete(
          `${URL}/funcionario/${selectedFuncionario.id}`
        );
        if (response.status === 200) {
          alert("Funcionário excluído com sucesso!");
          fetchFuncionarios(); // Atualiza a lista
          setIsDeleteModalVisible(false);
        }
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        alert("Erro ao excluir funcionário. Tente novamente.");
      }
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setIsCreateModalVisible(true)}
      >
        <Text style={styles.createButtonText}>Criar Funcionário</Text>
      </TouchableOpacity>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardText}>{item.nome}</Text>
              <Text style={styles.cardSubText}>Data: {item.dataContratacao}</Text>
              <Text style={styles.cardSubText}>Salário: R$ {item.salario}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setSelectedFuncionario(item);
                setIsEditModalVisible(true);
              }}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                setSelectedFuncionario(item);
                setIsDeleteModalVisible(true);
              }}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para Criar Funcionário */}
<Modal visible={isCreateModalVisible} transparent={true} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Criar Funcionário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do funcionário"
        value={newFuncionario.nome}
        onChangeText={(text) => setNewFuncionario({ ...newFuncionario, nome: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Contratação"
        value={newFuncionario.dataContratacao}
        onChangeText={(text) =>
          setNewFuncionario({ ...newFuncionario, dataContratacao: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Salário"
        keyboardType="numeric"
        value={newFuncionario.salario}
        onChangeText={(text) => setNewFuncionario({ ...newFuncionario, salario: text })}
      />
      <TouchableOpacity style={styles.modalButton} onPress={handleCreateFuncionario}>
        <Text style={styles.modalButtonText}>Criar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setIsCreateModalVisible(false)}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


{/* Modal para Editar Funcionário */}
<Modal visible={isEditModalVisible} transparent={true} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Editar Funcionário</Text>
      {selectedFuncionario && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nome do funcionário"
            value={selectedFuncionario.nome}
            onChangeText={(text) =>
              setSelectedFuncionario({ ...selectedFuncionario, nome: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Contratação"
            value={selectedFuncionario.dataContratacao}
            onChangeText={(text) =>
              setSelectedFuncionario({
                ...selectedFuncionario,
                dataContratacao: text,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Data de Demissão"
            value={selectedFuncionario.datademissao || ""}
            onChangeText={(text) =>
              setSelectedFuncionario({
                ...selectedFuncionario,
                datademissao: text || null,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Salário"
            keyboardType="numeric"
            value={selectedFuncionario.salario}
            onChangeText={(text) =>
              setSelectedFuncionario({ ...selectedFuncionario, salario: text })
            }
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleEditFuncionario}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsEditModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
</Modal>

{/* Modal para Excluir Funcionário */}
<Modal visible={isDeleteModalVisible} transparent={true} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Confirmação de Exclusão</Text>
      <Text style={styles.modalText}>
        Tem certeza que deseja remover o funcionário {selectedFuncionario?.nome || ""}?
      </Text>
      <TouchableOpacity style={styles.modalButton} onPress={handleDeleteFuncionario}>
        <Text style={styles.modalButtonText}>Sim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setIsDeleteModalVisible(false)}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubText: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
