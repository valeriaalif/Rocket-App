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
  const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current; // Start off-screen

  useEffect(() => {
    if (isVisible) {
      // Slide in when visible
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out when not visible
      Animated.timing(translateX, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, translateX]);

  if (!isVisible) {
    return null; // Don't render the drawer if not visible
  }

  return (
    <View style={styles.overlayContainer}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.drawerContainer, { transform: [{ translateX }] }]} // Apply sliding animation
      >
        {/* Image and Text at the top of the drawer */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/registerpic.png')} // Replace with your image URL or local asset
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
              router.push('/addCourse'); // Update route as needed
            }}
          />
          <Drawer.Item
            label="Estadísticas"
            icon="chart-bar"
            onPress={() => {
              onClose();
              router.push('/stats'); // Update route as needed
            }}
          />
          <Drawer.Item
            label="Configuración"
            icon="cog"
            onPress={() => {
              onClose();
              router.push('/settings'); // Update route as needed
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
    position: 'absolute', // Ensures it's positioned above all other components
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // High zIndex ensures it's on top of other components
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  drawerContainer: {
    position: 'absolute',
    right: 0, // Align drawer to the right
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fff',
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20, // Adjust vertical padding for spacing around logo
    borderBottomWidth: 1, // Optional border between logo and drawer items
    borderBottomColor: '#ddd',
    marginTop: 60, // Add marginTop to push the logo container down
  },
  logoImage: {
    width: 60, // Adjust size as needed
    height: 60, // Adjust size as needed
    marginBottom: 10, // Space between the logo and the text
    borderRadius: 30, // Make the logo round, optional
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  drawerSection: {
    marginTop: 20, // Adjust this value as needed to move the items lower
  },
});
