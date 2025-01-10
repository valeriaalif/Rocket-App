import React, { useState, useEffect } from 'react';
import {ScrollView, View, Image, Alert} from 'react-native';
import { Button, Text, TextInput, FAB } from 'react-native-paper';
import { Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios';
import Constants from 'expo-constants';

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

export default function editCourse(){

     const { id } = useLocalSearchParams();
     const [course, setCourse] = useState<CourseInfo | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const [editableCourse, setEditableCourse] = useState<CourseInfo | null>(null);
    
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  useEffect(() => {
    const fetchCourse = async () => {
      console.log("Fetching course from:", apiUrl); // Log the API URL
      try {
        const response = await axios.get(`${apiUrl}/api/getCourse/${id}`);
        console.log("Fetched courses data:", response.data); // Log the fetched data
        setCourse(response.data); // Save the fetched course
        setEditableCourse(response.data); // Populate the editableCourse state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err); // Log any error
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
    console.log("Submitting updated course data:", editableCourse); // Log data
    try {
    
      // Update course data
      await axios.put(`${apiUrl}/api/updateCourse/${id}`, editableCourse);
      Alert.alert("Success", "Course updated successfully!");

     
    } catch (err) {
      console.error("Error updating course:", err);
      Alert.alert("Error", "Failed to update the course.");
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


  return(
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
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Teacher"
              value={editableCourse.teacher}
              onChangeText={(text) => handleFieldChange('teacher', text)}
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Audience"
              value={editableCourse.audience}
              onChangeText={(text) => handleFieldChange('audience', text)}
              multiline
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Benefits"
              value={editableCourse.benefits}
              onChangeText={(text) => handleFieldChange('benefits', text)}
              multiline
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Requirements"
              value={editableCourse.requirements}
              onChangeText={(text) => handleFieldChange('requirements', text)}
              multiline
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Description"
              value={editableCourse.description}
              onChangeText={(text) => handleFieldChange('description', text)}
              multiline
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Content"
              value={editableCourse.content}
              onChangeText={(text) => handleFieldChange('content', text)}
              multiline
              style={{ marginBottom: 10 }}
            />
            <TextInput
              label="Send Email Date"
              value={editableCourse.sendEmailDate}
              onChangeText={(text) => handleFieldChange('sendEmailDate', text)}
              style={{ marginBottom: 10 }}
            />

            <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
              Save Changes
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );

}