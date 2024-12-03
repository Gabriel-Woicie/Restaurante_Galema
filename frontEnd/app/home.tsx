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
        <TouchableOpacity style={styles.box} onPress={() => router.push('/comandasMain')} >
          <Icon name="clipboard-list" size={30} color="#000" />
          <Text style={styles.textSecondary}>Comandas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => router.push('/funcionarios')}>
          <Icon name="account-group" size={30} color="#000" />
          <Text style={styles.textSecondary}>Funcionários</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => router.push('/produtos')}>
          <Icon name="package-variant" size={30} color="#000" />
          <Text style={styles.textSecondary}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Icon name="file-chart" size={30} color="#000" />
          <Text style={styles.textSecondary}>Relatórios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={() => router.push('/configuracoes')}>
          <Icon name="cog" size={30} color="#000" />
          <Text style={styles.textSecondary}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => router.push('/ajuda')}>
          <Icon name="help-circle" size={30} color="#000" />
          <Text style={styles.textSecondary}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="calendar-check" size={30} color="#909091" />
          <Text style={styles.textInactive}>Reservas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="credit-card" size={30} color="#909091" />
          <Text style={styles.textInactive}>Pagamentos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="file-chart" size={30} color="#909091" />
          <Text style={styles.textInactive}>Promoções</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="comment-alert" size={30} color="#909091" />
          <Text style={styles.textInactive}>Feedback dos Clientes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="account" size={30} color="#909091" />
          <Text style={styles.textInactive}>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveBox}>
          <Icon name="sale" size={30} color="#909091" />
          <Text style={styles.textInactive}>Promoções</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  mainButton: {
    backgroundColor: '#000',
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
    backgroundColor: '#fff',
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  inactiveBox: {
    backgroundColor: '#C5C5C7',
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
  textInactive: {
    color: '#909091',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});
