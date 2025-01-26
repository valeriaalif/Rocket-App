import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Button, Card, Text, Searchbar, IconButton, MD3Colors, } from 'react-native-paper';
import { Link, router } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface Course {
  id: string;
  title: string;
  teacher: string;
  startDate: string;
  finishDate: string;
  schedule: string;
  duration: string;
  totalHours: number;
  platform: string;
  mode: string;
  availability: boolean;
  inscriptionEndDate: string;
}

interface User {
  access: 'admin' | 'student';
}

export default function RocketBabies() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          const userRole = decoded.userRole;
          setUser({ access: userRole });
        } else {
          Alert.alert("Error", "User token not found. Please log in again.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError('Failed to load user');
      }
    };
    const fetchCourses = async () => {

      try {
        const response = await axios.get(`${apiUrl}/api/getAllCoursesBabies`);
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };
    fetchUser();
    fetchCourses();
  }, [apiUrl]);

  const confirmDeleteCourse = (courseId: string) => {
    Alert.alert(
      "Confirmar Borrado",
      "¿Está seguro de elminar este curso? Esta acción no se puede revertir.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => handleDeleteCourse(courseId),
        },
      ]
    );
  };


  const handleDeleteCourse = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteCourseBabies/${id}`);
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      Alert.alert("Success", "Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      Alert.alert("Error", "Failed to delete course");
    }
  };


  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <Searchbar
          placeholder="Buscar Curso"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>




      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <Card key={course.id} style={{ marginBottom: 16 }}>
            <Card.Content>
              <View style={{ backgroundColor: '#6200ee', padding: 10, borderRadius: 5, marginBottom: 15 }}>
                <Text variant="titleLarge" style={{ color: 'white' }}>{course.title}</Text>
              </View>
              <Text variant="bodyMedium">Docente: {course.teacher}</Text>
              <Text variant="bodyMedium">Fecha de Inicio: {course.startDate}</Text>
              <Text variant="bodyMedium">Fecha de Finalización: {course.finishDate}</Text>
              <Text variant="bodyMedium">Horario: {course.schedule}</Text>
              <Text variant="bodyMedium">Cierre de Inscripción: {course.inscriptionEndDate}</Text>
              <Text variant="bodyMedium">Duración: {course.duration}</Text>
              <Text variant="bodyMedium">Inversión Total: {course.totalHours} horas</Text>
              <Text variant="bodyMedium">Plataforma: {course.platform}</Text>
              <Text variant="bodyMedium">Modalidad: {course.mode}</Text>
              <Text variant="bodyMedium">Disponibilidad: {course.availability}</Text>
            </Card.Content>
            <Card.Actions>
              {user?.access === 'admin' && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton
                    icon="pencil"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => router.push(`/rocketBabies/editCourse?id=${course.id}`)}
                  />
                  <IconButton
                    icon="delete"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => confirmDeleteCourse(course.id)}
                  />
                </View>
              )}
              <Link href={`/rocketBabies/${course.id}`} asChild>
                <Button
                  mode="contained"
                  buttonColor="#6200ee"
                  style={{ paddingHorizontal: 2, height: 56 }}
                  labelStyle={{ fontSize: 16, lineHeight: 34 }}
                >
                  Inscribirse
                </Button>
              </Link>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text>No se encontraron cursos</Text>
        </View>
      )}
    </ScrollView>
  );
}
