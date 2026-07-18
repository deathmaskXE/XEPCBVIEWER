import {Navigate,useLocation} from 'react-router-dom';import {useAuth} from '../contexts/AuthContext';
export default function ProtectedRoute({children}){const {user,loading}=useAuth(),location=useLocation();if(loading)return <div className="statusPage"><p>Cargando acceso seguro…</p></div>;return user?children:<Navigate to="/login" state={{from:location}} replace/>}
