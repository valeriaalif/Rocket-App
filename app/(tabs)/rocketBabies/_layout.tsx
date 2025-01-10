import { View,  Alert  } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Text, Searchbar, IconButton, MD3Colors, FAB } from 'react-native-paper';

export default function _layout() {

  return (
    <Stack>
        <Stack.Screen name="index" options={{
            title: 'RocketBabies',
             headerRight: ()=>(
                           // Button to trigger logout
                       
                <Button 
                  mode="contained" 
                  buttonColor="#6200ee"
                  style={{ paddingHorizontal: 2, height: 56 }} 
                  labelStyle={{ fontSize: 16, lineHeight: 34 }}
                  onPress={() => router.push('/rocketBabies/profile')}
                >
                  Inscribirse
                </Button>
           
                      ),
        }} />
        <Stack.Screen name="[id]" options={{
            title: 'Post details'
        }} />
           <Stack.Screen name="addCourse" options={{
                    title: 'Agregar Curso'
        }} />
        <Stack.Screen name="profile" options={{
                    title: 'Perfil'
        }} />
        
    </Stack>
  )
}