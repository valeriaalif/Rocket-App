import { View, Image} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { PaperProvider } from 'react-native-paper';
import { TextInput, Text, Button } from 'react-native-paper';

export default function Register() {
  const [text, setText] = React.useState("");
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
          source={require('../../assets/images/banner.png')} 
          style={{ width: 400, height: 180, marginBottom: 20 }} 
        />

       <Text variant="headlineMedium" style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>Regístrate</Text>
     
      <TextInput
     label="Nombre Completo"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Cédula"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Edad"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Teléfono"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Nacionalidad"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Correo Electrónico"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 300, height: 50 }} 
      />
       <TextInput
     label="Contraseña"
     value={text}
     onChangeText={text => setText(text)}
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