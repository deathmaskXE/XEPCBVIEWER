import {HashRouter} from 'react-router-dom';import {LicenseProvider} from './contexts/LicenseContext';import AppRoutes from './routes/AppRoutes';
export default function App(){return <HashRouter><LicenseProvider><AppRoutes/></LicenseProvider></HashRouter>}
