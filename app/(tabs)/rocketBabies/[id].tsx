import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router'
import { View, ScrollView, Image, Alert } from 'react-native';
import axios from 'axios';
import { Button, Text, TextInput } from 'react-native-paper';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


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


interface FormData {
  userName: string;
  courseTitle: string;
  parent: string;
  age: string;
  birthDate: string;
  area: string;
  province: string;
  district: string;
  kidName: string;
}


export default function Page() {
  const { id: courseId } = useLocalSearchParams();
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = React.useState("");
  const [parent, setParent] = React.useState("");
  const [age, setAge] = React.useState("");
  const [birthDate, setbirthDate] = React.useState("");
  const [area, setArea] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [kidName, setkidName] = React.useState("");

  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchCourse = async () => {
      console.log("Fetching course from:", apiUrl);
      try {
        const response = await axios.get(`${apiUrl}/api/getCourseBabies/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError('Failed to load course');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [apiUrl, courseId]);

  const handleSubmit = async () => {
    try {

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }

      const decoded: any = jwtDecode(token);
      const userName = decoded.userName;


      const formData: FormData = {
        userName: userName,
        courseTitle: course?.title || '',
        parent,
        age,
        birthDate,
        province,
        district,
        area,
        kidName,
      };


      await axios.post(`${apiUrl}/api/registerRocketBabies`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Curso Registrado", "Se ha inscrito en el curso");
      router.push('/(tabs)/rocketBabies');
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


  const splitDescription = (description: string) => {
    const paragraphLength = Math.ceil(description.length / 3);
    return [
      description.slice(0, paragraphLength),
      description.slice(paragraphLength, 2 * paragraphLength),
      description.slice(2 * paragraphLength),
    ];
  };

  const splitContent = (content: string) => {
    const paragraphLength = Math.ceil(content.length / 3);
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

        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
          Descripción
        </Text>


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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ marginBottom: 4 }}>Nombre del Padre/Madre/Encargado Legal</Text>
              <TextInput
                value={parent}
                onChangeText={text => setParent(text)}
                mode="outlined"
                style={{ height: 50 }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 4 }}>Fecha de Nacimiento (DD/MM/YYYY)</Text>
              <TextInput
                value={birthDate}
                onChangeText={text => setbirthDate(text)}
                mode="outlined"
                style={{ height: 50 }}
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
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 4 }}>Edad</Text>
            <TextInput
              value={age}
              onChangeText={text => setAge(text)}
              mode="outlined"
              style={{ height: 50 }}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 4 }}>Nombre del Niño</Text>
            <TextInput
              value={kidName}
              onChangeText={text => setkidName(text)}
              mode="outlined"
              style={{ height: 50 }}
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