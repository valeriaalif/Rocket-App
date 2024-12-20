import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Button, Card, Text, Searchbar, FAB, IconButton, MD3Colors } from 'react-native-paper';
import { Link, router } from 'expo-router';
import Constants from 'expo-constants';

// Define the Course interface
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


export default function RocketStudent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      console.log("Fetching courses from:", apiUrl); // Log the API URL
      try {
        const response = await axios.get(`${apiUrl}/api/getAllCoursesStudents`);
        console.log("Fetched courses data:", response.data); // Log the fetched data
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err); // Log any error
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [apiUrl]);

  // Handle deleting a course
  const handleDeleteCourse = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteCourseStudents/${id}`);
      setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
      Alert.alert("Success", "Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      Alert.alert("Error", "Failed to delete course");
    }
  };

  // Filter courses based on the search query
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

      
      {/* Search Bar */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <Searchbar
          placeholder="Buscar Curso"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {/*router.push('/(tabs)/rocketStudent');*/}
        {/* FAB placed like Searchbar */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 3, marginBottom: 15 }}>
       
        <FAB
          icon="plus"
          label="Agregar Curso"
          style={{
            backgroundColor: '#6200ee',
          }}
          onPress={() => router.push('/rocketStudent/addCourse')}
        />
       
      </View>

      {/* Display filtered courses */}
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    
    <IconButton
      icon="pencil"
      iconColor={MD3Colors.error50}
      size={20}
      onPress={() => console.log('Edit pressed')}
    />
    <IconButton
      icon="delete"
      iconColor={MD3Colors.error50}
      size={20}
      onPress={() => handleDeleteCourse(course.id)}
    />
  </View>
              <Link href={`/rocketStudent/${course.id}`} asChild>
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
