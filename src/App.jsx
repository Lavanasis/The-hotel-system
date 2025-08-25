import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Account from './pages/Account.jsx';
import Bookings from './pages/Bookings.jsx';
import Cabins from './pages/Cabins.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Setting from './pages/Setting.jsx';
import DetailBooking from './pages/DetailBooking.jsx';
import { Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.jsx';
import AppLayout from './ui/AppLayout.jsx';
import { Toaster } from 'react-hot-toast';
import CheckIn from './pages/CheckIn.jsx';
import ProtectedRoute from './features/authentication/ProtectedRoute.jsx';
import Register from './pages/Register.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
export default function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Navigate replace to="/dashboard" />} />
          {/* 自动重定向到 /dashboard */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:documentId" element={<DetailBooking />} />
            <Route path="/checkin/:documentId" element={<CheckIn />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
          <Route path="*" element={<div>页面不存在</div>} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} //多个toast的间距
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </DarkModeProvider>
  );
}
