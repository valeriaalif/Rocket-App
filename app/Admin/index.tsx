import React from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { FAB } from "react-native-paper";
import { router } from "expo-router";
import {Text} from "react-native-paper"

export default function Admin() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.imgContainer}>
      <Image source={require('../../assets/images/registerpic.png')} style ={styles.imgpic}/>

      </View>
      <View
          style={{
            backgroundColor: '#6200ee',
            padding: 10,
            borderRadius: 2,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text variant="headlineLarge" style={{ color: 'white' }}>
            Rocket Admin
          </Text>
        </View>
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          label="Agregar Curso Tech Academy"
          style={styles.fab}
          color="white"
          onPress={() => router.push('/Admin/addTechAcademy')}
        />
        <FAB
          icon="plus"
          label="Agregar Curso Rocket Babies"
          style={styles.fab}
          color="white"
          onPress={() => router.push('/Admin/addRocketBabies')}
        />
        <FAB
          icon="plus"
          label="Agregar Curso Rocket Student"
          style={styles.fab}
          color="white"
          onPress={() => router.push('/Admin/addRocketStudent')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20, 
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, 
  },
  imgpic: {
    width: "70%", 
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  header: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    marginBottom: 15, 
  },
  headerText: {
    color: "white",
  },
  fabContainer: {
    marginTop: 20, 
    width: "100%",
    alignItems: "center",
  },
  fab: {
    backgroundColor: "#6200ee",
    marginBottom: 10, 
    width: 300,
  },

});
