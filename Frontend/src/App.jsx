import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentPortal  from './pages/StudentPortal';
import ComplaintsPage from './pages/ComplaintsPage';
import PaymentPage    from './pages/PaymentPage';
import QRPage         from './pages/QRPage';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/"         element={<Navigate to="/login" />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={
          <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
        }/>
        <Route path="/admin/complaints" element={
          <ProtectedRoute role="admin"><ComplaintsPage /></ProtectedRoute>
        }/>
        <Route path="/admin/payments" element={
          <ProtectedRoute role="admin"><PaymentPage /></ProtectedRoute>
        }/>

        <Route path="/student" element={
          <ProtectedRoute role="student"><StudentPortal /></ProtectedRoute>
        }/>
        <Route path="/student/complaints" element={
          <ProtectedRoute role="student"><ComplaintsPage /></ProtectedRoute>
        }/>
        <Route path="/student/payments" element={
          <ProtectedRoute role="student"><PaymentPage /></ProtectedRoute>
        }/>
        <Route path="/student/qr" element={
          <ProtectedRoute role="student"><QRPage /></ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;