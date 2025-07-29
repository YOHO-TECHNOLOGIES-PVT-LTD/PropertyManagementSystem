import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataContext';
import { NotificationProvider } from '../components/notifications/NotificationService';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginForm from '../components/auth/LoginForm';
import Layout from '../layouts';
import Dashboard from '../pages/Dashboards/Dashboards';
import Properties from '../pages/properties/properties';
import Tenants from '../pages/Tenant/Tenant';
import RentManagement from '../pages/Rentmanagements/Rentmanagement';
import LeaseManagement from '../pages/leasemanagements/leasemanagements'
import Maintenance from '../pages/maintainances/Maintainance';
import Reports from '../pages/Report/report';
import Notifications from '../pages/notification/notifications';
import Settings from '../pages/settings/settings';

function AppRoutes() {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="tenants" element={<Tenants />} />
              <Route path="rent" element={<RentManagement />} />
              <Route path="lease" element={<LeaseManagement />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default AppRoutes;