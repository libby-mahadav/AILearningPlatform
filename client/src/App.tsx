import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import AdminHistory from './pages/AdminHistory';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* דף כניסה */}
          <Route path="/" element={<Auth />} />
          
          {/* נתיבים מוגנים למשתמשים רשומים */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          
          {/* נתיב מוגן לאדמין בלבד */}
          <Route path="/adminHistory" element={<ProtectedRoute adminOnly><AdminHistory /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;