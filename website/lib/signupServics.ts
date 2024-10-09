import { collection, doc, query, where, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { nanoid } from 'nanoid';

const generateUserId = () => {
  return `U-${nanoid(8)}`; 
};

export const registerUser = async (email: string, password: string) => {
  try {
    const usersRef = collection(db, 'userDetails');

    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, message: 'User already exists. Please log in.' };
    }

    const userId = generateUserId();

    await setDoc(doc(usersRef, userId), { email, password });

    return { success: true, userId };
  } catch (err) {
    console.error('Error registering user:', err);
    return { success: false, message: 'Failed to register. Please try again.' };
  }
};
