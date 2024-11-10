import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router'
import { View, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

// Define the CourseInfo interface
interface CourseInfo {
  id: string;
  title: string;
  teacher: string;
  sendEmailDate: string;
  benefits: string;
  audience: string;
  requirements: string;
  description: string;
  content: string;
}

export default function Page() {
  const { id: courseId } = useLocalSearchParams(); // Fetch courseId from URL
    const [course, setCourse] = useState<CourseInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [birthDate, setbirthDate] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [area, setArea] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [education, setEducation] = React.useState("");
    const [children, setChildren] = React.useState("");
    const [organization, setOrganization] = React.useState("");
    const [englishLevel, setEnglishLevel] = React.useState("");
    const [openEducation, setOpenEducation] = useState(false);
    const [itemsEducation, setItemsEducation] = useState([
    { label: 'Primaria', value: 'Primaria' },
    { label: 'Secundaria', value: 'Secundaria' },
    { label: 'Bachillerato', value: 'Bachillerato' },
    { label: 'Universidad', value: 'Universidad' },
    { label: 'Postgrado', value: 'Postgrado' },
  ]);
    
  const [openEnglish, setOpenEnglish] = useState(false);
  const [itemsEnglish, setItemsEnglish] = useState([
  { label: 'Básico', value: 'Básico' },
  { label: 'Intermedio', value: 'Intermedio' },
  { label: 'Avanzado', value: 'Avanzado' },
  { label: 'Bilingue', value: 'Bilingue' },
  { label: 'Nativo', value: 'Nativo' },
]);
  


    const apiUrl = Constants.expoConfig?.extra?.API_URL;
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/getCourse/${courseId}`);
          setCourse(response.data);
        } catch (err) {
          console.error("Error fetching course:", err);
          setError('Failed to load course');
        } finally {
          setLoading(false);
        }
      };
  
      if (courseId) {
        fetchCourse();
      } else {
        setError('Course ID is missing in URL parameters.');
        setLoading(false);
      }
    }, [apiUrl, courseId]);

    const handleSubmit = async () => {
      try {
        // Get the User ID from the JWT token
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert("Error", "User is not authenticated.");
          return;
        }
  
        const decoded: any = jwtDecode(token);
        const Id = decoded.Id; // Ensure this matches the structure of your JWT
  
        // Prepare the form data
        const formData = {
          Userid: Id,
          courseId, // Include courseId from URL parameters
          academicDegree: education,
          children,
          birthDate,
          province,
          district,
          area,
          organization,
          englishLevel,
        };
  
        // Send form data to the API
        await axios.post(`${apiUrl}/api/registerUserTechAcademy`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        Alert.alert("Success", "User registered successfully");
      } catch (err) {
        console.error("Error submitting form:", err);
        Alert.alert("Error", "Failed to submit the form.");
      }
    };
  
  
  
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

      // Function to split description into 3 parts
      const splitDescription = (description: string) => {
        const paragraphLength = Math.ceil(description.length / 3); // Calculate length for each part
        return [
          description.slice(0, paragraphLength),
          description.slice(paragraphLength, 2 * paragraphLength),
          description.slice(2 * paragraphLength),
        ];
      };

      const splitContent = (content: string) => {
        const paragraphLength = Math.ceil(content.length / 3); // Calculate length for each part
        return [
          content.slice(0, paragraphLength),
          content.slice(paragraphLength, 2 * paragraphLength),
          content.slice(2 * paragraphLength),
        ];
      };



  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
        <Stack.Screen options={{
            headerTitle: 'Detalles del Curso'
        }} />

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Image 
          source={require('../../../assets/images/banner.png')} 
          style={{ width: 400, height: 180, marginBottom: 20 }} 
        />
  </View>

       {/* Display the course details */}
       <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          {course?.title}
        </Text>
       
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Personas a las que va dirigido este curso
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.audience}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Beneficios
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.benefits}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Requerimientos
          </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}> {course?.requirements}</Text>
         {/* Title for the description */}
         <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Descripción
          </Text>

          {/* Display the description split into 3 paragraphs */}
          {course?.description &&
            splitDescription(course.description).map((paragraph, index) => (
              <Text key={index} style={{ textAlign: 'left', marginBottom: 10 }}>
                {paragraph}
              </Text>
            ))}
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Contenido
          </Text>

          {course?.content &&
            splitContent(course.content).map((paragraph, index) => (
              <Text key={index} style={{ textAlign: 'left', marginBottom: 10 }}>
                {paragraph}
              </Text>
            ))}
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Fecha de Envío de Correos
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.sendEmailDate}</Text>
    </View>
    <View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Formulario de Inscripción
          </Text>

          <View>

          <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>Último Grado Académico Aprobado</Text>
      <DropDownPicker
        open={openEducation}
        value={education}
        items={itemsEducation}
        setOpen={setOpenEducation}
        setValue={setEducation}
        setItems={setItemsEducation}
        listMode="SCROLLVIEW" 
        placeholder="Selecciona el grado académico"
        style={{ width: 360, height: 50 }}
      />
    </View>
     
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 4 }}>¿Tienes Hijos? (Sí/No)</Text>
          <TextInput
            value={children}
            onChangeText={text => setChildren(text)}
            mode="outlined"
            style={{ height: 50 }} 
          />
        </View>
    
      <View style={{ flex: 1 }}>
        <Text style={{ marginBottom: 4 }}>Fecha de Nacimiento</Text>
        <TextInput
          value={birthDate}
          onChangeText={text => setbirthDate(text)}
          mode="outlined"
          style={{  height: 50 }} 
        />
      </View>

      </View>

   

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 4 }}>Provincia</Text>
        <TextInput
          value={province}
          onChangeText={text => setProvince(text)}
          mode="outlined"
          style={{ width: 360, height: 50 }} 
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 4 }}>Cantón</Text>
          <TextInput
            value={area}
            onChangeText={text => setArea(text)}
            mode="outlined"
            style={{ height: 50 }} 
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 4 }}>Distrito</Text>
          <TextInput
            value={district}
            onChangeText={text => setDistrict(text)}
            mode="outlined"
            style={{ height: 50 }} 
          />
        </View>
      </View>
      <View style={{marginBottom: 16}}>
          <Text style={{ marginBottom: 4 }}>¿Perteneces a una Organización? (Sí/No)</Text>
          <TextInput
            value={organization}
            onChangeText={text => setOrganization(text)}
            mode="outlined"
            style={{ height: 50 }} 
          />
        </View>
       

        <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>Nivel de Inglés</Text>
      <DropDownPicker
        open={openEnglish}
        value={englishLevel}
        items={itemsEnglish}
        setOpen={setOpenEnglish}
        setValue={setEnglishLevel}
        setItems={setItemsEnglish}
        listMode="SCROLLVIEW" 
        placeholder="Selecciona el nivel de inglés"
        style={{ width: 360, height: 50 }}
      />
    </View>

        <Button 
          mode="contained" 
          buttonColor="#6200ee"
          style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }} 
          labelStyle={{ fontSize: 16, lineHeight: 34 }} 
          onPress={handleSubmit}  
        >  
          Inscribirse
        </Button>
    </View>
  
    </View>
    </ScrollView>
  )
}