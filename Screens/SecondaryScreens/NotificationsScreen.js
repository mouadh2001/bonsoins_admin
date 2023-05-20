import { View, ScrollView } from "react-native";
import React from "react";
import NotificationsItem from "../../Component/Notifications/Notifications";
import NotificationCheckedItem from "../../Component/Notifications/NotificationChecked";

const NotificationsScreen = () => {
  return (
    <View>
      <ScrollView>
        <NotificationsItem
          notification={{
            title: "Titre de notification",
            message: "Description de notification",
          }}
        />
        <NotificationCheckedItem
          notification={{
            title: "Titre de notification",
            message: "Description de notification",
          }}
        />
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
