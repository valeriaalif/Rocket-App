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
        options={{ title: "Admin", headerShown: false }} 
      />
      <Stack.Screen 
        name="addTechAcademy" 
        options={{ title: "Agregar Curso", headerShown: false }} 
      />
       <Stack.Screen 
        name="addRocketStudent" 
        options={{ title: "Agregar Cursol", headerShown: true }} 
      />
       <Stack.Screen 
        name="addRocketBabies" 
        options={{ title: "Agregar Curso", headerShown: true }} 
      />
    </Stack>
  );
}
