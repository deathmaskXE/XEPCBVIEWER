import {doc,getDoc,requireDb,serverTimestamp,setDoc} from '../firebase/firestoreHelpers';
export const getUser=async uid=>(await getDoc(doc(requireDb(),'users',uid))).data()||null;
export const createCourierUser=(uid,data)=>setDoc(doc(requireDb(),'users',uid),{uid,role:'courier',status:'pending',displayName:data.displayName,email:data.email,phone:data.phone,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
