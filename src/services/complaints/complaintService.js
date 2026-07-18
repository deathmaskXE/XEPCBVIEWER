import {collection,getDocs,orderBy} from 'firebase/firestore';import {ownedQuery} from '../firebase/firestoreHelpers';
export const listComplaints=async uid=>(await getDocs(ownedQuery('complaints',uid,orderBy('createdAt','desc')))).docs.map(d=>({id:d.id,...d.data()}));
