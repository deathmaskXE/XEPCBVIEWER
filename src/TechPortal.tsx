import {libraryFileUrl} from './library-url';
import React,{useEffect,useMemo,useState} from 'react';
import {initializeApp,getApps} from 'firebase/app';
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,User} from 'firebase/auth';
import {getFirestore,doc,getDoc,collection,onSnapshot,setDoc,serverTimestamp,Timestamp,query,where,updateDoc} from 'firebase/firestore';

import {IntegratedViewer} from './IntegratedViewer';
import {AppErrorBoundary} from './components/bench/AppErrorBoundary';
import {ShieldCheck,Layers,LogOut,FolderOpen,ExternalLink,Users,CalendarClock,Search,RefreshCw,Gamepad2,Gamepad,Smartphone,Cpu} from 'lucide-react';
import './tech-portal.css';
const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
const ready=Boolean(config.apiKey&&config.projectId);
const app=ready?(getApps()[0]||initializeApp(config)):null;
const auth=app?getAuth(app):null;
const db=app?getFirestore(app):null;
const paymentWhatsApp='527471731852';
const suggestedCountry=()=>{try{const region=new Intl.Locale(navigator.language).region;return region==='MX'?'MX':region?'INT':'MX';}catch{return 'MX';}};
const LICENSE_PRICES={MX:{6:{amount:350,currency:'MXN'},12:{amount:650,currency:'MXN'}},INT:{6:{amount:25,currency:'USD'},12:{amount:40,currency:'USD'}}} as const;

const BINANCE_PAY_ID='1287379101';
type Profile={role?:string;status?:string;expiresAt?:unknown;activeUntil?:unknown;trialStartedAt?:unknown;trialApproved?:boolean;trialApprovedAt?:unknown;email?:string;displayName?:string;phone?:string};
type Item={id:string;title:string;category:string;url:string;description?:string;brand?:string;model?:string;kind?:string;thumbnail?:string};
type Affiliate={id:string;title:string;url:string;imageUrl?:string;category?:string;createdAt?:unknown};
type Payment={id:string;uid:string;email:string;country:string;method:'spei'|'paypal'|'revolut'|'binance';reference:string;amount:string;status:'pending'|'approved'|'rejected';planMonths?:number;currency?:string;proofPath?:string;createdAt?:unknown;reviewedAt?:unknown;reviewNote?:string};
type Account={id:string;email?:string;displayName?:string;status?:string;role?:string;expiresAt?:unknown;trialStartedAt?:unknown;trialApproved?:boolean;trialApprovedAt?:unknown;phone?:string;planMonths?:number;activatedAt?:unknown;updatedAt?:unknown;};

