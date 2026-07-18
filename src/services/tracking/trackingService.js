import {doc,getDoc,requireDb} from '../firebase/firestoreHelpers';
export const getPublicTracking=async token=>{const snap=await getDoc(doc(requireDb(),'publicTracking',token));return snap.exists()?snap.data():null};
