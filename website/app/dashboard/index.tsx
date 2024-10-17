import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../../lib/auth';
import Sidebar from '../../components/Sidebar';
import AttendanceDashboard from '../../components/AttendanceDashboard';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login'); 
    }
  }, [router]);

  return (
    <div>
      <Sidebar />
      <AttendanceDashboard />
    </div>
  );
};

export default Dashboard;
