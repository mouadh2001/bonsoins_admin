import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { View, Text } from "react-native";
import { db } from "../../Config/firebase";

export default function DemandesACCount() {
  const [DemandeACCount, setDemandeACCount] = useState(0);

  useEffect(() => {
    const countdemandeAC = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "demandeAC"))
      );
      setDemandeACCount(querySnapshot.size);
    };

    countdemandeAC();
  }, [db]);

  return (
    <View>
      <Text style={{ color: "#fff", fontSize: 25 }}>{DemandeACCount}</Text>
    </View>
  );
}
