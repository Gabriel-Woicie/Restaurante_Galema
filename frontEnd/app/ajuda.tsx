import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Biblioteca de ícones

export default function AjudaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Icon name="help-circle" size={30} color="#000" />
        <Text style={styles.cardTitle}>Dúvidas Frequentes</Text>
        <Text style={styles.cardDescription}>Aqui você encontra respostas para as dúvidas mais comuns.</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Ir para FAQ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="clipboard-text" size={30} color="#000" />
        <Text style={styles.cardTitle}>Instruções Básicas</Text>
        <Text style={styles.cardDescription}>Aprenda como usar o sistema rapidamente e de forma eficaz.</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Ver Instruções</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="phone" size={30} color="#000" />
        <Text style={styles.cardTitle}>Suporte</Text>
        <Text style={styles.cardDescription}>Se você precisar de ajuda adicional, entre em contato com o suporte.</Text>
        <TouchableOpacity style={styles.cardButton} onPress={() => Linking.openURL('tel:49991450207')}>
          <Text style={styles.cardButtonText}>Ligar para o Suporte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Icon name="email" size={30} color="#000" />
        <Text style={styles.cardTitle}>Enviar Feedback</Text>
        <Text style={styles.cardDescription}>Compartilhe suas sugestões ou problemas com a equipe de desenvolvimento.</Text>
        <TouchableOpacity style={styles.cardButton} onPress={() => Linking.openURL('https://wa.me/55049991450207')}>
          <Text style={styles.cardButtonText}>Enviar Feedback</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© 2024 Galema App. Todos os direitos reservados.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
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
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    padding: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    color: '#909091',
    textAlign: 'center',
    marginTop: 20,
  },
});
