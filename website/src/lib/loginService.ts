import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const loginUser = async (email: string, password: string) => {
  try {
    const usersRef = collection(db, 'userDetails');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const token = userDoc.id;
      return { success: true, token };
    } else {
      return { success: false, message: 'Invalid email or password.' };
    }
  } catch (err) {
    console.error('Error logging in:', err);
    return { success: false, message: 'Failed to log in. Please try again.' };
  }
};
