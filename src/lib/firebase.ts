import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeyaMh-CDXugQOmpvkhMpUlvIgjZdsqOQ",
  authDomain: "boda-de-ambara.firebaseapp.com",
  databaseURL: "https://boda-de-ambara-default-rtdb.firebaseio.com",
  projectId: "boda-de-ambara",
  storageBucket: "boda-de-ambara.firebasestorage.app",
  messagingSenderId: "572570074462",
  appId: "1:572570074462:web:6f88da83fe68a072c563cf",
  measurementId: "G-2VFDGD02H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface RSVPData {
  firstName: string;
  lastName: string;
  attending: "si" | "no";
}

// Normalize name to create a safe, standard document ID for unique checking
export function generateRSVPId(firstName: string, lastName: string): string {
  const normalize = (str: string) => 
    str
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents/diacritics
      .replace(/[^a-z0-9]/g, ""); // remove non-alphanumeric chars
  
  const fName = normalize(firstName);
  const lName = normalize(lastName);
  return `${fName}_${lName}`;
}

export async function checkRSVPExists(firstName: string, lastName: string): Promise<boolean> {
  try {
    const docId = generateRSVPId(firstName, lastName);
    if (!docId || docId === "_") return false;
    
    const docRef = doc(db, "rsvps", docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking RSVP duplicate:", error);
    return false;
  }
}

export async function saveRSVP(data: RSVPData) {
  try {
    const docId = generateRSVPId(data.firstName, data.lastName);
    const docRef = doc(db, "rsvps", docId);
    
    await setDoc(docRef, {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      attending: data.attending,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving RSVP:", error);
    throw error;
  }
}
