import { Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar/Navbar';
import ProtectedRoute from './src/components/ProtectedRoute';
import Login from './pages/Login/Login';
import Explore from './pages/Explore/Explore';
import CountryDetail from './pages/CountryDetails/CountryDetail';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        } />
        <Route path="/country/:code" element={
          <ProtectedRoute>
            <CountryDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;