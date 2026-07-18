import {collection,getDocs,limit,orderBy,query} from 'firebase/firestore';
import {requireDb} from '../firebase/firestoreHelpers';

const rows=async(name,constraints=[])=>{
  const snapshot=await getDocs(query(collection(requireDb(),name),...constraints));
  return snapshot.docs.map(item=>({id:item.id,...item.data()}));
};

const phoneKey=value=>String(value||'').replace(/\D/g,'');
const dateLabel=value=>{
  const date=value?.toDate?.()||new Date(value||0);
  return Number.isNaN(date.getTime())?'Fecha no disponible':date.toLocaleString('es-GT',{dateStyle:'medium',timeStyle:'short'});
};

export async function listEnrichedAdminRecords(collectionName){
  const [records,users,couriers,clients,orders]=await Promise.all([
    rows(collectionName,[orderBy('createdAt','desc'),limit(100)]),rows('users'),rows('couriers'),rows('clients'),rows('orders'),
  ]);
  const userById=new Map(users.map(item=>[item.id,item]));
  const courierById=new Map(couriers.map(item=>[item.id,{...userById.get(item.id),...item}]));
  const clientById=new Map(clients.map(item=>[item.id,item]));
  const clientByPhone=new Map(clients.map(item=>[phoneKey(item.phone),item]));
  const orderById=new Map(orders.map(item=>[item.id,item]));
  return records.map(record=>{
    const order=orderById.get(record.orderId)||(record.entityType==='order'?orderById.get(record.entityId):null)||null;
    const courierId=record.courierId||order?.courierId||(record.actorRole==='courier'?record.actorUid:null);
    const courier=courierById.get(courierId)||userById.get(courierId)||null;
    const client=clientById.get(record.clientId||order?.clientId)||clientByPhone.get(phoneKey(record.phone||record.clientPhone||order?.phone))||null;
    const actor=userById.get(record.actorUid)||courierById.get(record.actorUid)||null;
    return {...record,order,courier,client,actor,createdAtLabel:dateLabel(record.createdAt)};
  });
}
