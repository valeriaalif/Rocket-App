import { View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Posts() {
  return (
    //<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
     // <Link style={{fontSize: 20}} href="/posts/1">open post 1</Link>
    //  <Link style={{fontSize: 20}}  href="/posts/2">open post 2</Link>
     // <Link style={{fontSize: 20}}  href="/posts/3">open post 3</Link>
   // </View>
   <View style={{ flex: 1, justifyContent: 'center'}}>
   <Card>
   <Card.Content>
   <View style={{ backgroundColor: '#6200ee', padding: 10, borderRadius: 5, marginBottom: 15 }}>
     <Text variant="titleLarge" style={{ color: 'white' }}>Manejo de Bases de Datos con PowerBI</Text>
     </View>
     <Text variant="bodyMedium">Docente: Karla Vega</Text>
     <Text variant="bodyMedium">Fecha de Inicio: 12 de Junio 2024</Text>
     <Text variant="bodyMedium">Fecha de Finalización: 23 de Junio 2024</Text>
     <Text variant="bodyMedium">Horario: Lunes a Miércoles</Text>
     <Text variant="bodyMedium">Cierre de Inscripción: 09 de Junio 2024</Text>
     <Text variant="bodyMedium">Duración: 2 semanas</Text>
     <Text variant="bodyMedium">Inversión Total: 6 horas</Text>
     <Text variant="bodyMedium">Plataforma: Zoom</Text>
     <Text variant="bodyMedium">Modalidad: Virtual</Text>
     <Text variant="bodyMedium">Disponiblidad: Hay Cupos</Text>
   </Card.Content>
  {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />*/}
   <Card.Actions>
     <Link href="/posts/1" asChild>
        <Button mode="contained" 
         buttonColor="#6200ee"
          style={{ paddingHorizontal: 2, height: 56 }} 
          labelStyle={{ fontSize: 16, lineHeight: 34 }} 
        >  
          Inscribirse
          </Button>
      </Link>
   </Card.Actions>
 </Card>
 </View>
  )
}