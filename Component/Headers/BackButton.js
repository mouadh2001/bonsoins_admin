import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ActualiteScreen({ navigation }) {
  return (
    <View style={styles.containerheader}>
      <TouchableOpacity
        style={styles.backlogo}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialCommunityIcons name="sort-variant" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerheader: {
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    left: 0,
  },

  backlogo: {
    marginLeft: 15,
    marginTop: 40,
  },
});
