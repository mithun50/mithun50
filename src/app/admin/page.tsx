import { Metadata } from 'next';
import AuthGate from '@/components/analytics/AuthGate';
import AdminDashboard from '@/components/analytics/AdminDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <AuthGate>
      <AdminDashboard />
    </AuthGate>
  );
}

// Force dynamic rendering for admin page
export const dynamic = 'force-dynamic';
