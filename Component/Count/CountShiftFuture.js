import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import { View, Text } from "react-native";
import { db } from "../../Config/firebase";

export default function ShiftsCount() {
  const [futureShiftsCount, setFutureShiftsCount] = useState(0);

  useEffect(() => {
    const countFutureShifts = async () => {
      const now = moment().format("YYYY-MM-DD");
      const querySnapshot = await getDocs(
        query(collection(db, "shifts"), where("day", ">=", now))
      );
      setFutureShiftsCount(querySnapshot.size);
    };

    countFutureShifts();
  }, [db]);

  return (
    <View>
      <Text style={{color: "#fff", fontSize: 25}}>{futureShiftsCount}</Text>
    </View>
  );
}
