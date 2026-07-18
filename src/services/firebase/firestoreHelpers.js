import {collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where,writeBatch} from 'firebase/firestore';
import {db,firebaseReady} from './firebaseConfig';
export const requireDb=()=>{if(!firebaseReady||!db)throw new Error('Firebase no está configurado');return db};
export const ownedQuery=(name,uid,...constraints)=>query(collection(requireDb(),name),where('courierId','==',uid),...constraints);
export {collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where,writeBatch};
