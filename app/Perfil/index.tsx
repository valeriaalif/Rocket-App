import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { Button, Card, Text, TextInput } from 'react-native-paper';
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from "expo-router"; // Corrected import

interface UserInfo {
  name: string;
  nationalId: string;
  age: string;
  phone: string;
  nationality: string;
  email: string;
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter(); // Initialize router
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the token
        const token = await AsyncStorage.getItem('userToken');
        console.log("Token:", token);
        if (!token) {
          Alert.alert("Error", "User is not authenticated.");
          return;
        }

        // Decode the token
        const decoded: any = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        const userId = decoded.Id;

        // Fetch user data
        const response = await axios.get(`${apiUrl}/api/getUser/${userId}`);
        console.log("Fetched user data:", response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [apiUrl]);

  // Logout function
     const handleLogout = async () => {
      try {
        // Remove token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
  
        // Optionally show a confirmation alert
        Alert.alert('Logged Out', 'You have been logged out successfully.');
  
        // Redirect user to login screen
        router.push('/');  // Adjust path as per your app's login route
      } catch (error) {
        Alert.alert('Error', 'Something went wrong while logging out.');
      }
    };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 20 }}>
          {user?.name || "No Name Available"}
        </Text>

        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
         Correo Electrónico
        </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{user?.email || "Not Available"}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
          Edad
        </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{user?.age || "Not Available"}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
          Teléfono
        </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{user?.phone || "Not Available"}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
         Nacionalidad
        </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{user?.nationality || "Not Available"}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
        Cédula
        </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{user?.nationalId || "Not Available"}</Text>

                <Button 
                  mode="contained" 
                  buttonColor="#6200ee"
                  style={{ paddingHorizontal: 2, height: 56 }} 
                  labelStyle={{ fontSize: 16, lineHeight: 34 }}
                  onPress={() => router.push(`/forgot-pwd`)}
                >
                  Cambiar Contraseña
                </Button>

                <Button 
                  mode="contained" 
                  buttonColor="#6200ee"
                  style={{ paddingHorizontal: 2, height: 56 }} 
                  labelStyle={{ fontSize: 16, lineHeight: 34 }}
                  onPress={() => router.push(`/Perfil/editProfile` )}
                >
                  Edita Perfil
                </Button>

                
                <Button 
                  mode="contained" 
                  buttonColor="#6200ee"
                  style={{ paddingHorizontal: 2, height: 56 }} 
                  labelStyle={{ fontSize: 16, lineHeight: 34 }}
                  onPress={ handleLogout}
                >
                  Cerrar Sesión
                </Button>
      </View>
    </ScrollView>
  );
}
