import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const URL = 'http://192.168.3.29:4005';

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${URL}/verificarLogin?usuario=${username}&senha=${password}`);
      const data = await response.json();

      if (response.ok && data.success) {
        router.replace('/home');
      } else {
        Alert.alert('Erro', data.message || 'Usuário ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente mais tarde.');
      console.error(error);
    }
  };

  const backgroundImage = require('../assets/images/backg.jpg');
  const logoImage = require('../assets/images/logo2.png');

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={logoImage}
            style={{ width: 80, height: 100, position: 'absolute', borderRadius: 10 }}
          />
        </ImageBackground>
      </View>

      {/* Login Section */}
      <View style={styles.loginSection}>
        <Text style={styles.title}>Bem-Vindo</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#888"
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topSection: {
    flex: 1,
    backgroundColor: "#000",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  logoWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logo: {
    fontSize: 30,
    color: "#000",
  },
  loginSection: {
    flex: 2,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
  signUp: {
    color: "#000",
    fontWeight: "bold",
  },
});
