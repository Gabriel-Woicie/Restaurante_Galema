import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useComanda } from '../context/ComandaContext'; // Importando o contexto para obter a comanda selecionada

const Pedido = () => {
  const { idComandaSelecionada } = useComanda();
  interface ProdutoComanda {
    idprodcomanda: number;
    nomeproduto: string;
    valorproduto: number;
    itemqtdade: number;
  }
  
  const [produtosComanda, setProdutosComanda] = useState<ProdutoComanda[]>([]);
  const [comandaInfo, setComandaInfo] = useState({ nomecomanda: '', valorcomanda: 0 });

  useEffect(() => {
    if (idComandaSelecionada) {
      // Buscando os produtos da comanda
      axios
        .get(`http://192.168.3.29:4005/produtoscomanda/${idComandaSelecionada}`)
        .then((response) => {
          setProdutosComanda(response.data);
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível carregar os produtos da comanda');
          console.error(error);
        });

      // Buscando informações da comanda (nome e valor)
      axios
        .get(`http://192.168.3.29:4005/comandas/${idComandaSelecionada}`)
        .then((response) => {
          setComandaInfo({
          nomecomanda: response.data.nomecomanda,
          valorcomanda: parseFloat(response.data.valorcomanda) || 0,
        })
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível carregar os dados da comanda');
          console.error(error);
        });
    }
  }, [idComandaSelecionada]);

  const atualizarQuantidade = async (idProdutoComanda: number, operacao: 'incrementar' | 'decrementar') => {
    try {
      const produtoComanda = produtosComanda.find((item) => item.idprodcomanda === idProdutoComanda);
      if (!produtoComanda) {
        Alert.alert('Erro', 'Produto não encontrado');
        return;
      }
      const novaQtd = operacao === 'incrementar' ? produtoComanda.itemqtdade + 1 : produtoComanda.itemqtdade - 1;

      if (novaQtd < 1) return; // Impede que a quantidade vá para 0 ou negativa

      await axios.put(`http://192.168.3.29:4005/produtoscomanda/${idProdutoComanda}`, {
        itemqtdade: novaQtd,
      });

      // Atualizar a lista localmente
      setProdutosComanda((prev) =>
        prev.map((produto) =>
          produto.idprodcomanda === idProdutoComanda ? { ...produto, itemqtdade: novaQtd } : produto
        )
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a quantidade do produto');
      console.error(error);
    }
  };

  const renderProduto = ({ item }: { item: ProdutoComanda }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.nomeproduto}</Text>
      <Text style={styles.cardInfo}>Preço: R$ {item.valorproduto.toFixed(2)}</Text>
      <Text style={styles.cardInfo}>Quantidade: {item.itemqtdade}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSubtrair]}
          onPress={() => atualizarQuantidade(item.idprodcomanda, 'decrementar')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonAdicionar]}
          onPress={() => atualizarQuantidade(item.idprodcomanda, 'incrementar')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Informações da Comanda */}
      <View style={styles.comandaInfo}>
        <Text style={styles.comandaName}>{comandaInfo.nomecomanda}</Text>
        <Text style={styles.comandaValue}>Valor Total: R$ {comandaInfo.valorcomanda.toFixed(2)}</Text>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={produtosComanda}
        keyExtractor={(item) => item.idprodcomanda.toString()}
        renderItem={renderProduto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  comandaInfo: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  comandaName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comandaValue: {
    fontSize: 16,
    color: '#555',
  },
  lista: {
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonSubtrair: {
    backgroundColor: '#FF6347',
  },
  buttonAdicionar: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pedido;
