import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import Constants from 'expo-constants';
import { router } from "expo-router";


interface CourseInfo {
  id: string;
  title: string;
  teacher: string;
  startDate: string;
  finishDate: string;
  schedule: string;
  duration: string;
  totalHours: string;
  platform: string;
  mode: string;
  availability: string;
  inscriptionEndDate: string;
  sendEmailDate: string;
  benefits: string;
  audience: string;
  requirements: string;
  description: string;
  content: string;
}

export default function editCourse() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editableCourse, setEditableCourse] = useState<CourseInfo | null>(null);

  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getCourseBabies/${id}`);
        setCourse(response.data);
        setEditableCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load course');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [apiUrl, id]);

  const handleFieldChange = (field: keyof CourseInfo, value: string) => {
    if (editableCourse) {
      setEditableCourse({ ...editableCourse, [field]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/api/updateCourseBabies/${id}`, editableCourse);
      Alert.alert('Curso Modificado', 'El curso ha sido modificado exitosamente');
      router.push('/(tabs)/rocketBabies/')
    } catch (err) {
      Alert.alert('Error', 'Failed to update the course.');
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

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View>
        <Stack.Screen options={{ headerTitle: 'Edit Course Details' }} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/images/banner.png')}
            style={{ width: 400, height: 180, marginBottom: 20 }}
          />
        </View>

        {editableCourse && (
          <>
            <TextInput
              label="Title"
              value={editableCourse.title}
              onChangeText={(text) => handleFieldChange('title', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />

            <TextInput
              label="Teacher"
              value={editableCourse.teacher}
              onChangeText={(text) => handleFieldChange('teacher', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Start Date"
              value={editableCourse.startDate}
              onChangeText={(text) => handleFieldChange('startDate', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Finish Date"
              value={editableCourse.finishDate}
              onChangeText={(text) => handleFieldChange('finishDate', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Schedule"
              value={editableCourse.schedule}
              onChangeText={(text) => handleFieldChange('schedule', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Duration"
              value={editableCourse.duration}
              onChangeText={(text) => handleFieldChange('duration', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Total Hours"
              value={editableCourse.totalHours}
              onChangeText={(text) => handleFieldChange('totalHours', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Platform"
              value={editableCourse.platform}
              onChangeText={(text) => handleFieldChange('platform', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Mode"
              value={editableCourse.mode}
              onChangeText={(text) => handleFieldChange('mode', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Availability"
              value={editableCourse.availability}
              onChangeText={(text) => handleFieldChange('availability', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Inscription End Date"
              value={editableCourse.inscriptionEndDate}
              onChangeText={(text) => handleFieldChange('inscriptionEndDate', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />

            <TextInput
              label="Audience"
              value={editableCourse.audience}
              onChangeText={(text) => handleFieldChange('audience', text)}
              multiline
              mode="outlined"
              style={{ marginBottom: 10, maxHeight: 120 }}
              scrollEnabled
            />
            <TextInput
              label="Benefits"
              value={editableCourse.benefits}
              onChangeText={(text) => handleFieldChange('benefits', text)}
              multiline
              mode="outlined"
              style={{ marginBottom: 10, maxHeight: 120 }}
              scrollEnabled
            />
            <TextInput
              label="Requirements"
              value={editableCourse.requirements}
              onChangeText={(text) => handleFieldChange('requirements', text)}
              multiline
              mode="outlined"
              style={{ marginBottom: 10, maxHeight: 120 }}
              scrollEnabled
            />
            <TextInput
              label="Description"
              value={editableCourse.description}
              onChangeText={(text) => handleFieldChange('description', text)}
              multiline
              mode="outlined"
              style={{ marginBottom: 10, maxHeight: 120 }}
              scrollEnabled
            />
            <TextInput
              label="Content"
              value={editableCourse.content}
              onChangeText={(text) => handleFieldChange('content', text)}
              multiline
              mode="outlined"
              style={{ marginBottom: 10, maxHeight: 120 }}
              scrollEnabled
            />
            <TextInput
              label="Send Email Date"
              value={editableCourse.sendEmailDate}
              onChangeText={(text) => handleFieldChange('sendEmailDate', text)}
              mode="outlined"
              style={{ marginBottom: 10 }}
            />

            <Button
              mode="contained"
              buttonColor="#6200ee"
              style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }}
              labelStyle={{ fontSize: 16, lineHeight: 34 }}
              onPress={handleSubmit}
            >
              Editar Curso
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
}
