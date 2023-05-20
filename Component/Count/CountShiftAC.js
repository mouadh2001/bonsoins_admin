import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import { View, Text } from "react-native";
import { db } from "../../Config/firebase";

export default function ShiftsACCount() {
  const [futureShiftsACCount, setFutureShiftsACCount] = useState(0);

  useEffect(() => {
    const countFutureShiftsAC = async () => {
      const now = moment().format("YYYY-MM-DD");
      const querySnapshot = await getDocs(
        query(collection(db, "shiftsAC"), where("day", ">=", now))
      );
      setFutureShiftsACCount(querySnapshot.size);
    };

    countFutureShiftsAC();
  }, [db]);

  return (
    <View>
      <Text style={{ color: "#fff", fontSize: 25 }}>{futureShiftsACCount}</Text>
    </View>
  );
}
