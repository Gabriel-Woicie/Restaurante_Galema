import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useComanda } from '../context/ComandaContext';
import { useRouter } from 'expo-router';

const Pedido = () => {
  const { idComandaSelecionada } = useComanda();

  interface ProdutoComandaDetalhe {
    idprodcomanda: number;
    nomeproduto: string;
    itemqtdade: number;
    valorproduto: string;
  }
  const router = useRouter();
  const [produtosComandaDetalhes, setProdutosComandaDetalhes] = useState<ProdutoComandaDetalhe[]>([]);
  const [comandaInfo, setComandaInfo] = useState({ nomecomanda: '', valorcomanda: 0 });
  const URL = 'http://192.168.3.29:4005';

  useEffect(() => {
    if (idComandaSelecionada) {
      axios
        .get(`${URL}/produtoscomanda/detalhes/${idComandaSelecionada}`)
        .then((response) => {
          setProdutosComandaDetalhes(response.data);
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível carregar os produtos da comanda.');
          console.error(error);
        });

      axios
        .get(`${URL}/comandas/${idComandaSelecionada}`)
        .then((response) => {
          setComandaInfo({
            nomecomanda: response.data.nomecomanda,
            valorcomanda: parseFloat(response.data.valorcomanda) || 0,
          });
        })
        .catch((error) => {
          Alert.alert('Erro', 'Não foi possível carregar os dados da comanda.');
          console.error(error);
        });
    }
  }, [idComandaSelecionada]);

  const updateQuantity = (id: number, change: number) => {
    const updatedProducts = produtosComandaDetalhes.map((item) => {
      if (item.idprodcomanda === id) {
        const newQuantity = item.itemqtdade + change;
        return { ...item, itemqtdade: Math.max(newQuantity, 0) };
      }
      return item;
    });

    setProdutosComandaDetalhes(updatedProducts);

    const newTotal = updatedProducts.reduce(
      (sum, item) => sum + item.itemqtdade * parseFloat(item.valorproduto || '0'),
      0
    );
    setComandaInfo((prev) => ({ ...prev, valorcomanda: newTotal }));
  };

  const handleSave = async () => {
    try {
      for (const product of produtosComandaDetalhes) {
        await axios.put(`${URL}/produtoscomanda/${product.idprodcomanda}`, {
          itemqtdade: product.itemqtdade,
        });
      }
      Alert.alert('Sucesso', 'Alterações salvas com sucesso!');
      router.dismissAll();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Comanda: {comandaInfo.nomecomanda}</Text>
      </View>

      <FlatList
        data={produtosComandaDetalhes}
        keyExtractor={(item) => item.idprodcomanda.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateQuantity(item.idprodcomanda, -1)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <View style={styles.cardInfo}>
                <Text style={styles.cardText}>{item.nomeproduto || 'Desconhecido'}</Text>
                <Text style={styles.cardText}>Qtd: {item.itemqtdade}</Text>
                <Text style={styles.cardText}>
                  R$ {parseFloat(item.valorproduto || '0').toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => updateQuantity(item.idprodcomanda, 1)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum produto encontrado nesta comanda.</Text>}
      />

      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>
          Valor Total: R$ {comandaInfo.valorcomanda.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'black',
    padding: 10,
  },
  topBarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomBar: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  bottomBarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Pedido;
