

// ProtectedLayout.jsx
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
    return (
        <div className="sidebar-and-content">
            <Sidebar />
            <Outlet /> {/* Aici se va încărca ruta copil (patients, patient/:id etc.) */}
        </div>
    );
};

export default ProtectedLayout;