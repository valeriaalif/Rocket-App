import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
      
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "Admin", headerShown: true }} 
      />
      <Stack.Screen 
        name="addTechAcademy" 
        options={{ title: "Tech Academy", headerShown: true }} 
      />
       <Stack.Screen 
        name="addRocketStudent" 
        options={{ title: "Rocket Sudent", headerShown: true }} 
      />
       <Stack.Screen 
        name="addRocketBabies" 
        options={{ title: "Rocket Babies", headerShown: true }} 
      />
    </Stack>
  );
}
