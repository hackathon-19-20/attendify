import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';


export const loginUser  = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    console.log("USERTOKEN::", token);
    return { success: true, token };
  } catch (err) {
    console.error('Error logging in:', err);
    return { success: false, message: 'Invalid email or password.' };
  }
};