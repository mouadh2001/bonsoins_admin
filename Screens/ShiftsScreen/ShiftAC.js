import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";

export default function shiftsACForm() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [type, setType] = useState("");
  const [nom, setNom] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    try {
      const docRef = await addDoc(collection(db, "shiftsAC"), {
        title: title,
        startTime: startTime,
        endTime: endTime,
        day: day,
        location: location,
        adresse: adresse,
        nom: nom,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
        />
        <Text style={styles.label}>Nom:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNom}
          value={nom}
        />
        <Text style={styles.label}>Start Time:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStartTime}
          value={startTime}
        />
        <Text style={styles.label}>End Time:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEndTime}
          value={endTime}
        />
        <Text style={styles.label}>Day:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDay}
          value={day}
        />
        <Text style={styles.label}>Adresse:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAdresse}
          value={adresse}
        />
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
        />
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setType}
          value={type}
        />
        <Pressable
          onPress={handleSubmit}
          style={[styles.button, isButtonDisabled && styles.disabledButton]}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginTop: 20,
    width: "90%",
    paddingLeft: 10,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1A938C",
    marginTop: 40,
    borderRadius: 40,
    width: "80%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
