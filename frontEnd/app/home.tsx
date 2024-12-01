import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Biblioteca de ícones

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/vender')}>
        <Icon name="cart" size={40} color="#fff" />
        <Text style={styles.textPrimary}>Vender</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="table-chair" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Mesas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="account-group" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Funcionários</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="package-variant" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="chart-line" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Produtos mais vendidos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="clipboard-list" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Pedidos Abertos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="history" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Histórico de Pedidos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="calendar-check" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="cog" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Configurações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="file-chart" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="comment-alert" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Feedback dos Clientes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="warehouse" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Inventário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="sale" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Promoções</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box}>
          <Icon name="credit-card" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Pagamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="help-circle" size={30} color="#3E4E50" />
          <Text style={styles.textSecondary}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF3E0',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  mainButton: {
    backgroundColor: '#8B5E3C',
    height: 110,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#D9E4DD',
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
  },
  textPrimary: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  textSecondary: {
    color: '#3E4E50',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});
