import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {

    
const router = useRouter();
  return (
   <Stack
    screenOptions={{
        // headerStyle: {
        //     backgroundColor: 'black'
        // },
        // headerTintColor: 'white'
    }}
   >
        <Stack.Screen name="index" options={{
            title: 'Home',
            headerShown: false
        }} />
        <Stack.Screen name="register/index" options={{
            title: 'Registrar Cuenta',
            headerRight: ()=>(
                <Button title="Login" onPress={()=> router.push('/login')} />
            ),
            headerShown: false
        }} />
        <Stack.Screen name="login" options={{
            title: 'Login Modal',
            presentation: 'modal'
        }} />
        <Stack.Screen name="(tabs)" options={{
            headerShown: false
        }} />
        <Stack.Screen name="[missing]" options={{
            title: '404'
        }} />

        <Stack.Screen name="forgot-pwd" options={{
            title: 'Recuperar Cuenta',
            headerShown: true
        }} />

        <Stack.Screen name="auth/editProfile" options={{
            title: 'Editar Perfil',
           
        }} />
       
   </Stack>
  )
}
