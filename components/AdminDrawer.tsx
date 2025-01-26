import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import { Drawer } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface AdminDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AdminDrawer({ isVisible, onClose }: AdminDrawerProps) {
  const router = useRouter();
  const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current; 

  useEffect(() => {
    if (isVisible) {
   
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
     
      Animated.timing(translateX, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateX]);

  if (!isVisible) {
    return null; 
  }

  return (
    <View style={styles.overlayContainer}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.drawerContainer, { transform: [{ translateX }] }]} 
      >
        
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/registerpic.png')} 
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Rocket Admin</Text>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <Drawer.Item
            label="Agregar Curso"
            icon="plus"
            onPress={() => {
              onClose();
              router.push('/Admin'); 
            }}
          />
          <Drawer.Item
            label="Ver Perfil"
            icon="plus"
            onPress={() => {
              onClose();
              router.push('/Perfil/');
            }}
          />
        </Drawer.Section>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  drawerContainer: {
    position: 'absolute',
    right: 0, 
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fff',
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    marginTop: 60, 
  },
  logoImage: {
    width: 60, 
    height: 60, 
    marginBottom: 10, 
    borderRadius: 30, 
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  drawerSection: {
    marginTop: 20, 
  },
});
