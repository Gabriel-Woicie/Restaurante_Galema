import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { usePedido } from '../context/PedidoContext'; // Importando o contexto

export default function VenderScreen() {
  const router = useRouter();
  const { pedido, setPedido, totalItems, totalPrice } = usePedido(); // Usando o contexto
  const [produtos, setProdutos] = useState<{ idproduto: number; nomeproduto: string; valorproduto: number; }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Mock de produtos
    const produtosMockados = [
      { idproduto: 1, nomeproduto: 'Chopp Brahma', valorproduto: 16.0 },
      { idproduto: 2, nomeproduto: 'Caipirinhas', valorproduto: 25.0 },
      { idproduto: 3, nomeproduto: 'Filé de Tilápia', valorproduto: 32.5 },
      { idproduto: 4, nomeproduto: 'Chandon', valorproduto: 180.0 },
      { idproduto: 5, nomeproduto: 'Batata Frita', valorproduto: 12.0 },
      { idproduto: 6, nomeproduto: 'Cerveja Heineken', valorproduto: 8.0 },
      { idproduto: 7, nomeproduto: 'Coca-Cola', valorproduto: 5.0 },
      { idproduto: 8, nomeproduto: 'Água Mineral', valorproduto: 3.5 },
      { idproduto: 9, nomeproduto: 'Café Expresso', valorproduto: 3.0 },
      { idproduto: 10, nomeproduto: 'Bolo de Chocolate', valorproduto: 6.0 },
    ];
    setProdutos(produtosMockados);
  }, []);

  const adicionarAoPedido = (produto: { idproduto: number; nomeproduto: string; valorproduto: number; quantidade?: number }) => {
    setPedido((prevPedido) => {
      const produtoExistente = prevPedido.find((item) => item.idproduto === produto.idproduto);
      if (produtoExistente) {
        return prevPedido.map((item) =>
          item.idproduto === produto.idproduto ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prevPedido, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoPedido = (produto: { idproduto: number; nomeproduto: string; valorproduto: number; quantidade?: number }) => {
    setPedido((prevPedido) => {
      const produtoExistente = prevPedido.find((item) => item.idproduto === produto.idproduto);
      if (produtoExistente && produtoExistente.quantidade > 1) {
        return prevPedido.map((item) =>
          item.idproduto === produto.idproduto ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      } else {
        return prevPedido.filter((item) => item.idproduto !== produto.idproduto);
      }
    });
  };

  const finalizarPedido = () => {
    setIsModalVisible(false);
    router.push('/comandas'); // Navega para a página de comandas
  };

  const renderProduto = ({ item }: { item: { idproduto: number; nomeproduto: string; valorproduto: number; quantidade?: number } }) => {
    const quantidade = pedido.find((p) => p.idproduto === item.idproduto)?.quantidade || 0;
    return (
      <TouchableOpacity style={styles.card} onPress={() => adicionarAoPedido(item)}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.image} />
        <Text style={styles.nome}>{item.nomeproduto}</Text>
        <Text style={styles.valor}>R$ {item.valorproduto.toFixed(2)}</Text>
        {quantidade > 0 && (
          <View style={styles.quantidadeContainer}>
          <View style={styles.quantidade}>
            <Text style={styles.quantidadeTexto}>{quantidade}</Text>
          </View>
            <TouchableOpacity style={styles.removerBotao} onPress={() => removerDoPedido(item)}>
              <Text style={styles.removerTexto}>-</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.idproduto.toString()}
        renderItem={renderProduto}
        numColumns={2}
        contentContainerStyle={[styles.list, {paddingBottom: 80}]}
      />
      <View style={styles.pedidoBar}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.toggleButtonText}>Ver Pedido</Text>
        </TouchableOpacity>
        <View style={styles.pedidoResumo}>
          <Text style={styles.pedidoTexto}>Itens: {totalItems}</Text>
          <Text style={styles.pedidoTexto}>Total: R$ {totalPrice.toFixed(2)}</Text>
        </View>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Resumo do Pedido</Text>
          {pedido.map((item) => (
            <View key={item.idproduto} style={styles.modalItem}>
              <Text style={styles.modalItemText}>{item.nomeproduto}</Text>
              <Text style={styles.modalItemText}>
                R$ {(item.valorproduto * item.quantidade).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => removerDoPedido(item)}
              >
                <Text style={styles.modalButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.modalQuantidade}>{item.quantidade}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => adicionarAoPedido(item)}
              >
                <Text style={styles.modalButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.modalTotal}>Total: R$ {totalPrice.toFixed(2)}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: '#3d2b19' }]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: 'green' }]}
              onPress={finalizarPedido}
            >
              <Text style={styles.modalCloseButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    elevation: 4,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valor: {
    fontSize: 14,
    color: '#444',
  },
  quantidadeContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  quantidade: {
    backgroundColor: '#FF6347',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  quantidadeTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  removerBotao: {
    backgroundColor: '#FF6347',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removerTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pedidoBar: {
    backgroundColor: '#3d2b19',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    padding: 10,
  },
  toggleButton: {
    padding: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pedidoResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  pedidoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    flex: 2,
    fontSize: 16,
  },
  modalQuantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalCloseButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonContainer: {
    marginTop: 20,
  },
});
