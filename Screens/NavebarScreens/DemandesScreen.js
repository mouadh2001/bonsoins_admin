import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DemandeAC from "../../Component/Demandes/DemandeAC";
import DemandeCongé from "../../Component/Demandes/DemandeCongé";

export default function DemandesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80 }}>
        <StatusBar style="auto" />
        <View>
          <DemandeCongé />
          <DemandeAC />
        </View>
      </ScrollView>

      <View style={styles.navebar}>
        <Pressable
          style={styles.touche}
          onPress={() => navigation.navigate("Accueil")}
        >
          <Octicons name="home" size={30} color="#888888" />
          <Text style={{ color: "#888888" }}>Accueil</Text>
        </Pressable>
        <Pressable
          style={styles.touche}
          onPress={() => navigation.navigate("Horaire")}
        >
          <FontAwesome name="calendar" size={30} color="#888888" />
          <Text style={{ color: "#888888" }}>Horaire</Text>
        </Pressable>
        <Pressable
          style={styles.touche}
          onPress={() => navigation.navigate("Presence")}
        >
          <MaterialIcons name="access-alarms" size={30} color="#888888" />
          <Text style={{ color: "#888888" }}>Présence</Text>
        </Pressable>
        <Pressable
          style={styles.thisbutton}
          onPress={() => navigation.navigate("Demandes")}
        >
          <MaterialIcons name="domain-verification" size={30} color="#1A938C" />
          <Text style={{ color: "#1A938C" }}>Demandes</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerdemande: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
  },

  //  The Nave Bar

  container: {
    flex: 1,
  },
  navebar: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: 77,
    width: "100%",
  },
  touche: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  thisbutton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
