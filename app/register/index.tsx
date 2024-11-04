import { View, Image, Alert} from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { PaperProvider } from 'react-native-paper';
import axios from 'axios'; 
import { TextInput, Text, Button } from 'react-native-paper';
import Constants from 'expo-constants';

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [nationalId, setnationalId] = React.useState("");
  const [age, setAge] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [password, setPassword] = React.useState("");
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  const handleRegister = async () => {
    if (!email || !name || !nationalId || !age || !phone || !nationality || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/registerUser`, {
        email,
        fullname: name,
        nationalId,
        age,
        phone,
        nationality,
        password
      });

      Alert.alert("Success", response.data.message);

      // Redirect to the rocketStudent screen
      router.push('/(tabs)/rocketStudent');

    } catch (error) {
      // Use type assertion to safely access the error object
      if (axios.isAxiosError(error) && error.response) {
        console.error("Registration error:", error.response.data);
        Alert.alert("Error", error.response.data.error || "Failed to register");
      } else {
        console.error("Unknown error:", error);
        Alert.alert("Error", "An unknown error occurred");
      }
    }
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
          source={require('../../assets/images/registerpic.png')} 
          style={{ width: 200, height: 200, marginBottom: 20 }} 
        />

<View
          style={{
            backgroundColor: '#6200ee',
            padding: 10,
            borderRadius: 2,
            width: '100%',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text variant="headlineLarge" style={{ color: 'white' }}>
            Regístrate
          </Text>
        </View>
     
      <TextInput
     label="Nombre Completo"
     value={name}
     onChangeText={text => setName(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
   <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
  <TextInput
    label="Cédula"
    value={nationalId}
    onChangeText={text => setnationalId(text)}
    mode="outlined"
    style={{ flex: 1, marginRight: 5, height: 50 }} // Added flex and marginRight
  />
  <TextInput
    label="Edad"
    value={age}
    onChangeText={text => setAge(text)}
    mode="outlined"
    style={{ flex: 1, marginLeft: 5, height: 50 }} // Added flex and marginLeft
  />
</View>
       <TextInput
     label="Correo Electrónico"
     value={email}
     onChangeText={text => setEmail(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, marginTop: 0 }}>
    <TextInput
      label="Nacionalidad"
      value={nationality}
      onChangeText={text => setNationality(text)}
      mode="outlined"
      style={{ flex: 1, marginRight: 5, height: 50 }}
    />
    <TextInput
      label="Teléfono"
      value={phone}
      onChangeText={text => setPhone(text)}
      mode="outlined"
      style={{ flex: 1, marginLeft: 5, height: 50 }}
    />
  </View>
       <TextInput
     label="Contraseña"
     value={password}
     onChangeText={text => setPassword(text)}
     mode="outlined"
     secureTextEntry
     style={{ width: 300, height: 50 }} 
      />
 <Button
  mode="contained"
  buttonColor="#6200ee"
  style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }}
  labelStyle={{ fontSize: 16, lineHeight: 34 }}
  onPress={handleRegister}  // Attach the function here
>
  Crear Cuenta
</Button>
    </View>
  )
}