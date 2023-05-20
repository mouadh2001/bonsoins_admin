import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PresenceItem from "../../Component/Presence/Presence";
import PresenceCheckedItem from "../../Component/Presence/PresenceCheked";
import { StatusBar } from "expo-status-bar";

function PresenceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.body}>
        <ScrollView style={{ marginBottom: 80, width: "100%" }}>
          <PresenceItem
            Presence={{
              title: "Titre de presence",
              description: "Description de presence",
            }}
          />
          <PresenceCheckedItem
            Presence={{
              title: "Titre de Presence",
              description: "Description de Presence",
            }}
          />
        </ScrollView>
      </View>
      <View style={styles.pointerholder}>
        <TouchableOpacity
          style={styles.pointer}
          onPress={() => navigation.navigate("Pointage")}
        >
          <MaterialIcons name="timer" size={40} color="white" />
        </TouchableOpacity>
      </View>
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
          style={styles.thisbutton}
          onPress={() => navigation.navigate("Presence")}
        >
          <MaterialIcons name="access-alarms" size={30} color="#1A938C" />
          <Text style={{ color: "#1A938C" }}>Présence</Text>
        </Pressable>
        <Pressable
          style={styles.touche}
          onPress={() => navigation.navigate("Demandes")}
        >
          <MaterialIcons name="domain-verification" size={30} color="#888888" />
          <Text style={{ color: "#888888" }}>Demandes</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default PresenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pointer: {
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 25,
    marginBottom: 90,
  },
  pointerholder: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 10,
    marginLeft: "85%",
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
