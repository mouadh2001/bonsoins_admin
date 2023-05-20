import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import InputDate from "./Component/InputDate";
import InputHours from "./Component/InputHours";

export default function Conge() {
  const [ch1, setCh1] = useState(true);
  const [ch2, setCh2] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text>Congé</Text>
        <Text style={{ color: "white", fontSize: 25, fontWeight: 600 }}>
          Créer une Demande
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={-500}
      >
        <ScrollView style={styles.container2}>
          <Text style={{ padding: 50, fontWeight: 700, fontSize: 22 }}>
            Date
          </Text>
          <View style={{ gap: 25 }}>
            <View style={{ marginLeft: 50, flexDirection: "row" }}>
              <Checkbox
                value={ch1}
                onValueChange={setCh1}
                color={"#1A938C"}
                style={{ marginRight: 15 }}
              />
              <Text style={{ fontSize: 15 }}>Toute la journée</Text>
            </View>
            <View style={{ marginLeft: 50, flexDirection: "row" }}>
              <Checkbox
                value={ch2}
                onValueChange={setCh2}
                color={"#1A938C"}
                style={{ marginRight: 15 }}
              />
              <Text style={{ fontSize: 15 }}>Plusieurs jours</Text>
            </View>
          </View>
          {ch1 === true && ch2 === true ? (
            <View
              style={{
                marginTop: 50,
                width: "80%",
                alignSelf: "center",
                gap: 20,
              }}
            >
              <Text style={{ fontWeight: 600, color: "#040F34" }}>
                Commence le
              </Text>
              <InputDate />
              <Text style={{ fontWeight: 600, color: "#040F34" }}>
                Se Termine le
              </Text>
              <InputDate />
            </View>
          ) : ch1 === true ? (
            <View style={{ marginTop: 50, width: "80%", alignSelf: "center" }}>
              <InputDate />
            </View>
          ) : ch2 === true ? (
            <View
              style={{
                marginTop: 50,
                width: "80%",
                alignSelf: "center",
                gap: 20,
              }}
            >
              <Text style={{ fontWeight: 600, color: "#040F34" }}>
                Commence le
              </Text>
              <InputDate />
              <InputHours />
              <Text style={{ fontWeight: 600, color: "#040F34" }}>
                Se Termine le
              </Text>
              <InputDate />
              <InputHours />
            </View>
          ) : (
            <View
              style={{
                marginTop: 50,
                width: 294,
                alignSelf: "center",
                gap: 20,
              }}
            >
              <InputDate />
              <Text style={{ fontWeight: 600, color: "#040F34" }}>De</Text>
              <InputHours />
              <Text style={{ fontWeight: 600, color: "#040F34" }}>Jusqu'à</Text>
              <InputHours />
            </View>
          )}
          <View>
            <Text
              style={{
                marginLeft: 50,
                fontWeight: 700,
                fontSize: 22,
                marginVertical: 30,
              }}
            >
              Raison
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Raison de la Demande ..."
              mode="outlined"
              cursorColor={"#1A938C"}
              activeOutlineColor="#1A938C"
              style={{
                backgroundColor: "#a5cfcc",
                width: "80%",
                alignSelf: "center",
              }}
            />
          </View>
          <View style={styles.button}>
            <View
              style={{
                backgroundColor: "#1A938C",
                width: "90%",
                borderRadius: 50,
                height: 60,
                justifyContent: "center",
              }}
            >
              <Pressable>
                <Text
                  style={{
                    alignSelf: "center",
                    color: "#ffffff",
                    fontSize: 25,
                    fontWeight: "500",
                  }}
                >
                  Sauvegarder
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1A938C",
    padding: 50,
    paddingTop: 90,
    position: "absolute",
  },
  container2: {
    flex: 1,
    width: "100%",
    marginTop: "50%",
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "10%",
  },
});
