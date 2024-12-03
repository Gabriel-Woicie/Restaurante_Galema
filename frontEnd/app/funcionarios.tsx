import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';

export default function FuncionariosScreen() {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Garçom', dataContratacao: '01/01/2023', salario: '1500.00' },
    { id: 2, nome: 'Maria Oliveira', cargo: 'Cozinheira', dataContratacao: '15/02/2023', salario: '2000.00' },
    { id: 3, nome: 'Carlos Santos', cargo: 'Gerente', dataContratacao: '10/03/2023', salario: '3000.00' },
  ]);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [newFuncionario, setNewFuncionario] = useState({
    nome: '',
    cargo: '',
    dataContratacao: '',
    salario: '',
  });

  const [selectedFuncionario, setSelectedFuncionario] = useState<{
    id: number;
    nome: string;
    cargo: string;
    dataContratacao: string;
    salario: string;
  } | null>(null);

  const handleCreateFuncionario = () => {
    if (
      newFuncionario.nome.trim() &&
      newFuncionario.cargo.trim() &&
      newFuncionario.dataContratacao.trim() &&
      newFuncionario.salario.trim()
    ) {
      const newFunc = {
        id: funcionarios.length + 1,
        ...newFuncionario,
      };
      setFuncionarios([...funcionarios, newFunc]);
      setNewFuncionario({ nome: '', cargo: '', dataContratacao: '', salario: '' });
      setIsCreateModalVisible(false);
    } else {
      alert('Preencha todos os campos.');
    }
  };

  const handleEditFuncionario = () => {
    if (selectedFuncionario) {
      setFuncionarios(
        funcionarios.map((func) =>
          func.id === selectedFuncionario.id ? { ...selectedFuncionario } : func
        )
      );
      setIsEditModalVisible(false);
    }
  };

  const handleDeleteFuncionario = () => {
    if (selectedFuncionario) {
      setFuncionarios(funcionarios.filter((func) => func.id !== selectedFuncionario.id));
      setIsDeleteModalVisible(false);
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
              <Text style={styles.cardSubText}>Cargo: {item.cargo}</Text>
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
              placeholder="Cargo"
              value={newFuncionario.cargo}
              onChangeText={(text) => setNewFuncionario({ ...newFuncionario, cargo: text })}
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
              <Text style={styles.cancelButtonText}>Fechar</Text>
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
                  placeholder="Cargo"
                  value={selectedFuncionario.cargo}
                  onChangeText={(text) =>
                    setSelectedFuncionario({ ...selectedFuncionario, cargo: text })
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
                  <Text style={styles.cancelButtonText}>Fechar</Text>
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
              Tem certeza que deseja remover o funcionário{' '}
              {selectedFuncionario?.nome || ''}?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteFuncionario}
            >
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
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
