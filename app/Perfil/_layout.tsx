import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{

      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Perfil", headerShown: true }}
      />
      <Stack.Screen
        name="editProfile"
        options={{ title: "Editar Perfil", headerShown: true }}
      />
    </Stack>
  );
}
