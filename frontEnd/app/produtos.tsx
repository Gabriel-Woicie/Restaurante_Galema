import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Image } from 'react-native';

export default function ProdutosScreen() {
  // Dados mockados
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Hambúrguer', descricao: 'Delicioso hambúrguer artesanal', categoria: true, valor: 25.5, imagem: '' },
    { id: 2, nome: 'Cerveja', descricao: 'Cerveja artesanal', categoria: false, valor: 12.5, imagem: '' },
    { id: 3, nome: 'Pizza', descricao: 'Pizza de calabresa', categoria: true, valor: 45.0, imagem: '' },
    { id: 4, nome: 'Caipirinha', descricao: 'Caipirinha de limão', categoria: false, valor: 20.0, imagem: '' },
    { id: 5, nome: 'Pasta', descricao: 'Massa italiana', categoria: true, valor: 35.0, imagem: '' },
    { id: 6, nome: 'Coquetel', descricao: 'Coquetel tropical', categoria: false, valor: 22.0, imagem: '' },
  ]);

  const [pesquisa, setPesquisa] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(30);

  // Modais e estados
  const [isCriarModalVisible, setIsCriarModalVisible] = useState(false);
  const [isEditarModalVisible, setIsEditarModalVisible] = useState(false);
  const [isExcluirModalVisible, setIsExcluirModalVisible] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState<{ id: number; nome: string; descricao: string; categoria: boolean; valor: number; imagem: string } | null>(null);

  // Filtrar produtos com base na pesquisa
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Paginação
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const produtosExibidos = produtosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina > 0 && novaPagina <= totalPaginas) setPaginaAtual(novaPagina);
  };

  // Funções dos Modais
  const abrirCriarModal = () => setIsCriarModalVisible(true);
  const abrirEditarModal = (produto: { id: number; nome: string; descricao: string; categoria: boolean; valor: number; imagem: string }) => {
    setProdutoSelecionado(produto);
    setIsEditarModalVisible(true);
  };
  const abrirExcluirModal = (produto: { id: number; nome: string; descricao: string; categoria: boolean; valor: number; imagem: string }) => {
    setProdutoSelecionado(produto);
    setIsExcluirModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        placeholderTextColor="#aaa"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* Lista de produtos */}
      <FlatList
        data={produtosExibidos}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
            <View style={styles.productCard}>
              {/* Ícone da categoria */}
              <View style={styles.categoryIconContainer}>
                {item.categoria ? (
                  <Icon name="chef-hat" size={24} color="#000" /> // Ícone de cozinha
                ) : (
                  <Icon name="glass-cocktail" size={24} color="#000" /> // Ícone de drink
                )}
              </View>
        
              {/* Imagem e informações do produto */}
              <Image source={{ uri: item.imagem }} style={styles.productImage} />
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productDescription}>{item.descricao}</Text>
              
              {/* Botões de ação */}
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.editButton} onPress={() => abrirEditarModal(item)}>
                  <Text style={styles.secondaryButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => abrirExcluirModal(item)}>
                  <Text style={styles.buttonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
      />

      {/* Paginação */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => mudarPagina(paginaAtual - 1)}>
          <Text style={styles.paginationButton}>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>
          Página {paginaAtual} de {totalPaginas}
        </Text>
        <TouchableOpacity onPress={() => mudarPagina(paginaAtual + 1)}>
          <Text style={styles.paginationButton}>Próxima</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Criar Produto */}
      <TouchableOpacity style={styles.createButton} onPress={abrirCriarModal}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal Criar Produto */}
      <Modal visible={isCriarModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Criar Produto</Text>
            {/* Campos para criar produto */}
            <TextInput style={styles.input} placeholder="Nome" />
            <TextInput style={styles.input} placeholder="Descrição" />
            <TextInput style={styles.input} placeholder="Categoria (true ou false)" />
            <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Endereço da Imagem" />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsCriarModalVisible(false)}
              >
                <Text style={styles.modalButtonTextSecondary}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsCriarModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Editar Produto */}
      <Modal visible={isEditarModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Produto</Text>
            {/* Campos para editar produto */}
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={produtoSelecionado?.nome || ''}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={produtoSelecionado?.descricao || ''}
            />
            <TextInput
              style={styles.input}
              placeholder="Categoria (true ou false)"
              value={produtoSelecionado?.categoria ? 'true' : 'false'}
            />
            <TextInput
              style={styles.input}
              placeholder="Valor"
              value={produtoSelecionado?.valor.toString() || ''}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço da Imagem"
              value={produtoSelecionado?.imagem || ''}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsEditarModalVisible(false)}
              >
                <Text style={styles.modalButtonTextSecondary}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditarModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Excluir Produto */}
      <Modal visible={isExcluirModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir o produto "{produtoSelecionado?.nome}"?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setProdutos(produtos.filter((p) => p.id !== produtoSelecionado?.id));
                  setIsExcluirModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonTextSecondary}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsExcluirModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
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
        backgroundColor: '#f9f9f9',
      },
      searchBar: {
        height: 50,
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        elevation: 3,
      },
      productCard: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 4,
        maxWidth: '46%', // Para gerar dois por linha
        position: 'relative', // Necessário para posicionar o ícone
      },
      categoryIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        elevation: 4,
      },
      productImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        backgroundColor: '#ddd',
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
      },
      productDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
        textAlign: 'center',
      },
      cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      editButton: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
      },
      deleteButton: {
        backgroundColor: '#000',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
      },
      secondaryButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
      },
      pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 4,
      },
      paginationButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
      paginationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#777',
      },
      createButton: {
        position: 'absolute',
        bottom: 60,
        left: 310,
        right: 25,
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
      },
      createButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
      },
      modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalButton: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
      },
      cancelButton: {
        backgroundColor: '#000',
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      modalButtonTextSecondary: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });