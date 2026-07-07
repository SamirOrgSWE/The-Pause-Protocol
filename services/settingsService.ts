import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const DEFAULT_COOLDOWN_MINUTES = 5;

const MIN_COOLDOWN_MINUTES = 1;
const MAX_COOLDOWN_MINUTES = 1440;

let cachedCooldownMinutes: number | null = null;

function clampMinutes(minutes: number) {
    return Math.min(Math.max(Math.round(minutes), MIN_COOLDOWN_MINUTES), MAX_COOLDOWN_MINUTES);
}

//how long "Continue" unlocks a blocked app for, before the pause fires again
export async function getCooldownMinutes(): Promise<number> {
    if (cachedCooldownMinutes !== null) return cachedCooldownMinutes;

    const user = auth.currentUser;
    if (!user) return DEFAULT_COOLDOWN_MINUTES;

    try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const stored = snap.exists() ? snap.data().cooldownMinutes : undefined;
        if (typeof stored !== "number" || !Number.isFinite(stored)) return DEFAULT_COOLDOWN_MINUTES;

        cachedCooldownMinutes = clampMinutes(stored);
        return cachedCooldownMinutes;
    } catch {
        return DEFAULT_COOLDOWN_MINUTES;
    }
}

export async function setCooldownMinutes(minutes: number): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be signed in to change this setting.");

    const clamped = clampMinutes(minutes);
    await setDoc(doc(db, "users", user.uid), { cooldownMinutes: clamped }, { merge: true });
    cachedCooldownMinutes = clamped;
}
