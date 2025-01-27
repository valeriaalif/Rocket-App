import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import {jwtDecode} from 'jwt-decode';
import AdminDrawer from '../../../components/AdminDrawer';

interface User {
  access: 'admin' | 'user';
}

export default function _layout() {
  const router = useRouter();
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          const userRole = decoded.userRole;
          setUser({ access: userRole });
        } else {
          Alert.alert('Error', 'User token not found. Please log in again.');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user');
      }
    };

    fetchUser();
  }, []);

  const renderHeaderRight = () => {
    if (user?.access === 'admin') {
      return (
        <IconButton
          icon="menu"
          size={24}
          iconColor="#6200ee"
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={toggleDrawer}
        />
      );
    } else if (user?.access === 'user') {
      return (
        <IconButton
          icon="account-circle"
          size={24}
          iconColor="#6200ee"
          style={{
            height: 56,
            width: 56,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => router.push('/Perfil/')}
        />
      );
    }
    return null;
  };

  return (
    <>
      <AdminDrawer isVisible={isDrawerVisible} onClose={toggleDrawer} />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Tech Academy',
            headerRight: renderHeaderRight,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Post details',
          }}
        />
      </Stack>
    </>
  );
}
