import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const PresenceItem = ({ Presence }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <View style={styles.PresenceItem}>
      <Pressable onPress={toggleDetails}>
        <View style={styles.PresenceItemHeader}>
          <Text style={styles.PresenceItemTitle}>{Presence.title}</Text>
          <TouchableOpacity onPress={toggleDetails}>
            <Text style={styles.PresenceItemButton}>
              {showDetails ? <View></View> : <View></View>}
            </Text>
          </TouchableOpacity>
          <MaterialIcons name="history" size={24} color="black" />
        </View>
        {showDetails && (
          <View style={styles.PresenceItemDetails}>
            <Text style={styles.PresenceItemText}>{Presence.description}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  PresenceItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginTop: 5,
    borderBottomColor: "red",
    borderBottomWidth: 5,
    marginHorizontal: 16,
  },
  PresenceItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  PresenceItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  PresenceItemButton: {
    color: "#1A938C",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  PresenceItemDetails: {
    marginTop: 8,
  },
  PresenceItemText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
export default PresenceItem;
