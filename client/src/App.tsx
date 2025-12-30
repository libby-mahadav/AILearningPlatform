import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage'; // הייבוא של הדף המאוחד
import AdminHistoryPage from './pages/AdminHistory';

function App() {
  return (
    <Router>
      <Routes>
        {/* דף הכניסה */}
        <Route path='/' element={<Auth />} />
        
        {/* דף בחירת הקטגוריות והצ'אט */}
        <Route path='/dashboard' element={<Dashboard />} />
        
        {/* דף היסטוריית הלמידה החדש */}
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/adminHistory' element={<AdminHistoryPage />} />
      

  
      
        {/* ניתוב מחדש לכל נתיב לא מוכר */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;