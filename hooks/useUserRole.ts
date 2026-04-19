import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export function useUserRole() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            const user = auth.currentUser;
            if (!user) return;
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) setRole(snap.data().role);
        };
        fetchRole();
    }, []);

    return role;
}