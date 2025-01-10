import React from "react";
import {ScrollView ,View} from "react-native"
import { Button, Card, Text, TextInput } from 'react-native-paper';


export default function profile(){
    return(
<ScrollView>
    <View>
    <Text style={{ textAlign: 'left', marginBottom: 10 }}>=</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Beneficios
          </Text>
    </View>
</ScrollView>
    );
}