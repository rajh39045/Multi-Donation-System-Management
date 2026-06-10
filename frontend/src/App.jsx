import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './components/layout/PublicLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy Load Pages
const Landing = lazy(() => import('./pages/public/Landing'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Donor Pages
const DonorDashboard = lazy(() => import('./pages/donor/Dashboard'));
const NewDonation = lazy(() => import('./pages/donor/NewDonation'));
const MyDonations = lazy(() => import('./pages/donor/MyDonations'));
const Rewards = lazy(() => import('./pages/donor/Rewards'));

// Org Pages
const OrgDashboard = lazy(() => import('./pages/org/Dashboard'));
const ManageDonations = lazy(() => import('./pages/org/ManageDonations'));
const OrgProfile = lazy(() => import('./pages/org/OrgProfile'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const CreateOrg = lazy(() => import('./pages/admin/CreateOrg'));
const AllDonations = lazy(() => import('./pages/admin/AllDonations'));

// Volunteer Pages
const VolunteerDashboard = lazy(() => import('./pages/volunteer/Dashboard'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-bg">
            <LoadingSpinner />
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Donor Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['donor']} />}>
              <Route path="/donor/dashboard" element={<DonorDashboard />} />
              <Route path="/donor/donate" element={<NewDonation />} />
              <Route path="/donor/my-donations" element={<MyDonations />} />
              <Route path="/donor/rewards" element={<Rewards />} />
            </Route>

            {/* Organization Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['organization']} />}>
              <Route path="/org/dashboard" element={<OrgDashboard />} />
              <Route path="/org/donations" element={<ManageDonations />} />
              <Route path="/org/profile" element={<OrgProfile />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create-org" element={<CreateOrg />} />
              <Route path="/admin/donations" element={<AllDonations />} />
            </Route>

            {/* Volunteer Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['volunteer']} />}>
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
            </Route>

            {/* 404 Route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
