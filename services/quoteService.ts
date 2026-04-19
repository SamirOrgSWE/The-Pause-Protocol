import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function getAllQuotes() {
    const snapshot = await getDocs(collection(db, "quotes"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getRandomQuote() {
    const quotes = await getAllQuotes();
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Admin only
export async function addQuote(text: string, author: string, category: string) {
    return await addDoc(collection(db, "quotes"), { text, author, category });
}

export async function updateQuote(id: string, data: object) {
    return await updateDoc(doc(db, "quotes", id), data);
}

export async function deleteQuote(id: string) {
    return await deleteDoc(doc(db, "quotes", id));
}