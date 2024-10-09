import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const loginUser = async (email: string, password: string) => {
  try {
    const usersRef = collection(db, 'userDetails');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: true }; // User found
    } else {
      return { success: false, message: 'Invalid email or password.' }; // User not found
    }
  } catch (err) {
    console.error('Error logging in:', err);
    return { success: false, message: 'Failed to log in. Please try again.' };
  }
};
