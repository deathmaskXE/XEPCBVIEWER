import {addDoc,collection,orderBy} from 'firebase/firestore';import {getDocs,ownedQuery,requireDb,serverTimestamp} from '../firebase/firestoreHelpers';
export const normalizePhone=v=>String(v||'').replace(/\D/g,'');
export const listClients=async uid=>(await getDocs(ownedQuery('clients',uid,orderBy('createdAt','desc')))).docs.map(d=>({id:d.id,...d.data()}));
export const createClient=(uid,data)=>addDoc(collection(requireDb(),'clients'),{courierId:uid,name:data.name,phone:data.phone,normalizedPhone:normalizePhone(data.phone),positiveRatings:0,negativeRatings:0,complaintsCount:0,completedOrders:0,unpaidOrders:0,rejectedOrders:0,averageRating:0,trustStatus:'Cliente confiable',createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
