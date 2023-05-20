import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function ResetPassword({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backlogo}
        >
          <AntDesign name="close" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.lockiconholder}>
          <View>
            <MaterialIcons name="lock-outline" size={100} color="white" />
          </View>
        </View>
        <Text style={styles.titleone}>Perdu vos clés</Text>
        <Text style={styles.titletwo}>Ca arrive à tous</Text>
        <View style={{ width: 300 }}>
          <Text style={styles.hints}>
            Pour réinitialiser votre mot de passe, entrez l’dresse courriel liée
            à votre compte ci-dessous
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={setEmail}
        />
      </View>
    </View>
  );
}

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A938C",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
  },
  backlogo: {
    marginLeft: 15,
    marginTop: 40,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  lockiconholder: {
    marginTop: 100,
    marginBottom: 50,
    borderRadius: 150,
    width: 150,
    height: 150,
    borderWidth: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  titleone: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#6AC4C8",
  },
  titletwo: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "white",
    marginBottom: 30,
  },
  hints: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
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
});
