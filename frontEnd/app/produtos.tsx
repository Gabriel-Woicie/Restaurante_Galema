import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, Image, Alert } from 'react-native';

export default function ProdutosScreen() {
  const [produtos, setProdutos] = useState<{ id: number; nome: string; descricao: string; categoria: boolean; valor: number; imagem: string }[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(30);

  const [isCriarModalVisible, setIsCriarModalVisible] = useState(false);
  const [isEditarModalVisible, setIsEditarModalVisible] = useState(false);
  const [isExcluirModalVisible, setIsExcluirModalVisible] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState<{ idproduto: number; nomeproduto: string; descricao: string; categoria: boolean; valorproduto: number; imagem: string } | null>(null);
  const [novoProduto, setNovoProduto] = useState({ nomeproduto: '', descricao: '', categoria: '', valorproduto: '', imagem: '' });

  const URL = 'http://192.168.3.29:4005';

  // Fetch inicial para obter os produtos
  const fetchProdutos = async () => {
    try {
      const response = await fetch(`${URL}/produtos`);
      const data = await response.json();
      const produtosFormatados = data.map((produto: any) => ({
        id: produto.idproduto,
        nome: produto.nomeproduto,
        descricao: produto.descricao,
        categoria: produto.categoria,
        valor: parseFloat(produto.valorproduto),
        imagem: produto.imagem,
      }));
      setProdutos(produtosFormatados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para lidar com a criação de produto
  const criarProduto = async (novoProduto: { nomeproduto: string; descricao: string; categoria: boolean; valorproduto: number; imagem: string }) => {
    try {
      await fetch(`${URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });
      Alert.alert('Sucesso', 'Produto criado com sucesso!');
      setIsCriarModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o produto.');
    }
  };

  // Função para abrir o modal de edição
  interface Produto {
    id: number;
    nome: string;
    descricao: string;
    categoria: boolean;
    valor: number;
    imagem: string;
  }

  const abrirEditarModal = (produto: Produto) => {
      setProdutoSelecionado({
          idproduto: produto.id,
          nomeproduto: produto.nome,
          descricao: produto.descricao,
          categoria: produto.categoria,
          valorproduto: produto.valor,
          imagem: produto.imagem,
      });
      setIsEditarModalVisible(true);
  };

  // Função para abrir o modal de exclusão
  const abrirExcluirModal = (produto: any) => {
    setProdutoSelecionado(produto);
    setIsExcluirModalVisible(true);
  };

  // Função para editar produto
  const editarProduto = async () => {
    try {
      const response = await fetch(`${URL}/produtos/${produtoSelecionado?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoSelecionado),
      });
      if (response.ok) {
        fetchProdutos(); // Atualiza a lista
        setIsEditarModalVisible(false);
      } else {
        console.error('Erro ao editar produto');
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Filtro e paginação
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const produtosExibidos = produtosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina > 0 && novaPagina <= totalPaginas) setPaginaAtual(novaPagina);
  };


// Excluir Produto
const excluirProduto = async () => {
  try {
    const response = await fetch(`${URL}/produtos/${produtoSelecionado?.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchProdutos(); // Atualiza a lista
      setIsExcluirModalVisible(false);
    } else {
      console.error('Erro ao excluir produto');
    }
  } catch (error) {
    console.error(error);
  }
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
            <View style={styles.categoryIconContainer}>
              {item.categoria ? (
                <Icon name="chef-hat" size={24} color="#000" />
              ) : (
                <Icon name="glass-cocktail" size={24} color="#000" />
              )}
            </View>
            <Image key={item.id} source={{ uri: item.imagem }} style={styles.productImage} />
            <Text style={styles.productName}>{item.nome}</Text>
            <Text style={styles.productDescription}>{item.descricao}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.editButton} onPress={() => abrirEditarModal(item)}>
                <Text style={styles.secondaryButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => abrirExcluirModal(item)}
              >
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
      <TouchableOpacity style={styles.createButton} onPress={() => setIsCriarModalVisible(true)}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal Criar Produto */}
<Modal visible={isCriarModalVisible} transparent animationType="slide">
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Criar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={novoProduto.nomeproduto}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, nomeproduto: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={novoProduto.descricao}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, descricao: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (true ou false)"
        value={String(novoProduto.categoria)}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, categoria: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={String(novoProduto.valorproduto)}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, valorproduto: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço da Imagem"
        value={novoProduto.imagem}
        onChangeText={(text) => setNovoProduto({ ...novoProduto, imagem: text })}
      />
      <View style={styles.modalActions}>
        <TouchableOpacity style={styles.modalButton} onPress={() => criarProduto({
          ...novoProduto,
          categoria: novoProduto.categoria.toLowerCase() === 'true',
          valorproduto: parseFloat(novoProduto.valorproduto)
        })}>
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
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={produtoSelecionado?.nomeproduto || ''}
        onChangeText={(text) => setProdutoSelecionado(produtoSelecionado ? { ...produtoSelecionado, nomeproduto: text } : null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={produtoSelecionado?.descricao || ''}
        onChangeText={(text) => setProdutoSelecionado(produtoSelecionado ? { ...produtoSelecionado, descricao: text } : null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (true ou false)"
        value={produtoSelecionado?.categoria || ''} 
        onChangeText={(text) => setProdutoSelecionado(produtoSelecionado ? { ...produtoSelecionado, categoria: text.toLowerCase() === 'true' } : null)}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={String(produtoSelecionado?.valorproduto || '')}
        onChangeText={(text) =>
          setProdutoSelecionado(produtoSelecionado ? { ...produtoSelecionado, valorproduto: text } : null)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço da Imagem"
        value={produtoSelecionado?.imagem || ''}
        onChangeText={(text) => setProdutoSelecionado(produtoSelecionado ? { ...produtoSelecionado, imagem: text } : null)}
      />
      <View style={styles.modalActions}>
        <TouchableOpacity style={styles.modalButton} onPress={editarProduto}>
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
        <TouchableOpacity style={styles.modalButton} onPress={excluirProduto}>
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