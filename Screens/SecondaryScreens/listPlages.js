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

function HomeScreen({ navigation }) {
  const [items, setItems] = useState({});

  const loadItems = async (day) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("day", "==", day))
    );
    const newItems = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.day;
      const event = {
        title: data.title,
        day: date,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
      };
      if (newItems[date]) {
        newItems[date].push(event);
      } else {
        newItems[date] = [event];
      }
    });
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
            <Text style={{ marginLeft: 15 }}>A l'horaire</Text>
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
                    <View style={styles.headerhoraireplage}></View>
                    <View style={styles.horaireplagebody}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "700",
                          marginLeft: 15,
                          marginBottom: 2,
                        }}
                      >
                        {item.title}
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
        </ScrollView>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  body: {
    marginTop: 5,
    alignItems: "center",
    width: "100%",
    height: "87%",
  },
  scrollview: {
    alignItems: "center",
  },
  horaireplage: {
    backgroundColor: "white",
    width: "95%",
    height: 120,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerhoraireplage: {
    backgroundColor: "#FFD600",
    height: "15%",
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  horaireplagebody: {
    width: "100%",
    height: "85%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
