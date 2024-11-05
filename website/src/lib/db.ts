import { db } from "@/firebaseConfig";
import { User } from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const addTimetable = async (user: User, timetableDetails: Timetable) => {
    const timetableEntry = timetableDetails;

    try {
        const userDocRef = doc(db, "timetable", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // If the document exists, add the new entry to the user's existing timetable
            await updateDoc(userDocRef, {
                timetableEntries: arrayUnion(timetableEntry),
            });
            console.log("Timetable entry added to existing user document.");
        } else {
            // If the document does not exist, create it with the new entry
            await setDoc(userDocRef, {
                timetableEntries: [timetableEntry],
                userId: user.uid,
            });
            console.log("New user document created with timetable entry.");
        }
        return { success: true }
    } catch (error) {
        console.error("Error writing document: ", error);
        return { success: false }
    }
};
