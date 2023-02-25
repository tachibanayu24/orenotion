import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "pages"));

export const getPages = async () => {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};
