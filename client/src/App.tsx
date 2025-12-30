import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import AdminHistoryPage from './pages/AdminHistory';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* דף כניסה */}
          <Route path="/" element={<Auth />} />
          
          {/* נתיבים מוגנים למשתמשים רשומים */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          
          {/* נתיב מוגן לאדמין בלבד */}
          <Route path="/adminHistory" element={<ProtectedRoute adminOnly><AdminHistoryPage /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;