
import { View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PaperProvider } from 'react-native-paper';
import { TextInput, Text, Button } from 'react-native-paper';



export default function Page() {

  const [text, setText] = React.useState("");
  return (
    <PaperProvider>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image 
          source= {require('../assets/images/loginpic.png')} 
          style={{ width: 200, height: 200, marginBottom: 20  }} 
        />
            <View style={{  backgroundColor: '#6200ee', 
            padding: 10, 
            borderRadius: 2, 
            width: '100%', 
            alignItems: 'center' 
            }}>
          <Text variant="headlineLarge" style={{ color: 'white' }}>
            Rocket Girls
          </Text>
        </View>
        <Text variant="headlineMedium" style={{ marginBottom: 10, marginTop: 10, fontWeight: 'bold' }}>Inicia Sesión</Text>
     
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
      style={{ width: 300, height: 50, marginBottom: 10 }} 
    />
        
        <Link href="/one" style={{ marginBottom: 10 }}>
          <Text style={{ color: 'grey',  fontWeight: 'bold'}}>
            ¿Olvidaste tu Contraseña?
          </Text>
        </Link>
      <Link href="/one" asChild>
        <Button mode="contained" 
         buttonColor="#6200ee"
          style={{ paddingHorizontal: 72, height: 56 }} 
          labelStyle={{ fontSize: 16, lineHeight: 34 }} 
        >  
          Inicia Sesión
          </Button>
      </Link>
      <Link href="/register" style={{ marginTop: 10 }}>
          <Text style={{ color: 'grey',  fontWeight: 'bold' }}>
            Regístrate Aquí
          </Text>
        </Link>
    </View>
    </PaperProvider>
  )
}