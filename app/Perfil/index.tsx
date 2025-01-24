import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Alert, Image } from "react-native";
import { Button, Text } from 'react-native-paper';
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "expo-router";

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
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert("Error", "User is not authenticated.");
          return;
        }
        const decoded: any = jwtDecode(token);
        const userId = decoded.Id;
        const response = await axios.get(`${apiUrl}/api/getUser/${userId}`);
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      router.push('/'); // Adjust path as per your app's login route
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }} // Replace with actual profile image URL
          style={styles.profileImage}
        />
      </View>

      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{user?.name || "No Name Available"}</Text>
        <Text style={styles.userEmail}>{user?.email || "Not Available"}</Text>
      </View>

      {/* Additional Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{user?.age || "Not Available"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{user?.phone || "Not Available"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Nacionalidad:</Text>
          <Text style={styles.value}>{user?.nationality || "Not Available"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cédula:</Text>
          <Text style={styles.value}>{user?.nationalId || "Not Available"}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
  <Button
    mode="contained"
    buttonColor="#6200ee"
    style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }}
    labelStyle={{ fontSize: 16, lineHeight: 34 }}
    onPress={() => router.push(`/forgot-pwd`)}
  >
    Cambiar Contraseña
  </Button>
  <Button
    mode="contained"
    buttonColor="#6200ee"
    style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }}
    labelStyle={{ fontSize: 16, lineHeight: 34 }}
    onPress={() => router.push(`/Perfil/editProfile`)}
  >
    Editar Perfil
  </Button>
  <Button
    mode="contained"
    buttonColor="#d32f2f"
    style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }}
    labelStyle={{ fontSize: 16, lineHeight: 34 }}
    onPress={handleLogout}
  >
    Cerrar Sesión
  </Button>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#6200ee",
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  userEmail: {
    fontSize: 16,
    color: "#666666",
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  value: {
    fontSize: 16,
    color: "#555555",
  },
  buttonContainer: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#d32f2f",
  },
});
