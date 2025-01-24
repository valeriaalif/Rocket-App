import React from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Constants from "expo-constants";
import { router } from "expo-router";
import axios from "axios";

interface FormData {
  title: string;
  teacher: string;
  startDate: string;
  finishDate: string;
  schedule: string; // or string if you prefer
  duration: string;
  platform: string;
  totalHours: string;
  mode: string;
  availability: string;
  inscriptionEndDate: string;
  sendEmailDate: string;
  benefits: string;
  description: string;
  content: string;
  audience: string;
  requirements: string;
  difficulty: string;
}

export default function AddCourse() {
  const [title, setTitle] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [finishDate, setFinishDate] = React.useState("");
  const [schedule, setSchedule] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [totalHours, setTotalHours] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [availability, setAvailability] = React.useState("");
  const [inscriptionEndDate, setInscriptionEndDate] = React.useState("");
  const [sendEmailDate, setSendEmailDate] = React.useState("");
  const [benefits, setBenefits] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [audience, setAudience] = React.useState("");
  const [requirements, setRequirements] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");
  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  const handleSubmit = async () => {
    try {

        // Prepare the form data
        const formData: FormData = {
         title: title,
         teacher: teacher,
         startDate: startDate,
         finishDate: finishDate,
         schedule: schedule, // or string if you prefer
         duration: duration,
         platform: platform,
         totalHours: totalHours,
         mode: mode,
         availability: availability, 
         inscriptionEndDate: inscriptionEndDate,
         sendEmailDate: sendEmailDate,
         benefits: benefits,
         description: description,
         content: content,
         audience: audience,
         requirements: requirements,
         difficulty: difficulty
        };
  
            // Log formData to verify its structure
            console.log("Form Data:", formData);
  
      await axios.post(`${apiUrl}/api/registerCourseBabies`, formData);
      Alert.alert("Success", "Course registered successfully");
      router.push("/(tabs)/rocketStudent");
    } catch (err) {
      console.error("Error submitting form:", err);
      Alert.alert("Error", "Failed to submit the form.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Formulario de Inscripción</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título del Curso</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del Docente</Text>
        <TextInput
          value={teacher}
          onChangeText={setTeacher}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Inicio</Text>
        <TextInput
          value={startDate}
          onChangeText={setStartDate}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Culminación</Text>
        <TextInput
          value={finishDate}
          onChangeText={setFinishDate}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Horario</Text>
        <TextInput
          value={schedule}
          onChangeText={setSchedule}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Duración</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Plataforma</Text>
        <TextInput
          value={platform}
          onChangeText={setPlatform}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Total de Horas</Text>
        <TextInput
          value={totalHours}
          onChangeText={setTotalHours}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Modalidad</Text>
        <TextInput
          value={mode}
          onChangeText={setMode}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Disponibilidad</Text>
        <TextInput
          value={availability}
          onChangeText={setAvailability}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha Límite de Inscripción</Text>
        <TextInput
          value={inscriptionEndDate}
          onChangeText={setInscriptionEndDate}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha de Envío de Correos</Text>
        <TextInput
          value={sendEmailDate}
          onChangeText={setSendEmailDate}
          mode="outlined"
          style={styles.input}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Beneficios</Text>
        <TextInput
          value={benefits}
          onChangeText={setBenefits}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Contenido del Curso</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>¿A quién va dirigido el curso?</Text>
        <TextInput
          value={audience}
          onChangeText={setAudience}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Requisitos</Text>
        <TextInput
          value={requirements}
          onChangeText={setRequirements}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nivel de Dificultad</Text>
        <TextInput
          value={difficulty}
          onChangeText={setDifficulty}
          mode="outlined"
          style={styles.input}
        />
      </View>

      <View
  style={{
    flex: 1,
    alignItems: 'center', // Centers horizontally
    marginTop: 20,        // Adds spacing from the form fields
  }}
>
  <Button
    mode="contained"
    buttonColor="#6200ee"
    style={{
      paddingHorizontal: 80, // Width of the button
      height: 70,            // Height of the button
      marginLeft: 22,
    }}
    labelStyle={{
      fontSize: 16,          // Larger font size
      lineHeight: 42,        // Adjust line height for text
    }}
    onPress={handleSubmit}
  >
    Registrar Curso
  </Button>
</View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "flex-start", // Align items to the start of the column
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    width: "100%", // Ensure input fields take full width
  },
  label: {
    marginBottom: 4,
  },
  input: {
    height: 50,
  },
  button: {
    marginTop: 20,
    alignSelf: "center", // Align the button to the start of the column
  },
});
