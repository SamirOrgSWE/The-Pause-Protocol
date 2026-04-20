import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";


//fetch quotes from firestore
export async function getAllQuotes() {
    const snapshot = await getDocs(collection(db, "quotes"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}


//random quotes for timer
export async function getRandomQuote() {
    const quotes = await getAllQuotes();
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Admin only

//add new quote
export async function addQuote(text: string, author: string, category: string) {
    return await addDoc(collection(db, "quotes"), { text, author, category });
}


//update existing quote
export async function updateQuote(id: string, data: object) {
    return await updateDoc(doc(db, "quotes", id), data);
}


//delete existing quote
export async function deleteQuote(id: string) {
    return await deleteDoc(doc(db, "quotes", id));
}