const PAYMENT_BANK_NAME='Revolut Bank, S.A., Institución de Banca Múltiple';
const PAYMENT_BANK_ADDRESS='Calle Varsovia 36, Piso 6, Oficina 603-W, Colonia Juárez, Alcaldía Cuauhtémoc, C.P. 06600, Ciudad de México, México';
function PaymentField({label,value}:{label:string;value:string}){return <div className="xe-pay-field"><span>{label}</span><strong>{value}</strong><button type="button" onClick={()=>navigator.clipboard.writeText(value).catch(()=>window.prompt('Copia el dato:',value))} aria-label={`Copiar ${label}`}>Copiar</button></div>}
type PaymentMethod = 'spei'|'paypal'|'revolut'|'binance';
function PaymentMethodPicker({country,value,onChange}:{country:string;value:PaymentMethod;onChange:(v:PaymentMethod)=>void}){
 const methods:PaymentMethod[]=country==='MX'?['spei','revolut','binance']:['paypal','revolut','binance'];
 return <fieldset className="xe-payment-picker"><legend>Selecciona tu medio de pago</legend><div className="xe-payment-icons">{methods.map(m=><button key={m} type="button" className={`xe-payment-icon xe-pay-${m} ${value===m?'is-selected':''}`} aria-pressed={value===m} onClick={()=>onChange(m)}><span className="xe-pay-symbol" aria-hidden="true">{m==='spei'?<span className="xe-spei-logo">SPEI</span>:m==='paypal'?<span className="xe-paypal-logo">P<span>P</span></span>:m==='revolut'?<span className="xe-revolut-logo">R</span>:<span className="xe-binance-logo">◆</span>}</span><strong>{m==='spei'?'SPEI':m==='paypal'?'PayPal':m==='revolut'?'Revolut':'Binance Pay'}</strong></button>)}</div></fieldset>;
}
function PaymentInstructions({country,method,price,months}:{country:string;method:'spei'|'paypal'|'revolut'|'binance';price:number;months:number}){
 const national=country==='MX';
 if(method==='binance')return <section className="xe-payment-details"><h3>Binance Pay · Pago sujeto a verificación</h3><p>Suscripción de {months} meses: {price} {national?'MXN':'USD'}. Comprueba el importe y la divisa que Binance te permita enviar; no envíes una cantidad distinta sin confirmación.</p><PaymentField label="Binance Pay ID" value={BINANCE_PAY_ID}/><p>En Binance entra a Pay → Enviar, utiliza el identificador y guarda el ID de la operación. El pago no activa automáticamente tu licencia.</p></section>;
 if(method==='paypal')return <section className="xe-payment-details"><h3>PayPal · Pago internacional</h3><p>Suscripción de {months} meses: {price} USD. Comprueba la moneda y el importe antes de enviar.</p><a href="https://paypal.me/XboxElEscondite" target="_blank" rel="noopener noreferrer">Abrir PayPal de XE Servicio Electrónico ↗</a><p>Después de pagar, registra el ID de la transacción y envía tu comprobante.</p></section>;
 if(method==='spei')return <section className="xe-payment-details"><h3>Transferencia SPEI · México</h3><p>Suscripción de {months} meses: {price} MXN. Puedes transferir a cualquiera de estas cuentas.</p><PaymentField label="Mercado Pago · CLABE" value="722969020089368829"/><PaymentField label="Banorte · CLABE" value="072580010893628522"/><PaymentField label="Banorte · Tarjeta" value="4189140010217767"/><PaymentField label="BanCoppel · Tarjeta" value="4169160630158435"/><p>Verifica el beneficiario que te muestre tu banco antes de confirmar.</p></section>;
 return <section className="xe-payment-details"><h3>Revolut · {national?'Transferencia nacional':'Transferencia internacional'}</h3><p>Beneficiario: <strong>Irving Daniel Sanchez Nava</strong></p>{national?<PaymentField label="CLABE Revolut (MXN)" value="170180010760547520"/>:<><PaymentField label="Número de cuenta internacional" value="170002404039181725"/><PaymentField label="BIC / SWIFT" value="REVOMXM2"/><p>El precio del plan es {price} USD. Estos datos corresponden a una cuenta en MXN; verifica con Revolut las divisas admitidas, la conversión y las comisiones antes de transferir.</p></>}<p><strong>Banco:</strong> {PAYMENT_BANK_NAME}</p><p><strong>Dirección:</strong> {PAYMENT_BANK_ADDRESS}</p></section>;
}
function dateOf(v:unknown):Date|null {if(!v)return null;if(typeof v==='object'&&v!==null&&'toDate' in v&&typeof v.toDate==='function')return v.toDate();const d=new Date(v as string);return Number.isNaN(d.getTime())?null:d;}
function addCalendarMonths(base:Date,months:number){const d=new Date(base);const day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+months);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return d;}
function dateLabel(v:unknown){return dateOf(v)?.toLocaleDateString('es-MX')||'Sin vencimiento';}
function errMessage(e:unknown){return e instanceof Error?e.message:'Error desconocido';}
export function TechPortal(){
 const [user,setUser]=useState<User|null>(null),[profile,setProfile]=useState<Profile|null>(null),[loading,setLoading]=useState(true),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[tab,setTab]=useState<'viewer'|'library'|'users'|'payments'|'store'>('library');
 const [folderItems,setFolderItems]=useState<Item[]>([]),[brandFilter,setBrandFilter]=useState(''),[modelFilter,setModelFilter]=useState(''),[kindFilter,setKindFilter]=useState('BoardViews'),[accounts,setAccounts]=useState<Account[]>([]),[search,setSearch]=useState(''),[categoryFilter,setCategoryFilter]=useState('Consolas');
 const [register,setRegister]=useState(false),[registerName,setRegisterName]=useState(''),[country,setCountry]=useState(suggestedCountry),[method,setMethod]=useState<'spei'|'paypal'|'revolut'|'binance'>(()=>suggestedCountry()==='MX'?'spei':'paypal'),[reference,setReference]=useState(''),[amount,setAmount]=useState(''),[proof,setProof]=useState<File|null>(null),[payments,setPayments]=useState<Payment[]>([]),[reviewNotes,setReviewNotes]=useState<Record<string,string>>({}),[notice,setNotice]=useState('');
 const [now,setNow]=useState(Date.now());
 const [accountSearch,setAccountSearch]=useState('');
 const [editAccount,setEditAccount]=useState<Account|null>(null);
 const [editName,setEditName]=useState(''),[editPhone,setEditPhone]=useState(''),[editEmail,setEditEmail]=useState('');
 const [affiliates,setAffiliates]=useState<Affiliate[]>([]);
 const [affiliateUrl,setAffiliateUrl]=useState(''),[affiliateTitle,setAffiliateTitle]=useState(''),[affiliateImage,setAffiliateImage]=useState(''),[affiliateCategory,setAffiliateCategory]=useState('Herramientas');
 const [registerPhone,setRegisterPhone]=useState('');
 const [planMonths,setPlanMonths]=useState<6|12>(12);
 const [showPlans,setShowPlans]=useState(false);
 const licensePrice=LICENSE_PRICES[country==='MX'?'MX':'INT'][planMonths];
 useEffect(()=>{const timer=window.setInterval(()=>setNow(Date.now()),1000);return ()=>window.clearInterval(timer);},[]);
 const [viewerInitialId,setViewerInitialId]=useState<string|null>(null);
 const [accountUid,setAccountUid]=useState(''),[accountEmail,setAccountEmail]=useState(''),[days,setDays]=useState('12'),[busy,setBusy]=useState(false);
 const [profileMissing,setProfileMissing]=useState(false);
 const [profileFailure,setProfileFailure]=useState(false);
 const [retryProfile,setRetryProfile]=useState(0);
 // Mantener el acceso durante la confirmación de la marca de tiempo de Firestore.

 useEffect(()=>{
  if(!auth||!db){setLoading(false);return;}
  let unsubscribeProfile:(()=>void)|undefined;
  let cancelled=false;
  const unsubscribeAuth=onAuthStateChanged(auth,async u=>{
   unsubscribeProfile?.();unsubscribeProfile=undefined;
   setLoading(true);setUser(u);if(u){setShowPlans(false);setRegister(false);}setProfile(null);setProfileMissing(false);setProfileFailure(false);setError('');
   if(!u){setLoading(false);return;}
   // La consulta del perfil técnico no debe depender de una consulta previa a /users:
   // esa consulta podía fallar por conectividad y bloquear incluso las pruebas nuevas.
   unsubscribeProfile=onSnapshot(doc(db!,'techUsers',u.uid),{includeMetadataChanges:true},snap=>{
    if(cancelled)return;
    if(snap.metadata.fromCache && !snap.exists()){
     setProfileFailure(true);setProfileMissing(false);
     setError('No se pudo verificar el perfil en el servidor. Comprueba tu conexión e inténtalo de nuevo.');
    }else{
     setProfile(snap.exists()?snap.data() as Profile:null);
     setProfileMissing(!snap.exists());setProfileFailure(false);setError('');
    }
    setLoading(false);
   },e=>{if(cancelled)return;setProfileFailure(true);setProfileMissing(false);setError('No se pudo comprobar tu perfil: '+errMessage(e));setLoading(false);});
   // Compatibilidad con cuentas administradoras anteriores.
   try{
    const legacy=await getDoc(doc(db!,'users',u.uid));
    const old=legacy.exists()?legacy.data() as Profile:null;
    if(!cancelled && old?.role==='admin' && old.status==='approved'){
     unsubscribeProfile?.();unsubscribeProfile=undefined;
     setProfile(old);setProfileMissing(false);setProfileFailure(false);setError('');setLoading(false);
    }
   }catch{/* No bloquear la prueba por un error en el perfil de administrador heredado. */}
  });
  return ()=>{cancelled=true;unsubscribeAuth();unsubscribeProfile?.();};
 },[retryProfile]);
 const admin=profile?.role==='admin'&&(profile?.status==='approved'||profile?.status==='active');
 const expires=dateOf(profile?.expiresAt??profile?.activeUntil);
 const allowed=admin||(profile?.status==='active'&&!!expires&&expires.getTime()>now);
 useEffect(()=>{if(!db||!user)return;const q=admin?collection(db,'techPayments'):query(collection(db,'techPayments'),where('uid','==',user.uid));return onSnapshot(q,s=>setPayments(s.docs.map(d=>({id:d.id,...d.data()} as Payment))),e=>setError('Solicitudes: '+e.message));},[user,admin]);
 useEffect(()=>{if(!db||!user||!admin)return;return onSnapshot(collection(db,'techUsers'),s=>setAccounts(s.docs.map(d=>({id:d.id,...d.data()} as Account))),e=>setError('No se pudo consultar las licencias: '+e.message));},[user,admin]);
 // El índice público contiene SOLO metadatos y miniaturas, nunca URLs de archivos privados.
 useEffect(()=>{const controller=new AbortController();fetch(`${import.meta.env.BASE_URL}catalogo-publico.json`,{signal:controller.signal}).then(r=>r.ok?r.json():[]).then(data=>setFolderItems(Array.isArray(data)?data.filter((x:Item)=>x&&x.id&&x.title&&x.category).map((x:Item)=>({...x,url:''})):[])).catch(()=>setFolderItems([]));return ()=>controller.abort();},[]);
 useEffect(()=>{if(!db)return;return onSnapshot(collection(db,'xeAffiliateProducts'),snap=>setAffiliates(snap.docs.map(d=>({id:d.id,...d.data()} as Affiliate))),()=>setAffiliates([]));},[]);
 const [privateItems,setPrivateItems]=useState<Item[]>([]);
 useEffect(()=>{if(!allowed){setPrivateItems([]);return;}const controller=new AbortController();fetch(`${import.meta.env.BASE_URL}biblioteca/index.json`,{signal:controller.signal}).then(r=>r.ok?r.json():[]).then(data=>setPrivateItems(Array.isArray(data)?data.map((x:Item)=>({...x,url:libraryFileUrl(x.url)})):[])).catch(()=>setPrivateItems([]));return ()=>controller.abort();},[allowed]);
 const items=folderItems;
 useEffect(()=>{if(!items.length)return;const first=items.find(x=>x.category==='Consolas'&&x.kind==='BoardViews')||items.find(x=>x.category==='Controles'&&x.kind==='BoardViews');if(first){setCategoryFilter(first.category);setBrandFilter(first.brand||'');setModelFilter(first.model||'');setKindFilter('BoardViews');}},[folderItems]);
 const availableBrands=useMemo(()=>Array.from(new Set(items.filter(x=>x.category===categoryFilter).map(x=>x.brand).filter((x):x is string=>Boolean(x)))).sort((a,b)=>a.localeCompare(b,'es')),[items,categoryFilter]);
 const availableModels=useMemo(()=>Array.from(new Set(items.filter(x=>x.category===categoryFilter&&x.brand===brandFilter).map(x=>x.model).filter(Boolean))) as string[],[items,categoryFilter,brandFilter]);
 const availableKinds=useMemo(()=>Array.from(new Set(items.filter(x=>x.category===categoryFilter&&(!brandFilter||x.brand===brandFilter)&&(!modelFilter||x.model===modelFilter)).map(x=>x.kind).filter(Boolean))) as string[],[items,categoryFilter,brandFilter,modelFilter]);
 const accountMatches=(a:Account)=>`${a.email||''} ${a.displayName||''} ${a.phone||''} ${a.id}`.toLocaleLowerCase().includes(accountSearch.trim().toLocaleLowerCase());
 const filtered=useMemo(()=>items.filter(x=>(x.category===categoryFilter)&&(!brandFilter||x.brand===brandFilter)&&(!modelFilter||x.model===modelFilter)&&(kindFilter==='BoardViews'?x.kind==='BoardViews':!kindFilter||x.kind===kindFilter)&&`${x.title} ${x.category} ${x.brand||''} ${x.model||''} ${x.description||''}`.toLowerCase().includes(search.toLowerCase())),[items,search,categoryFilter,brandFilter,modelFilter,kindFilter]);
 async function login(e:React.FormEvent){e.preventDefault();setError('');try{await signInWithEmailAndPassword(auth!,email,password);}catch{setError('No se pudo iniciar sesión. Comprueba tus credenciales.');}}
 // El marcador local solo permite reintentar un alta iniciada en ESTE navegador.
 // Nunca reactivamos automáticamente cuentas antiguas sin historial verificable.
 const registrationKey=(uid:string)=>`xepcb-registration-pending:${uid}`;
 async function finishRegistration(u:User, fallback?:{name:string;phone:string;country:string}){
  if(!db)throw Error('Firestore no está configurado');
  const key=registrationKey(u.uid);
  const saved=window.sessionStorage.getItem(key);
  if(!saved)throw Error('No hay un registro nuevo pendiente en este navegador. Solicita revisión al administrador.');
  const data=fallback||JSON.parse(saved) as {name:string;phone:string;country:string};
  const ref=doc(db,'techUsers',u.uid);
  const existing=await getDoc(ref);
  if(existing.exists()){
   // No alterar licencias pagadas ni pruebas usadas.
   window.sessionStorage.removeItem(key);
   return;
  }
  await setDoc(ref,{
   email:u.email||'',displayName:data.name,
   ...(data.phone?{phone:data.phone}:{}),country:data.country,
   role:'client',status:'pending',createdAt:serverTimestamp()
  });
  // Confirmar la escritura contra Firestore antes de anunciar éxito.
  const confirmed=await getDoc(ref);
  if(!confirmed.exists())throw Error('El servidor todavía no confirmó el perfil. Reintenta.');
  window.sessionStorage.removeItem(key);
 }
 async function signup(e:React.FormEvent){
  e.preventDefault();if(!auth||!db)return;
  setBusy(true);setError('');
  try{
   const result=await createUserWithEmailAndPassword(auth,email,password);
   const data={name:registerName.trim(),phone:registerPhone.trim(),country};
   window.sessionStorage.setItem(registrationKey(result.user.uid),JSON.stringify(data));
   await finishRegistration(result.user,data);
   setNotice('Registro confirmado. Selecciona tu membresía y registra el pago.');setRegister(false);setShowPlans(false);setTab('library');setPassword('');
  }catch(e){
   setError('El registro no terminó correctamente: '+errMessage(e)+'. Si ya existe tu cuenta, inicia sesión y usa REINTENTAR REGISTRO. No vuelvas a crear otra cuenta.');setShowPlans(false);
  }finally{setBusy(false);}
 }
 async function recoverMissingProfile(){
  if(!user||!db||!profileMissing)return;
  setBusy(true);setError('');
  try{
   await finishRegistration(user);
   setNotice('Perfil confirmado. Ya puedes solicitar una membresía.');
   setRetryProfile(n=>n+1);
  }catch(e){setError('No fue posible recuperar el perfil: '+errMessage(e));}
  finally{setBusy(false);}
 }
 async function openViewer(fileId?:string){
  if(!user||!allowed){setViewerInitialId(null);setShowPlans(true);return;}
  if(fileId)setViewerInitialId(fileId);setTab('viewer');
 }
 async function addAffiliate(e:React.FormEvent){e.preventDefault();if(!db||!admin)return;const url=affiliateUrl.trim();
  if(!/^https:\/\/(?:[a-z0-9-]+\.)*(?:aliexpress\.com|aliexpress\.us)\//i.test(url)){setError('Pega un enlace HTTPS de AliExpress válido.');return;}
  if(!affiliateTitle.trim()){setError('Escribe el nombre del producto.');return;}
  if(affiliateImage.trim()&&!/^https:\/\//i.test(affiliateImage.trim())){setError('La imagen debe ser una URL HTTPS.');return;}
  setBusy(true);try{await setDoc(doc(collection(db,'xeAffiliateProducts')),{title:affiliateTitle.trim(),url,imageUrl:affiliateImage.trim(),category:affiliateCategory.trim(),createdAt:serverTimestamp()});setAffiliateTitle('');setAffiliateUrl('');setAffiliateImage('');setNotice('Producto publicado.');}catch(e){setError(errMessage(e));}finally{setBusy(false);}
 }
 async function submitPayment(e:React.FormEvent){
  e.preventDefault();if(!user||!db)return;
  if(country==='MX'&&method!=='spei'&&method!=='revolut'&&method!=='binance'){setError('Selecciona SPEI, Revolut o Binance Pay.');return;}
  if(country!=='MX'&&method==='spei'){setError('Selecciona PayPal, Revolut o Binance Pay.');return;}
  if(!reference.trim()){setError('Falta referencia de pago.');return;}
  // Abrir la pestaña durante el gesto del usuario evita bloqueos de ventanas emergentes.
  const whatsappTab=window.open('about:blank','_blank');
  setBusy(true);setError('');
  try{
   const paymentRef=doc(collection(db,'techPayments'));
   await setDoc(paymentRef,{uid:user.uid,email:user.email||'',country,method,reference:reference.trim(),amount:String(licensePrice.amount),currency:licensePrice.currency,planMonths,status:'pending',createdAt:serverTimestamp()});
   const message=`XEPCB VIEWER - COMPROBANTE DE PAGO\n\nSolicitud: ${paymentRef.id}\nUsuario: ${user.email||''}\nPaís: ${country==='MX'?'México':'Internacional'}\nMétodo: ${method.toUpperCase()}\nSuscripción: ${planMonths} meses\nImporte de licencia: ${licensePrice.amount} ${licensePrice.currency}\nReferencia de pago: ${reference.trim()}\n\nAdjunto mi comprobante para solicitar la activación de mi suscripción de ${planMonths} meses.\n\nAVISO: Este WhatsApp es EXCLUSIVAMENTE para recibir comprobantes. NO SE BRINDA ATENCIÓN AL CLIENTE NI SOPORTE TÉCNICO POR ESTE MEDIO. La licencia solo se activa tras verificar el pago y aprobarlo el administrador.`;
   const target=`https://wa.me/${paymentWhatsApp}?text=${encodeURIComponent(message)}`;
   if(whatsappTab){whatsappTab.location.href=target;}else{window.location.href=target;}
   setNotice('Solicitud registrada. Adjunta tu comprobante manualmente en WhatsApp y envíalo. Abrir WhatsApp NO confirma que el mensaje se haya enviado ni que el pago esté verificado.');
  }catch(e){whatsappTab?.close();setError('No se pudo registrar la solicitud: '+errMessage(e));}
  finally{setBusy(false);}
 }
 async function review(payment:Payment,decision:'approved'|'rejected'){if(!db||!admin||!user)return;if(payment.status!=='pending')return;if(!window.confirm(decision==='approved'?'¿Confirmas el ingreso real y deseas activar el plan solicitado?':'¿Rechazar esta solicitud?'))return;setBusy(true);setError('');try{const paymentRef=doc(db,'techPayments',payment.id);if(decision==='approved'){const accountRef=doc(db,'techUsers',payment.uid);const current=await getDoc(accountRef);const base=dateOf(current.data()?.expiresAt);const start=base&&base.getTime()>Date.now()?base:new Date();const months=payment.planMonths===6?6:12;const end=addCalendarMonths(start,months);await setDoc(accountRef,{email:payment.email,role:'client',status:'active',planMonths:months,activatedAt:serverTimestamp(),expiresAt:Timestamp.fromDate(end),updatedAt:serverTimestamp()},{merge:true});}await updateDoc(paymentRef,{status:decision,reviewNote:reviewNotes[payment.id]||'',reviewedAt:serverTimestamp(),reviewedBy:user.uid});setNotice(decision==='approved'?'Suscripción activada según el plan aprobado.':'Solicitud rechazada.');}catch(e){setError('Revisión: '+errMessage(e));}finally{setBusy(false);}}
 async function license(e:React.FormEvent){e.preventDefault();if(!db||!admin)return;const uid=accountUid.trim();const months=Number(days);if(!uid||![6,12].includes(months)){setError('Selecciona una membresía de 6 o 12 meses y un UID válido.');return;}setBusy(true);setError('');try{const ref=doc(db,'techUsers',uid);const existing=await getDoc(ref);if(uid===user?.uid)throw Error('El administrador no requiere licencia');const base=existing.exists()?dateOf(existing.data().expiresAt):null;const start=base&&base.getTime()>Date.now()?base:new Date();const end=addCalendarMonths(start,months);await setDoc(ref,{email:accountEmail.trim()||existing.data()?.email||'',role:'client',status:'active',planMonths:months,activatedAt:serverTimestamp(),expiresAt:Timestamp.fromDate(end),updatedAt:serverTimestamp()}, {merge:true});setAccountUid('');setAccountEmail('');}catch(e){setError('No se pudo activar la licencia: '+errMessage(e));}finally{setBusy(false);}}
 function selectAccountEdit(a:Account){setEditAccount(a);setEditName(a.displayName||'');setEditPhone(a.phone||'');setEditEmail(a.email||'');setError('');}
 async function saveAccountEdit(e:React.FormEvent){
  e.preventDefault();if(!db||!admin||!editAccount||!user)return;
  const name=editName.trim(),phone=editPhone.trim(),emailValue=editEmail.trim().toLowerCase();
  if(!emailValue||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)){setError('Indica un correo válido para el perfil.');return;}
  if(editAccount.email&&editAccount.email.toLowerCase()!==emailValue){setError('No se puede cambiar el correo de inicio de sesión desde este formulario: requiere actualizar Firebase Authentication mediante un backend administrativo.');return;}
  if(!window.confirm('¿Guardar los datos del perfil? Esto NO modifica Firebase Authentication ni la duración de la licencia.'))return;
  setBusy(true);setError('');
  try{await updateDoc(doc(db,'techUsers',editAccount.id),{displayName:name,phone,email:emailValue,updatedAt:serverTimestamp(),updatedBy:user.uid});setNotice('Perfil actualizado en Firestore. Verifica que el correo coincida con Authentication.');setEditAccount(null);}
  catch(e){setError('No se pudo guardar el perfil: '+errMessage(e));}finally{setBusy(false);}
 }
 async function suspend(uid:string){if(!db||!admin||uid===user?.uid||!window.confirm('¿Suspender el acceso de este usuario?'))return;try{await setDoc(doc(db,'techUsers',uid),{status:'suspended',updatedAt:serverTimestamp()},{merge:true});}catch(e){setError(errMessage(e));}}
 const categoryNames=['Consolas','Controles','Celulares','Gráficas RTX y AMD'];
 const paymentForm=<form className="tech-payment-form" onSubmit={submitPayment}><div className="xe-plan-cards">{([6,12] as const).map(months=><button type="button" key={months} className={planMonths===months?'selected':''} onClick={()=>setPlanMonths(months)}><strong>{months} MESES</strong><b>{country==='MX'?(months===6?'$350 MXN':'$650 MXN'):(months===6?'$25 USD':'$40 USD')}</b></button>)}</div><label>País<select value={country} onChange={e=>{setCountry(e.target.value);setMethod(e.target.value==='MX'?'spei':'paypal');}}><option value="MX">México</option><option value="INT">Fuera de México</option></select></label><PaymentMethodPicker country={country} value={method} onChange={setMethod}/><PaymentInstructions country={country} method={method} price={licensePrice.amount} months={planMonths}/><label>Referencia de pago<input required value={reference} onChange={e=>setReference(e.target.value)}/></label><p>Envía el comprobante por WhatsApp. La membresía se activa después de comprobar el ingreso y aprobarla.</p><button className="tech-primary" disabled={busy}>REGISTRAR PAGO Y ABRIR WHATSAPP</button></form>;
 return <div className="tech-root"><header className="tech-bar"><div className="tech-brand"><Layers size={25}/><span>XE<b>PCB VIEWER</b></span><small>PROFESSIONAL ELECTRONICS DATABASE</small></div><nav className="tech-nav"><button onClick={()=>setTab('library')}>Biblioteca</button><button onClick={()=>setTab('store')}>XE TECH STORE</button><button onClick={()=>void openViewer()}>Visor {allowed?'':'🔒'}</button>{user&&admin&&<><button onClick={()=>setTab('users')}>Licencias</button><button onClick={()=>setTab('payments')}>Pagos ({payments.filter(p=>p.status==='pending').length})</button></>}{user?<button onClick={()=>void signOut(auth!)}><LogOut size={15}/> Salir</button>:<button onClick={()=>setShowPlans(true)}>Membresías / Ingresar</button>}</nav></header>
 {showPlans&&<div className="xe-plans-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowPlans(false)}}><section className="xe-plans-dialog" role="dialog" aria-modal="true" aria-label="Membresías XEPCB"><button type="button" className="xe-plans-close" onClick={()=>setShowPlans(false)}>×</button><h2>♛ XEPCB PREMIUM</h2><p>El catálogo es gratuito. Para abrir el visor necesitas una membresía activa.</p>{user?paymentForm:<><p>Regístrate solamente si deseas contratar una membresía.</p><button className="tech-primary" onClick={()=>{setRegister(true);setShowPlans(false);setTab('library')}}>REGISTRARME PARA PAGAR</button><button onClick={()=>{setRegister(false);setShowPlans(false);setTab('viewer')}}>Ya tengo cuenta</button></>}</section></div>}
 {tab==='store'?<main className="tech-content"><div className="tech-hero"><h1>XE TECH STORE</h1><p>Herramientas y componentes recomendados · Enlaces de afiliado AliExpress</p></div>{admin&&<form className="tech-admin-form" onSubmit={addAffiliate}><h3>Publicar producto</h3><label>Enlace de afiliado<input required value={affiliateUrl} onChange={e=>setAffiliateUrl(e.target.value)} placeholder="https://s.click.aliexpress.com/e/..."/></label><label>Nombre del producto<input required value={affiliateTitle} onChange={e=>setAffiliateTitle(e.target.value)}/></label><label>URL de imagen (opcional)<input value={affiliateImage} onChange={e=>setAffiliateImage(e.target.value)} placeholder="https://...jpg"/></label><label>Categoría<input value={affiliateCategory} onChange={e=>setAffiliateCategory(e.target.value)}/></label><p>Los enlaces cortos de AliExpress no garantizan acceso automático a fotos o títulos. Para importación automática fiable se requiere un servicio autorizado/API de afiliados.</p><button className="tech-primary" disabled={busy}>Publicar enlace</button></form>}<div className="tech-grid">{affiliates.map(a=><article className="tech-tile" key={a.id}>{a.imageUrl&&<img className="xe-card-thumbnail" src={a.imageUrl} alt={a.title} loading="lazy" referrerPolicy="no-referrer"/>}<span>{a.category}</span><h3>{a.title}</h3><a href={a.url} target="_blank" rel="sponsored noopener noreferrer">Comprar en AliExpress ↗</a></article>)}</div>{affiliates.length===0&&<p>Próximamente: productos seleccionados por XE Servicio Electrónico.</p>}<p className="tech-note">Enlaces de afiliado: podemos recibir una comisión por compras elegibles.</p></main>:
 !user&&(register||(!showPlans&&tab==='viewer'))?<main className="tech-center"><form className="tech-panel" onSubmit={register?signup:login}><ShieldCheck size={32}/><h1>{register?'REGISTRO PARA MEMBRESÍA':'INICIAR SESIÓN'}</h1>{register&&<><label>Nombre<input required value={registerName} onChange={e=>setRegisterName(e.target.value)}/></label><label>Celular<input value={registerPhone} onChange={e=>setRegisterPhone(e.target.value)}/></label></>}<label>Correo<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Contraseña<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="tech-primary" disabled={busy}>{register?'CREAR CUENTA':'ENTRAR'}</button><button type="button" onClick={()=>setRegister(!register)}>{register?'Ya tengo cuenta':'Crear cuenta para contratar'}</button><button type="button" onClick={()=>setTab('library')}>Volver al catálogo</button></form></main>:
 tab==='viewer'&&allowed?<main className="tech-viewer"><AppErrorBoundary><IntegratedViewer items={privateItems} initialId={viewerInitialId}/></AppErrorBoundary></main>:
 tab==='payments'&&admin?<main className="tech-content"><h1>Solicitudes de pago</h1><div className="tech-users">{payments.map(p=><article className="tech-tile" key={p.id}><h3>{p.email}</h3><p>{p.status} · {p.planMonths} meses · {p.amount} {p.currency}</p><p>Referencia: {p.reference} · UID: {p.uid}</p>{p.status==='pending'&&<><input placeholder="Nota" value={reviewNotes[p.id]||''} onChange={e=>setReviewNotes({...reviewNotes,[p.id]:e.target.value})}/><button onClick={()=>void review(p,'approved')}>Aprobar</button><button onClick={()=>void review(p,'rejected')}>Rechazar</button></>}</article>)}</div></main>:
 tab==='users'&&admin?<main className="tech-content"><h1>Usuarios y licencias</h1><form className="tech-admin-form" onSubmit={license}><label>UID<input value={accountUid} onChange={e=>setAccountUid(e.target.value)} required/></label><label>Correo<input value={accountEmail} onChange={e=>setAccountEmail(e.target.value)}/></label><label>Plan<select value={days} onChange={e=>setDays(e.target.value)}><option value="6">6 meses</option><option value="12">12 meses</option></select></label><button className="tech-primary">Activar o renovar</button></form><input placeholder="Buscar nombre, correo o UID" value={accountSearch} onChange={e=>setAccountSearch(e.target.value)}/>{editAccount&&<form className="tech-admin-form" onSubmit={saveAccountEdit}><h3>Editar {editAccount.email}</h3><label>Nombre<input value={editName} onChange={e=>setEditName(e.target.value)}/></label><label>Teléfono<input value={editPhone} onChange={e=>setEditPhone(e.target.value)}/></label><label>Correo<input value={editEmail} onChange={e=>setEditEmail(e.target.value)}/></label><button>Guardar</button><button type="button" onClick={()=>setEditAccount(null)}>Cancelar</button></form>}{accounts.filter(a=>a.role!=='admin'&&accountMatches(a)).map(a=><div className="tech-user" key={a.id}><div><strong>{a.displayName||a.email}</strong><small>{a.id} · {a.status} · Vence {dateLabel(a.expiresAt)}</small></div><button onClick={()=>{setAccountUid(a.id);setAccountEmail(a.email||'')}}>Renovar</button><button onClick={()=>selectAccountEdit(a)}>Editar</button><button onClick={()=>void suspend(a.id)}>Suspender</button></div>)}</main>:
 <main className="tech-content"><div className="tech-hero"><div className="tech-hero-eyebrow">LABORATORIO DIGITAL · ELECTRÓNICA PROFESIONAL</div><h1 className="tech-metal-title">XEPCB <span>VIEWER</span></h1><p>Catálogo público · Visor exclusivo para miembros</p></div><div className="tech-search-wrap"><Search size={18}/><input className="tech-search" placeholder="Buscar marca, modelo o archivo" value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="tech-category-grid">{categoryNames.map(c=><button key={c} className={categoryFilter===c?'active':''} onClick={()=>{setCategoryFilter(c);setBrandFilter('');setModelFilter('');}}>{c}</button>)}</div><div className="tech-folder-filters"><strong>Marca</strong><div className="tech-filter-buttons">{availableBrands.map(b=><button key={b} onClick={()=>{setBrandFilter(b===brandFilter?'':b);setModelFilter('')}}>{b}</button>)}</div></div><div className="tech-library-actions"><strong>Biblioteca técnica</strong><button className="tech-primary" onClick={()=>void openViewer()}><FolderOpen size={17}/> Abrir visor {allowed?'':'🔒'}</button></div><div className="tech-grid">{filtered.map(x=><article className="tech-tile" key={x.id}>{x.thumbnail&&<img className="xe-card-thumbnail" src={libraryFileUrl(x.thumbnail)} alt={x.title} loading="lazy"/>}<span>{x.category} · {x.kind}</span><h3>{x.title}</h3><p>{[x.brand,x.model].filter(Boolean).join(' · ')}</p><button onClick={()=>void openViewer(x.id)}><ExternalLink size={15}/> {allowed?'Abrir visor':'🔒 Requiere membresía'}</button></article>)}</div>{filtered.length===0&&<p>No hay miniaturas publicadas en esta categoría. El administrador debe cargar el catálogo público.</p>}{user&&!allowed&&<section className="tech-panel"><h2>Contratar membresía</h2>{profileMissing&&<button onClick={()=>void recoverMissingProfile()}>Completar registro pendiente</button>}{paymentForm}<h3>Mis solicitudes</h3>{payments.map(p=><p key={p.id}>{p.reference} · {p.status}</p>)}</section>}{!user&&<button className="tech-primary" onClick={()=>setShowPlans(true)}>Consultar membresías</button>}</main>}{notice&&<p role="status" className="tech-notice">{notice}</p>}{error&&<p role="alert" className="tech-error tech-toast">{error}</p>}</div>;
}
