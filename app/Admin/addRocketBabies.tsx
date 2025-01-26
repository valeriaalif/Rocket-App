import React, { useState } from "react";
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
  schedule: string;
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

export default function AddCourseBabies() {
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [duration, setDuration] = useState("");
  const [platform, setPlatform] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [mode, setMode] = useState("");
  const [availability, setAvailability] = useState("");
  const [inscriptionEndDate, setInscriptionEndDate] = useState("");
  const [sendEmailDate, setSendEmailDate] = useState("");
  const [benefits, setBenefits] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("");
  const [requirements, setRequirements] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const apiUrl = Constants.expoConfig?.extra?.API_URL;

  const handleSubmit = async () => {
    try {
      const formData: FormData = {
        title,
        teacher,
        startDate,
        finishDate,
        schedule,
        duration,
        platform,
        totalHours,
        mode,
        availability,
        inscriptionEndDate,
        sendEmailDate,
        benefits,
        description,
        content,
        audience,
        requirements,
        difficulty,
      };


      await axios.post(`${apiUrl}/api/registerCourseBabies`, formData);
      Alert.alert("Curso Registrado", "El curso ha sido registrado exitosamente");
      router.push("/Admin/");
    } catch (err) {
      console.error("Error submitting form:", err);
      Alert.alert("Error", "Failed to submit the form.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Formulario para Agregar Curso</Text>


      {[
        { label: "Título del Curso", value: title, setter: setTitle },
        { label: "Nombre del Docente", value: teacher, setter: setTeacher },
        { label: "Fecha de Inicio", value: startDate, setter: setStartDate },
        { label: "Fecha de Culminación", value: finishDate, setter: setFinishDate },
        { label: "Horario", value: schedule, setter: setSchedule },
        { label: "Duración", value: duration, setter: setDuration },
        { label: "Plataforma", value: platform, setter: setPlatform },
        { label: "Total de Horas", value: totalHours, setter: setTotalHours },
        { label: "Modalidad", value: mode, setter: setMode },
        { label: "Disponibilidad", value: availability, setter: setAvailability },
        { label: "Fecha Límite de Inscripción", value: inscriptionEndDate, setter: setInscriptionEndDate },
        { label: "Fecha de Envío de Correos", value: sendEmailDate, setter: setSendEmailDate },
        { label: "Nivel de Dificultad", value: difficulty, setter: setDifficulty },
      ].map((input, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{input.label}</Text>
          <TextInput
            value={input.value}
            onChangeText={input.setter}
            mode="outlined"
            style={styles.input}
          />
        </View>
      ))}


      {[
        { label: "Beneficios", value: benefits, setter: setBenefits },
        { label: "Descripción", value: description, setter: setDescription },
        { label: "Contenido del Curso", value: content, setter: setContent },
        { label: "¿A quién va dirigido el curso?", value: audience, setter: setAudience },
        { label: "Requisitos", value: requirements, setter: setRequirements },
      ].map((input, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{input.label}</Text>
          <TextInput
            value={input.value}
            onChangeText={input.setter}
            mode="outlined"
            style={styles.multilineInput}
            multiline
            scrollEnabled
            textAlignVertical="top"
          />
        </View>
      ))}


      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#6200ee"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleSubmit}
        >
          Agregar Curso
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 4,
  },
  input: {
    height: 50,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 80,
    height: 60,
    marginLeft: 22,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 35,
  },
});
