import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="rocketStudent"
        options={{
          headerTitle: "RocketStudent",
          tabBarLabel: 'RocketStudent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="rocketBabies"
        options={{
          headerTitle: "RocketBabies",
          tabBarLabel: 'RocketBabies',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="child" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="techAcademy"
        options={{
          headerTitle: "TechAcademy",
          tabBarLabel: 'TechAcademy',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="computer" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
