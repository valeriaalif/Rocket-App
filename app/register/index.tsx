import { View, Image} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { PaperProvider } from 'react-native-paper';
import { TextInput, Text, Button } from 'react-native-paper';

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [nationalId, setnationalId] = React.useState("");
  const [age, setAge] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
          source={require('../../assets/images/banner.png')} 
          style={{ width: 400, height: 180, marginBottom: 20 }} 
        />

       <Text variant="headlineMedium" style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>Regístrate</Text>
     
      <TextInput
     label="Nombre Completo"
     value={name}
     onChangeText={text => setName(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Cédula"
     value={nationalId}
     onChangeText={text => setnationalId(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Edad"
     value={age}
     onChangeText={text => setAge(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Teléfono"
     value={phone}
     onChangeText={text => setPhone(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Nacionalidad"
     value={nationality}
     onChangeText={text => setNationality(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Correo Electrónico"
     value={email}
     onChangeText={text => setEmail(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Contraseña"
     value={password}
     onChangeText={text => setPassword(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
      <Link href="/login" asChild>
      <Button mode="contained" 
         buttonColor="#6200ee"
          style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }} 
          labelStyle={{ fontSize: 16, lineHeight: 34 }} 
        >  
          Crear Cuenta
          </Button>
      </Link>
    </View>
  )
}