import { StyleProp, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';



export default function Page() {
  
  return (
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
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  </View>
  )
}