import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Modal } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../Config/firebase";

function App({ navigation }) {
  const [items, setItems] = useState({});
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  function navigateToScreen(screenName) {
    toggleButtons();
    navigation.navigate(screenName);
  }

  // Render item for each event on the calendar
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Description du plage", { item: item })
        }
      >
        <Card>
          <Card.Content>
            <View>
              <Text>{item.nom}</Text>
              <Text>{item.title}</Text>
              <Text>
                <Ionicons name="ios-time" size={15} color="#1A938C" />
                {"    "}
                {item.startTime} - {item.endTime}
              </Text>
              <Text>
                <Ionicons name="location-sharp" size={15} color="#1A938C" />
                {"    "}
                {item.adresse}
              </Text>
              <Text>{item.type ? item.type : "PAB"}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  // Load data from Firestore and format it for the calendar
  const loadItems = async (day) => {
    const shiftsQuerySnapshot = await getDocs(collection(db, "shifts"));
    const shiftsACQuerySnapshot = await getDocs(collection(db, "shiftsAC"));

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
          nom: data.nom, // assuming the type field exists in the shiftsAC collection
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
    // Load events from Firestore for the current month
    const today = new Date();
    const month = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    loadItems(month);
  }, []);

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={new Date().toISOString().slice(0, 10)}
        renderItem={renderItem}
        style={{ marginBottom: 80 }}
      />
      <View style={styles.ajouterholder}>
        <TouchableOpacity style={styles.pointer} onPress={toggleButtons}>
          <Text style={styles.addButtonText}>{showButtons ? "x" : "+"}</Text>
        </TouchableOpacity>
        <Modal visible={showButtons} transparent={true}>
          <TouchableOpacity style={styles.modal} onPress={toggleButtons}>
            <View style={{ position: "absolute", bottom: 100 }}>
              <View style={styles.choices}>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() => navigateToScreen("Ajouter un shift")}
                >
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    Shift PAB
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigateToScreen("Ajouter un shift")}
                  style={styles.buttons}
                >
                  <Text
                    style={{ color: "white", fontSize: 32, marginBottom: 5 }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.choices}>
                <TouchableOpacity
                  style={styles.list}
                  onPress={() =>
                    navigateToScreen("Ajouter une plage à combler")
                  }
                >
                  <Text style={{ color: "white", marginLeft: 10 }}>
                    Shift à combler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigateToScreen("Ajouter une plage à Combler")
                  }
                  style={styles.buttons}
                >
                  <Text
                    style={{ color: "white", fontSize: 32, marginBottom: 5 }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
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
          <FontAwesome name="calendar" size={30} color="#1A938C" />
          <Text style={{ color: "#1A938C" }}>Horaire</Text>
        </Pressable>
        <Pressable
          style={styles.thisbutton}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },

  addButtonText: {
    color: "white",
    fontSize: 30,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "flex-end",
    marginTop: 63,
    marginBottom: 75,
  },
  list: {
    flex: 1,
    width: "100%",
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
  ajouterholder: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 10,
    marginLeft: "85%",
  },
  buttons: {
    backgroundColor: "#1A938C",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  list: {
    marginTop: 5,
    width: 160,
    height: 30,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#1A938C",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  choices: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 40,
    alignItems: "flex-start",
    marginVertical: 5,
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

export default App;
