import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

export async function loadItems() {
  const demandeACQuerySnapshot = await getDocs(collection(db, "demandeAC"));

  const newItems = [];

  demandeACQuerySnapshot.forEach((doc) => {
    const data = doc.data();
    const demand = {
      title: data.title,
      nom: data.nom,
      description: data.description,
    };

    newItems.push(demand);
  });

  return newItems;
}

export default function FetchAC() {
  
}
