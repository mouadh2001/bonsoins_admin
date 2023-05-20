import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import StackReset from "./LoginScreens";
import "react-native-gesture-handler";

import HomeScreen from "../../Screens/NavebarScreens/HomeScreen";
import HoraireScreen from "../../Screens/NavebarScreens/HoraireScreen";
import PresenceScreen from "../../Screens/NavebarScreens/PresenceScreen";
import DemandesScreen from "../../Screens/NavebarScreens/DemandesScreen";

import Resources from "../../Screens/DrawerScreens/Resources";
import handleLogout from "../../Screens/SecondaryScreens/Logout";



import PointageScreen from "../../Screens/SecondaryScreens/PointageScreen";
import NotificationsScreen from "../../Screens/SecondaryScreens/NotificationsScreen";
import PlageDetails from "../../Screens/SecondaryScreens/PlageDetails";

import shiftPAB from "../../Screens/ShiftsScreen/ShiftPAB";
import shiftAC from "../../Screens/ShiftsScreen/ShiftAC";
import AjouterResourcesScreen from "../../Screens/SecondaryScreens/AjouterResources";

const Stack = createStackNavigator();

export default function StackScreens({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Log In"
        component={StackReset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          title: "Accueil",
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.opendrawer}
            >
              <MaterialCommunityIcons
                name="sort-variant"
                size={35}
                color="#1A938C"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              style={styles.opendrawer}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={30}
                color="#1A938C"
              />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Horaire"
        component={HoraireScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Presence"
        component={PresenceScreen}
        options={{
          title: "Présence",
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.opendrawer}
            >
              <MaterialCommunityIcons
                name="sort-variant"
                size={35}
                color="#1A938C"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("chercher")}
              style={styles.opendrawer}
            >
              <Fontisto name="search" size={30} color="#1A938C" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Demandes"
        component={DemandesScreen}
        options={{
          title: "Demandes",
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.opendrawer}
            >
              <MaterialCommunityIcons
                name="sort-variant"
                size={35}
                color="#1A938C"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("chercher")}
              style={styles.opendrawer}
            >
              <Fontisto name="search" size={30} color="#1A938C" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Pointage"
        component={PointageScreen}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
          title: "Notifications",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Notification checked")}
              style={styles.opendrawer}
            >
              <Ionicons name="checkmark-done" size={35} color="#1A938C" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Description du plage"
        component={PlageDetails}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Ajouter un shift"
        component={shiftPAB}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Ajouter une plage à combler"
        component={shiftAC}
        options={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#1A938C",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Ajouter un employé"
        component={AjouterResourcesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Resources"
        component={Resources}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Deconnextion"
        component={handleLogout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  opendrawer: {
    marginLeft: 15,
    marginRight: 15,
  },
});
