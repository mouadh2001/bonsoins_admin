import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { Image } from "react-native";

const EmployésScreen = () => {
  const [employés, setEmployés] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const currentUserEmail = auth.currentUser?.email; // Get the current user's email

    const employésCollectionRef = collection(db, "employés");
    const employésQuery = query(employésCollectionRef);

    const unsubscribe = onSnapshot(employésQuery, (snapshot) => {
      const employésData = snapshot.docs
        .filter((doc) => doc.data().email !== currentUserEmail) // Exclude the current user's details
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setEmployés(employésData);
    });

    return () => unsubscribe();
  }, []);

  const renderEmployéCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} key={item.id}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.nom}</Text>
            <Text style={styles.name}>{item.prénom}</Text>
          </View>
        </View>
        {/* Render other employé details */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Accueil")}
          style={styles.backButton}
        >
          <AntDesign name="close" size={35} color="#1A938C" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={employés}
        renderItem={renderEmployéCard}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Ajouter un employé")}
      >
        <Ionicons name="person-add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default EmployésScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    marginLeft: 15,
    marginTop: 40,
    width: 40,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 25, // Make it a circle by setting half of the width/height as the borderRadius
    marginRight: 10, // Add spacing between the image and details
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1A938C",
    borderRadius: 60,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
