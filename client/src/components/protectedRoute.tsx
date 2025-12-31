import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to="/" />;

    if (adminOnly && role !== 'admin') return <Navigate to="/dashboard" />;

    return children;
};