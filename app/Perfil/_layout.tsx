import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ee" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "Perfil", headerShown: false }} 
      />
      <Stack.Screen 
        name="editProfile" 
        options={{ title: "Editar Perfil", headerShown: false }} 
      />
    </Stack>
  );
}
