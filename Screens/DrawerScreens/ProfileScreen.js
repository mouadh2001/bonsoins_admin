import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 90 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backlogo}
        >
          <AntDesign name="close" size={35} color="#1A938C" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <StatusBar style="auto" />

        <View style={styles.profileInfoContainer}>
          <Text
            style={{
              color: "#1A938C",
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: "5%",
            }}
          >
            Profil
          </Text>
          <Pressable onPress={handlePickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Entypo name="camera" size={30} color="#040F34" />
              </View>
            )}
          </Pressable>
        </View>
        <View style={styles.inputholder}>
          <Text style={styles.inputtitle}>Information personel</Text>
          <TextInput
            placeholder="Prénom"
            onChangeText={setFirstName}
            value={firstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Nom"
            onChangeText={setLastName}
            value={lastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Date de naissance"
            onChangeText={setDate}
            value={date}
            style={styles.input}
          />

          <Text style={styles.inputtitle}>Detail de contact</Text>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            onChangeText={setAddress}
            value={address}
            style={styles.input}
          />
          <Text style={styles.inputtitle}>Numéro de telephone</Text>
          <TextInput
            placeholder="Numéro du téléphone"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            style={styles.input}
          />
          <Text style={styles.inputtitle}>Modifier le mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirmer le mot de passe"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}> Sauvegarder </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backlogo: {
    marginLeft: 15,
    marginTop: 40,
    width: 40,
  },
  profileInfoContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: "5%",
  },
  changeProfilePicText: {
    color: "#007AFF",
    fontSize: 16,
    marginTop: 10,
  },
  inputholder: {
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
  },
  inputtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: "3%",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 2,
    marginTop: 20,
    width: "90%",
    paddingLeft: 10,
    borderRadius: 5,
    marginLeft: "5%",
    marginRight: "5%",
  },
  saveButton: {
    backgroundColor: "#1A938C",
    marginTop: 20,
    borderRadius: 40,
    width: "90%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "5%",
    marginLeft: "5%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 35,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 15,
  },
  placeholder: {
    backgroundColor: "#1A938C",
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
});
