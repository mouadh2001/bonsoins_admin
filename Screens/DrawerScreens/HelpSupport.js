import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function HelpSupport({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backlogo}
        >
          <AntDesign name="close" size={35} color="#1A938C" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backlogo: {
    marginLeft: 15,
    marginTop: 40,
  },
});
