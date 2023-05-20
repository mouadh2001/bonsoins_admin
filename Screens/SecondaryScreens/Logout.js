import React from "react";
import { Text, Pressable, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const handleLogout = (navigation) => {
  // Sign out user from Firebase
  signOut(auth)
    .then(() => {
      // Remove token from AsyncStorage or any other cleanup operations
      AsyncStorage.removeItem("token");
      console.log("Logged out successfully!");
      navigation.navigate("Log In");
      // You can navigate to the login screen or any other desired screen here
    })
    .catch((error) => {
      console.log("Logout error:", error);
    });
};

const LogoutScreen = ({ navigation }) => {
  const showAlert = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment quitter ?",
      [
        {
          text: "No",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleLogout(navigation),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Pressable style={styles.container} onPress={showAlert}>
      <Text style={styles.text}>Toucher l'écran pour déconnecter</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A938C",
  },
  text: {
    fontSize: 40,
    fontWeight: "400",
    color: "#fff",
    textAlign:"center"
  },
});

export default LogoutScreen;
