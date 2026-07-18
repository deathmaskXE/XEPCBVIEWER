import {Navigate} from 'react-router-dom';import {useAuth} from '../contexts/AuthContext';import ProtectedRoute from './ProtectedRoute';
export default function AdminRoute({children}){const {user}=useAuth();return <ProtectedRoute>{user?.role==='admin'&&user?.status==='approved'?children:<Navigate to="/access-denied" replace/>}</ProtectedRoute>}
