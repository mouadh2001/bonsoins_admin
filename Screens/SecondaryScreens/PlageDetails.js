import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function PlageDetails({ route }) {
  const { item } = route.params;
  const [location, setLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const handlePointerPress = () => {};

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    const destination = item.location;
    if (destination) {
      const url = `https://nominatim.openstreetmap.org/search?q=${destination}&format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setDestinationCoords({
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            });
          } else {
            console.log("Destination not found");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [item.location]);

  useEffect(() => {
    if (location && destinationCoords) {
      const R = 6371;
      const dLat = deg2rad(destinationCoords.latitude - location.latitude);
      const dLon = deg2rad(destinationCoords.longitude - location.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(location.latitude)) *
          Math.cos(deg2rad(destinationCoords.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;

      setDistance(`${dist.toFixed(1)} km`);
    }
  }, [location, destinationCoords]);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const limit = "1 km";
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Start Time:</Text>
          <Text style={styles.value}>{item.startTime}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>End Time:</Text>
          <Text style={styles.value}>{item.endTime}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Adresse:</Text>
          <Text style={styles.value}>{item.adresse}</Text>
        </View>
      </View>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
          {destinationCoords && (
            <Marker
              coordinate={{
                latitude: destinationCoords.latitude,
                longitude: destinationCoords.longitude,
              }}
            />
          )}
        </MapView>
      )}
      <Button
        title="pointer"
        disabled={distance > limit}
        onPress={handlePointerPress}
      />
      {distance && (
        <Text style={styles.distanceLabel}>
          {distance <= limit
            ? "Tu peux pointer !!"
            : "Tu ne peux pas pointer !!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    flex: 2,
    fontSize: 16,
  },

  distanceLabel: {
    fontSize: 18,
    marginTop: 20,
  },
});

// import { View, Text, StyleSheet, Button, Linking } from "react-native";
// import React from "react";
// import WebView from "react-native-webview";

// function PlageDetails({ route }) {
//   const { item } = route.params;

//   return (
//     <View style={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//       </View>
//       <View style={styles.detailsContainer}>
//         <View style={styles.detailsRow}>
//           <Text style={styles.label}>Start Time:</Text>
//           <Text style={styles.value}>{item.startTime}</Text>
//         </View>
//         <View style={styles.detailsRow}>
//           <Text style={styles.label}>End Time:</Text>
//           <Text style={styles.value}>{item.endTime}</Text>
//         </View>
//         <View style={styles.detailsRow}>
//           <Text style={styles.label}>Location:</Text>
//           <Text style={styles.value}>{item.location}</Text>
//         </View>
//       </View>

//       <View style={styles.mapContainer}>
//         <WebView
//           source={{
//             uri: `https://www.google.com/maps/search/?api=1&query=${item.location}`,
//           }}
//           style={styles.map}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   titleContainer: {
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 1,
//     paddingBottom: 10,
//     marginBottom: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   detailsContainer: {
//     marginBottom: 5,
//   },
//   detailsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   label: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   value: {
//     flex: 2,
//     fontSize: 16,
//   },
//   mapContainer: {
//     flex: 1,
//     marginTop: 5,
//   },
//   map: {
//     flex: 1,
//     width: "100%",
//     height: 200,
//   },
// });

// export default PlageDetails;
