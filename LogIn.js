import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "./Config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      await AsyncStorage.setItem("token", token);
      const key = await AsyncStorage.getItem("token");
      setToken(token);
      console.log("Token stored in local storage.", token);
      navigation.navigate("Accueil");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenkey = await AsyncStorage.getItem("token");
        console.log("token exists", tokenkey);
        if (tokenkey) {
          navigation.navigate("Accueil");
        }
      } catch (error) {
        console.log("error");
      }
    };
    getToken();
  }, []);

  const Logout = async (navigation, setToken) => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("token");
      setToken(null);
      console.log("logged out !");
      navigation.navigate("Log In");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#1A938C"]} style={styles.container}>
        <View style={styles.logov}>
          <Image
            style={styles.logo}
            source={require("./logo.jpeg")}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title2}>Bienvenue !</Text>
        <Text style={styles.title}>Se connecter</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter !</Text>
        </Pressable>
        <Pressable style={styles.forgotButton}>
          <Text
            style={styles.forgotButtonText}
            onPress={() => navigation.navigate("Mot de passe oublié")}
          >
            Mot de passe oublié ?
          </Text>
        </Pressable>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
    color: "white",
  },
  title2: {
    fontSize: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  logov: {
    backgroundColor: "white",
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "white",
    width: 250,
    height: 40,
    borderWidth: 1,
    backgroundColor: "#1A938C",
    opacity: 0.5,
    borderColor: "white",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    width: "auto",
    backgroundColor: "#3A9BA4",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
    borderColor: "white",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  forgotButton: {
    marginTop: 15,
  },
  forgotButtonText: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 15,
  },
});
