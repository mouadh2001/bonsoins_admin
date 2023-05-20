import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { collection, getDocs, addDoc, query } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { Picker } from "@react-native-picker/picker";

export default function DemandForm() {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [nom, setNom] = useState("");
  const [location, setLocation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [names, setNames] = useState([]);
  const [name, setName] = useState(""); // Add the `nom` state

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "employés")));
        const names = querySnapshot.docs.map((doc) => {
          const nom = doc.data().nom;
          const prénom = doc.data().prénom;
          return { nom, prénom };
        });
        setNames(names);
      } catch (error) {
        console.error("Error fetching shift titles:", error);
      }
    };
  
    fetchNames();
  }, []);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    try {
      const docRef = await addDoc(collection(db, "shifts"), {
        title: title,
        startTime: startTime,
        endTime: endTime,
        day: day,
        location: location,
        adresse: adresse,
        nom: name,
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
        <TextInput style={styles.input} onChangeText={setTitle} value={title} />
        <Picker
          style={styles.picker}
          selectedValue={name} // Use the name variable as the selected value
          onValueChange={(itemValue) => setName(itemValue)} // Update the name variable when the value changes
        >
          <Picker.Item label="Selectionner un employé" value="" />
          {names.map((employee) => (
            <Picker.Item
              key={`${employee.nom}-${employee.prénom}`}
              label={`${employee.nom} ${employee.prénom}`}
              value={`${employee.nom} ${employee.prénom}`}
            />
          ))}
        </Picker>
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
        <TextInput style={styles.input} onChangeText={setDay} value={day} />
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
  picker: {
    marginBottom: 16,
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
