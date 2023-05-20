import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../../LogIn";
import ResetPassword from "../../Screens/SecondaryScreens/ResetPassword";
import { StyleSheet } from "react-native";

const StackR = createStackNavigator();

export default function StackReset() {
  return (
    <StackR.Navigator>
      <StackR.Screen
        name="Log In"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <StackR.Screen
        name="Mot de passe oublié"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </StackR.Navigator>
  );
}

const styles = StyleSheet.create({
  opendrawer: {
    marginLeft: 15,
    marginRight: 15,
  },
});
