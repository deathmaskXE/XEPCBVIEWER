import {useEffect,useState} from 'react';
import AppShell from '../../components/layout/AppShell';
import PageTitle from '../../components/common/PageTitle';
import ComplaintBadge from '../../components/complaints/ComplaintBadge';
import {useAuth} from '../../contexts/AuthContext';
import {listEnrichedAdminRecords} from '../../services/audit/adminRecordService';

const value=(...options)=>options.find(item=>item!==undefined&&item!==null&&item!=='')||'No disponible';

function RecordCard({item,collectionName}){
  const order=item.order||item;
  const courierName=value(item.courier?.displayName,item.courierName,'Repartidor no identificado');
  const clientName=value(item.client?.name,order.clientName,item.clientName,'Cliente no identificado');
  const title=collectionName==='auditLogs'?value(item.action,'Actividad administrativa'):value(order.number,item.orderNumber,item.subject,item.reason,'Registro');
  return <article className="adminRecord">
    <div className="adminRecordHead">
      <span className="avatar">{String(collectionName==='auditLogs'?value(item.actor?.displayName,'A'):courierName).charAt(0).toUpperCase()}</span>
      <div><b>{title}</b><small>{item.createdAtLabel}</small></div>
      {collectionName==='complaints'&&<ComplaintBadge status={item.status}/>} 
    </div>
    <div className="adminRecordGrid">
      <span><small>Repartidor</small><b>{courierName}</b><em>{value(item.courier?.phone,item.courier?.email)}</em></span>
      <span><small>Cliente</small><b>{clientName}</b><em>{value(item.client?.phone,order.phone,item.clientPhone)}</em></span>
      <span><small>Pedido / servicio</small><b>{value(order.number,item.orderNumber,'Sin pedido asociado')}</b><em>{value(order.service,order.status)}</em></span>
      {collectionName==='auditLogs'&&<span><small>Realizado por</small><b>{value(item.actor?.displayName,item.actor?.email,item.actorRole)}</b><em>{value(item.entityType,'Actividad del sistema')}</em></span>}
    </div>
    {(item.description||item.reason||item.message)&&<p className="adminRecordNote"><b>Detalle para aclaración:</b> {value(item.description,item.reason,item.message)}</p>}
  </article>;
}

export default function AdminCollectionPage({collectionName,title}){
  const {demo}=useAuth(),[items,setItems]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
  useEffect(()=>{let active=true;if(demo){setItems([]);setLoading(false);return()=>{active=false}}setLoading(true);setError('');listEnrichedAdminRecords(collectionName).then(data=>{if(active)setItems(data)}).catch(err=>{if(active)setError(err.message)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[collectionName,demo]);
  return <AppShell admin><div className="page"><PageTitle eyebrow="VISTA ADMINISTRATIVA" title={title}/><div className="panel adminRecords">{loading?<p>Cargando información relacionada…</p>:error?<p className="error">{error}</p>:items.length?items.map(item=><RecordCard key={item.id} item={item} collectionName={collectionName}/>):<p>{demo?'Sin registros: panel en modo demo.':'No hay registros.'}</p>}</div></div></AppShell>;
}
