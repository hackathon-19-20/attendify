import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { setUserCookie } from './cookiesClient'; 

const auth = getAuth(app);


export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      email,
      uid: userCredential.user.uid,
    };
    const userId = `U-${userCredential.user.uid}`;

    // Save user details to Firestore
    await setDoc(doc(collection(db, 'userDetails'), userId), userData);

    // Store user UID in cookies
    await setUserCookie(userCredential.user.uid, 7); // Set cookie for 7 days

    console.log("User registered and saved to cookies:", userData);
    return { success: true, userId };
  } catch (err) {
    console.error('Error registering user:', err);
    return { success: false, message: 'Failed to register. Please try again.' };
  }
};
