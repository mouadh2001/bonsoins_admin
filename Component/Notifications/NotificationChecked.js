import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const NotificationCheckedItem = ({ notification }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.notificationItem}>
      <Pressable onPress={toggleDetails}>
        <View style={styles.notificationItemHeader}>
          <Text style={styles.notificationItemTitle}>{notification.title}</Text>
          <TouchableOpacity onPress={toggleDetails}>
            <Text style={styles.notificationItemButton}>
              {showDetails ? <View></View> : <View></View>}
            </Text>
          </TouchableOpacity>
          <Entypo name="bell" size={24} color="black" />
        </View>
        {showDetails && (
          <View style={styles.notificationItemDetails}>
            <Text style={styles.notificationItemText}>
              {notification.message}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    marginTop: 5,
    borderBottomWidth: 5,
    borderBottomColor: "#1A938C",
    marginHorizontal: 16,
  },
  notificationItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  notificationItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  notificationItemButton: {
    color: "#1A938C",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  notificationItemDetails: {
    marginTop: 8,
  },
  notificationItemText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});

export default NotificationCheckedItem;
