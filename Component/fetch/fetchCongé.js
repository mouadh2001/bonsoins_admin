import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

export async function loadItems() {
  const demandeACQuerySnapshot = await getDocs(collection(db, "congés"));

  const newItems = [];

  demandeACQuerySnapshot.forEach((doc) => {
    const data = doc.data();
    const demand = {
      nom: data.nom,
      raison: data.raison,
      datedébut: data.datedébut,
      datefin: data.datefin,
      starttime: data.starttime,
      endtime: data.endtime
    };

    newItems.push(demand);
  });

  return newItems;
}

export default function FetchAC() {
  
}
