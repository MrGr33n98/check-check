import { createBrowserRouter, redirect } from 'react-router-dom';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { LeadList } from '@/admin/leads/LeadList';
import { MemberList } from '@/admin/members/MemberList';
import { SponsoredList } from '@/admin/sponsored/SponsoredList';
import { AccessList } from '@/admin/access/AccessList';

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

// Protected loader that redirects to login if not authenticated
const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect('/login');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <LeadList /> },
      { path: 'leads', element: <LeadList /> },
      { path: 'members', element: <MemberList /> },
      { path: 'sponsored', element: <SponsoredList /> },
      { path: 'access', element: <AccessList /> },
    ],
  },
  // Add other routes as needed
  // { path: '/login', element: <LoginPage /> },
  // { path: '/', element: <HomePage /> },
]);

export default router;