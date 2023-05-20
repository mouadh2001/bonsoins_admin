import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Publication from "../../Component/Publications/Publication";

export default function ActualiteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerheader}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backlogo}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={35} color="#1A938C" />
            </TouchableOpacity>
            <Text style={styles.headertitle}>Actualités</Text>
            <TouchableOpacity
              style={styles.searchlogo}
              onPress={() => alert("chercher ok")}
            >
              <View>
                <Fontisto name="search" size={35} color="#1A938C" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.containeractualite}>
          {/* <View style={styles.listholder}>
            <MaterialIcons name="campaign" size={30} color="#888888" />
          </View>
          <View style={styles.textholder}>
            <Text style={styles.title}>
              {" "}
              Toutes les communications liées au travail en un seul endroit
            </Text>
            <Text style={styles.actualitetext}>
              le fil d'actualité permet à votre gestionnaire d’horaire de
              partager diverses annonces et documents importants. il n'y a pas
              de publications pour le moment
            </Text>
          </View> */}
        </View>
        <View>
          <Publication />
          <Publication />
          <Publication />
          <Publication />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerheader: {
    flex: 1,
    width: "100%",
    marginBottom: 94,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    backgroundColor: "white",
    height: 63,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backlogo: {
    color: "#1A938C",
    marginLeft: 15,
    marginTop: 15,
  },
  searchlogo: {
    color: "#1A938C",
    marginRight: 15,
    marginTop: 15,
  },
  headertitle: {
    color: "#1A938C",
    fontSize: 20,
    marginTop: 15,
    fontWeight: "500",
  },
  container: {
    flex: 1,
  },
  containeractualite: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    width: "100%",
    marginTop: 0,
  },

  // The Campaign Icon

  listholder: {
    borderColor: "#888888",
    borderWidth: 2,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  // The Texts

  textholder: {
    width: 320,
  },
  title: {
    textAlign: "center",
    color: "#040F34",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  actualitetext: {
    color: "#040F34",
    textAlign: "center",
  },
});
