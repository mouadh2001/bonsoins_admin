import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { View, Text } from "react-native";
import { db } from "../../Config/firebase";

export default function DemandesCongéCount() {
  const [DemandeCongéCount, setDemandeCongéCount] = useState(0);

  useEffect(() => {
    const countdemandeCongé = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "congés"))
      );
      setDemandeCongéCount(querySnapshot.size);
    };

    countdemandeCongé();
  }, [db]);

  return (
    <View>
      <Text style={{ color: "#fff", fontSize: 25 }}>{DemandeCongéCount}</Text>
    </View>
  );
}
