import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react/jsx-dev-runtime';

interface Props {
    children: JSX.Element;
    adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
    const { token, role } = useAuth();

    // אם אין טוקן בכלל - שלח אותו להתחברות
    if (!token) return <Navigate to="/" />;

    // אם הדף הוא לאדמין בלבד והמשתמש הוא לא אדמין - שלח אותו לדאשבורד
    if (adminOnly && role !== 'admin') return <Navigate to="/dashboard" />;

    return children;
};