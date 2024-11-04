import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement
import 'core-js/stable/atob'; // Polyfill for 'atob'

interface DecodedToken {
  Id: string;
  userRole: string;
  userName: string;
  userEmail: string;
}

export default function _layout() {
 
  return (
    <Tabs>
      <Tabs.Screen
        name="rocketStudent"
        options={{
          headerTitle: 'RocketStudent',
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
          headerTitle: 'RocketBabies',
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
          headerTitle: 'TechAcademy',
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
