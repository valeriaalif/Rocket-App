import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert, StyleSheet } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { router } from "expo-router";


interface UserInfo {
  userId: string;
  name: string;
  nationalId: string;
  age: string;
  phone: string;
  nationality: string;
  email: string;
}

export default function EditProfile() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [editableUser, setEditableUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const storedToken = await AsyncStorage.getItem('userToken');

        if (!storedToken) {
          Alert.alert("Error", "User is not authenticated.");
          return;
        }
        setToken(storedToken);


        const decoded: any = jwtDecode(storedToken);
        const userId = decoded.Id;
        const response = await axios.get(`${apiUrl}/api/getUser/${userId}`);
        setUser(response.data);
        setEditableUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };
    fetchUser();
  }, [apiUrl]);

  const handleFieldChange = (field: keyof UserInfo, value: string) => {
    if (editableUser) {
      setEditableUser({ ...editableUser, [field]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (!editableUser || !token) {
        Alert.alert("Error", "Missing required data.");
        return;
      }

      const decoded: any = jwtDecode(token);
      const userId = decoded.Id;


      await axios.put(
        `${apiUrl}/api/updateUser/${userId}`,
        editableUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Perfil Modificado", "Se han guardado los cambios");
      router.push("/Perfil/")
    } catch (err) {
      console.error("Error updating user:", err);
      Alert.alert("Error", "Failed to update the user.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Editar Perfil
        </Text>

        <Text style={{ marginBottom: 4 }}>Nombre</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="Name"
          mode="outlined"
          value={editableUser?.name}
          onChangeText={(text) => handleFieldChange('name', text)}
        />
        <Text style={{ marginBottom: 4 }}>Cédula</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="National ID"
          mode="outlined"
          value={editableUser?.nationalId}
          onChangeText={(text) => handleFieldChange('nationalId', text)}
        />
        <Text style={{ marginBottom: 4 }}>Edad</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="Age"
          mode="outlined"
          keyboardType="numeric"
          value={editableUser?.age}
          onChangeText={(text) => handleFieldChange('age', text)}
        />
        <Text style={{ marginBottom: 4 }}>Número de Teléfono</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="Phone"
          mode="outlined"
          keyboardType="phone-pad"
          value={editableUser?.phone}
          onChangeText={(text) => handleFieldChange('phone', text)}
        />
        <Text style={{ marginBottom: 4 }}>Nacionalidad</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="Nationality"
          mode="outlined"
          value={editableUser?.nationality}
          onChangeText={(text) => handleFieldChange('nationality', text)}
        />
        <Text style={{ marginBottom: 4 }}>Correo Electrónico</Text>
        <TextInput
          style={{ marginBottom: 15, fontSize: 16 }}
          placeholder="Email"
          keyboardType="email-address"
          mode="outlined"
          value={editableUser?.email}
          onChangeText={(text) => handleFieldChange('email', text)}
        />


        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            buttonColor="#6200ee"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleSubmit}
          >
            Guardar Cambios
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 80,
    height: 60,
    marginLeft: 22,
  },
  buttonLabel: {
    fontSize: 15,
    lineHeight: 35,
  },

})
