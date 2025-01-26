import { router, Link } from "expo-router";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Text, Button } from "react-native-paper";
import { auth , sendPasswordResetEmail} from '../firebaseConfig';


export default function ForgotPassword() {
 
  const [email, setEmail] = useState("");

  

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        console.error("Email is required");
        return;
      }
  await sendPasswordResetEmail(auth, email);
  Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
} catch (error) {
  console.error("Error sending password reset email:", error);
}
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.introText}>Ingrese su correo electrónico y le mandaremos un enlace para reestablecer su contraseña.</Text>
          <TextInput
            label="Correo Electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
          />
          <Button
            mode="contained"
            buttonColor="#6200ee"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleForgotPassword}
          >
            Reestablecer Contraseña
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  introText: {
    width: "100%", 
    textAlign: "left", 
    marginBottom: 10,
    fontSize: 16,
    color: "#333", 
  },
});
