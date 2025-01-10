import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from 'axios';
import Constants from 'expo-constants';

export default function ForgotPassword() {
  const { colors } = useTheme();
  const [enteredEmail, setEnteredEmail] = useState("");
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const handleForgotPassword = async () => {
    if (!enteredEmail) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
  
    try {
      const response = await axios.post(`${apiUrl}/api/forgotPwd`, 
        { 
          enteredEmail // Sends the email as-is
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true', // Skip browser warning
          },
        }
      );
  
      // Check for successful response
      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
    
        <View className="flex-1 flex-col px-7 mt-44">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect
            keyboardType="email-address"
            onChangeText={setEnteredEmail}
            value={enteredEmail}
            // autoFocus
            blurOnSubmit
            placeholder="Enter email address"
          />
          <Button
            loading={false}
            disabled={false}
            type="solid"
            title="Submit"
            color={colors.primary}
            onPress={handleForgotPassword}
            size="lg"
            radius="md"
          />
          <Button
            type="clear"
            title="Back to login"
            titleStyle={{ color: colors.primary }}
            onPress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
    
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontFamily: "Exo_400Regular",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    flex: 1,
    marginBottom: 12,
  },
});