import { View, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { TextInput, Text, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';


export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });


      const { token } = response.data;


      await AsyncStorage.setItem('userToken', token);


      setEmail('');
      setPassword('');

      router.push('/(tabs)/rocketStudent');

    } catch (error: any) {
      console.error('Error during login:', error.message);
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.toJSON());
        if (error.response) {

          Alert.alert('Login Failed', error.response.data.error || 'No error message provided');
        } else {
          Alert.alert('Error', 'Request did not reach server. Please check your API URL.');
        }
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    }

  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/images/loginpic.png')}
          style={{ width: 200, height: 200, marginBottom: 20 }}
        />
        <View
          style={{
            backgroundColor: '#6200ee',
            padding: 10,
            borderRadius: 2,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text variant="headlineLarge" style={{ color: 'white' }}>
            Rocket Girls
          </Text>
        </View>
        <Text variant="headlineMedium">Inicia Sesión</Text>

        <TextInput
          label="Correo Electrónico"
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          mode="outlined"
          style={{ width: 300, height: 50 }}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry
          style={{ width: 300, height: 50, marginBottom: 10 }}
        />

        <Link href="/forgot-pwd" style={{ marginBottom: 10 }}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>
            ¿Olvidaste tu Contraseña?
          </Text>
        </Link>


        <Button
          mode="contained"
          buttonColor="#6200ee"
          style={{ paddingHorizontal: 72, height: 56 }}
          labelStyle={{ fontSize: 16, lineHeight: 34 }}
          onPress={handleLogin}
        >
          Inicia Sesión
        </Button>

        <Link href="/register" style={{ marginTop: 10 }}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>
            Regístrate Aquí
          </Text>
        </Link>
      </View>
    </PaperProvider>
  );
}
