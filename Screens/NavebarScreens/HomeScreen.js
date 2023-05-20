import * as React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db } from "../../Config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ShiftsCount from "../../Component/Count/CountShiftFuture";
import ShiftsACCount from "../../Component/Count/CountShiftAC";
import CountDac from "../../Component/Count/CountDac";
import CountCongé from "../../Component/Count/CountCongé";

function HomeScreen({ navigation }) {
  const [items, setItems] = useState({});

  const loadItems = async (day) => {
    const shiftsQuerySnapshot = await getDocs(
      query(collection(db, "shifts"), where("day", "==", day))
    );
    const shiftsACQuerySnapshot = await getDocs(
      query(collection(db, "shiftsAC"), where("day", "==", day))
    );

    const newItems = {};

    await Promise.all([
      shiftsQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.day;
        const event = {
          title: data.title,
          day: date,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
          adresse: data.adresse,
          nom: data.nom,
        };
        if (newItems[date]) {
          newItems[date].push(event);
        } else {
          newItems[date] = [event];
        }
      }),

      shiftsACQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.day;
        const event = {
          title: data.title,
          day: date,
          startTime: data.startTime,
          endTime: data.endTime,
          location: data.location,
          adresse: data.adresse,
          type: data.type,
          nom: data.nom,
        };
        if (newItems[date]) {
          newItems[date].push(event);
        } else {
          newItems[date] = [event];
        }
      }),
    ]);

    setItems(newItems);
  };

  useEffect(() => {
    const today = new Date();
    const month = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    loadItems(month);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.body}>
        <ScrollView>
          <View style={{ width: "100%", alignItems: "flex-start" }}>
            <Text style={{ marginLeft: 15, fontSize: 15 }}>A l'horaire</Text>
          </View>
          {Object.keys(items).map((key) => {
            const item = items[key];
            return (
              <View key={key}>
                {item.map((item, index) => (
                  <TouchableOpacity
                    style={styles.horaireplage}
                    key={index}
                    onPress={() =>
                      navigation.navigate("Description du plage", {
                        item: item,
                      })
                    }
                  >
                    <View style={styles.horaireplagebody}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          marginLeft: 10,
                          marginBottom: 2,
                        }}
                      >
                        {item.nom}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          marginLeft: 10,
                          marginBottom: 2,
                        }}
                      >
                        {item.title}
                        {"  "}
                        {item.type}
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          marginLeft: 15,
                          marginBottom: 2,
                        }}
                      >
                        <AntDesign name="calendar" size={15} color="#1A938C" />
                        {"   "}
                        {key}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginLeft: 15,
                          marginBottom: 2,
                        }}
                      >
                        <Ionicons name="ios-time" size={15} color="#1A938C" />
                        {"   "}
                        {item.startTime} - {item.endTime}
                      </Text>
                      <Text style={{ marginLeft: 15, marginBottom: 5 }}>
                        <Ionicons
                          name="location-sharp"
                          size={15}
                          color="#1A938C"
                        />
                        {"   "}
                        {item.location}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.element}
            onPress={() => navigation.navigate("Horaire")}
          >
            <View style={styles.elementleft}>
              <Text>
                <ShiftsCount />
              </Text>
            </View>
            <View style={styles.elementright}>
              <Text style={{ marginLeft: 15, fontSize: 20 }}>
                Voir les plages à venirs
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.element}
            onPress={() => navigation.navigate("Horaire")}
          >
            <View style={styles.elementvideleft}>
              <Text>
                <ShiftsACCount />
              </Text>
            </View>
            <View style={styles.elementright}>
              <Text style={{ marginLeft: 15, fontSize: 20 }}>
                Plages à combler disponibles
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.titles}>
            <Text style={{ fontSize: 15 }}>Demandes de congés</Text>
          </View>

          <TouchableOpacity
            style={styles.element}
            onPress={() => navigation.navigate("Demandes")}
          >
            <View style={styles.elementvideleft}>
              <Text>
                <CountCongé />
              </Text>
            </View>
            <View style={styles.elementright}>
              <Text style={{ marginLeft: 15, fontSize: 20 }}>
                Voir les demandes
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.titles}>
            <Text style={{ fontSize: 15 }}>Demandes de plage à combler</Text>
          </View>

          <TouchableOpacity
            style={styles.element}
            onPress={() => navigation.navigate("Demandes")}
          >
            <View style={styles.elementvideleft}>
              <Text>
                <CountDac />
              </Text>
            </View>
            <View style={styles.elementright}>
              <Text style={{ marginLeft: 15, fontSize: 20 }}>
                Voir les demandes
              </Text>
            </View>
          </TouchableOpacity>
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
          style={styles.thisbutton}
          onPress={() => navigation.navigate("Accueil")}
        >
          <Octicons name="home" size={30} color="#1A938C" />
          <Text style={{ color: "#1A938C" }}>Accueil</Text>
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 5,
    width: "100%",
    height: "87%",
  },
  horaireplage: {
    backgroundColor: "white",
    width: "96%",
    height: 150,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: "2%",
    marginRight: "2%",
    borderTopWidth: 15,
    borderColor: "#FFD600",
  },
  horaireplagebody: {
    width: "100%",
    height: "85%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  element: {
    width: "96%",
    height: 50,
    marginLeft: "2%",
    marginRight: "2%",
    backgroundColor: "white",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 5,
  },
  elementleft: {
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  elementvideleft: {
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  elementright: {
    justifyContent: "center",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  titles: {
    width: "95%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 15,
    marginLeft: 10,
  },
  elementdown: {
    height: 50,
    marginLeft: "2%",
    marginRight: "2%",
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 5,
  },

  pointer: {
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
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
    position: "absolute",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: 77,
    width: "100%",
    bottom: 0,
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
