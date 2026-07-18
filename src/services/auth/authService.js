import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';import {auth} from '../firebase/firebaseConfig';
export const signIn=(email,password)=>signInWithEmailAndPassword(auth,email,password);
export const signOutUser=()=>signOut(auth);
export const createAuthUser=(email,password)=>createUserWithEmailAndPassword(auth,email,password);
