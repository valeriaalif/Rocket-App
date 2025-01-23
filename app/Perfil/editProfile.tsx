import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { Button, Card, Text, TextInput } from 'react-native-paper';
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { Link, router } from "expo-router";

interface UserInfo {
  userId : string;
  name: string;
  nationalId: string;
  age: string;
  phone: string;
  nationality: string;
  email: string;
}

export default function EditProfile(){

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [editableUser, setEditableUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null); // Add state for the token
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the token
        const storedToken = await AsyncStorage.getItem('userToken');
        console.log("Token:", token);

        if (!storedToken) {
          Alert.alert("Error", "User is not authenticated.");
          return;
        }
        setToken(storedToken); // Save token to state

        // Decode the token
        const decoded: any = jwtDecode(storedToken);
        const userId = decoded.Id;

        // Fetch user data
        const response = await axios.get(`${apiUrl}/api/getUser/${userId}`);
        console.log("Fetched user data:", response.data);
        setUser(response.data);
        setEditableUser(response.data); // Set editable user data
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
  
        // Decode the token to get userId
        const decoded: any = jwtDecode(token);
        const userId = decoded.Id;
  
        // Send updated data to the API
        await axios.put(
          `${apiUrl}/api/updateUser/${userId}`,
          editableUser,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the saved token
            },
          }
        );
  
        Alert.alert("Success", "User data updated successfully!");
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

    return(
        <ScrollView>
              <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Edit Profile
        </Text>

        {/* Input Fields */}
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="Name"
          mode="outlined"
          value={editableUser?.name}
          onChangeText={(text) => handleFieldChange('name', text)}
        />
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="National ID"
         mode="outlined"
          value={editableUser?.nationalId}
          onChangeText={(text) => handleFieldChange('nationalId', text)}
        />
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="Age"
            mode="outlined"
          keyboardType="numeric"
          value={editableUser?.age}
          onChangeText={(text) => handleFieldChange('age', text)}
        />
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="Phone"
            mode="outlined"
          keyboardType="phone-pad"
          value={editableUser?.phone}
          onChangeText={(text) => handleFieldChange('phone', text)}
        />
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="Nationality"
            mode="outlined"
          value={editableUser?.nationality}
          onChangeText={(text) => handleFieldChange('nationality', text)}
        />
        <TextInput
          style={{ marginBottom: 15, borderBottomWidth: 1, fontSize: 16 }}
          placeholder="Email"
          keyboardType="email-address"
            mode="outlined"
          value={editableUser?.email}
          onChangeText={(text) => handleFieldChange('email', text)}
        />

        {/* Submit Button */}
        <Button mode="contained" onPress={handleSubmit}>
          Save Changes
        </Button>
      </View>
        </ScrollView>
    )
}
