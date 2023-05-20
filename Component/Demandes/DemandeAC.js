import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { loadItems } from "../fetch/fetchAC";
import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DemandeACScreen = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadItems();
        setItems(data);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (itemId) => {
    setSelectedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  return (
    <View style={styles.container}>
      {items.map((demand, index) => (
        <View key={index} style={styles.demandItem}>
          <Pressable onPress={() => toggleDetails(index)}>
            <View style={styles.demandItemHeader}>
              <Text style={styles.demandItemTitle}>{demand.nom}</Text>
              <Text style={styles.demandItemButton}>
                {selectedItemId === index ? (
                  <FontAwesome name="folder-open" size={24} color="#1A938C" />
                ) : (
                  <Entypo name="folder" size={24} color="#1A938C" />
                )}
              </Text>
            </View>
            {selectedItemId === index && (
              <View style={styles.demandItemDetails}>
                <Text style={styles.demandItemText}>{demand.title}</Text>
                <Text style={styles.demandItemText}>{demand.description}</Text>
              </View>
            )}
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  demandItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginTop: 5,
    borderBottomWidth: 5,
    borderBottomColor: "#1A938C",
    borderTopWidth: 5,
    borderTopColor: "#FFD600",
    marginHorizontal: 16,
  },
  demandItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  demandItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  demandItemButton: {
    color: "#1A938C",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  demandItemDetails: {
    marginTop: 8,
  },
  demandItemText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});

export default DemandeACScreen;
