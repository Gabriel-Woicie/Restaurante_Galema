import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfiguracoesScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleTheme = () => setIsDarkMode((prevState) => !prevState);
  const toggleNotifications = () => setNotificationsEnabled((prevState) => !prevState);

  const handleLogout = () => {
    Alert.alert('Sair da Conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => { console.log('Usuário deslogado'); router.dismissAll(); router.replace('/')} },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.card}>
        <Icon name="theme-light-dark" size={30} color="#3E4E50" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Modo Escuro</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={styles.card}>
        <Icon name="bell-ring" size={30} color="#3E4E50" />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Notificações</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>

      <View style={styles.card}>
        <Icon name="translate" size={30} color="#3E4E50" />
        <TouchableOpacity style={styles.cardContent}>
          <Text style={styles.cardTitle}>Idioma</Text>
          <Text style={styles.cardSubText}>Português</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="account-circle" size={30} color="#3E4E50" />
        <TouchableOpacity style={styles.cardContent}>
          <Text style={styles.cardTitle}>Perfil do Usuário</Text>
          <Text style={styles.cardSubText}>Editar Informações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="information" size={30} color="#3E4E50" />
        <TouchableOpacity style={styles.cardContent}>
          <Text style={styles.cardTitle}>Sobre o App</Text>
          <Text style={styles.cardSubText}>Versão 1.0.0</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={30} color="#fff" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF3E0',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E4E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#D9E4DD',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E4E50',
  },
  cardSubText: {
    fontSize: 14,
    color: '#3E4E50',
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
