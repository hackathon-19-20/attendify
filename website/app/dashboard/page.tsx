'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import correct useRouter
import { isLoggedIn } from '../../lib/auth';
import Sidebar from '../../components/Sidebar';
import AttendanceDashboard from '../../components/AttendanceDashboard';

const Dashboard = () => {
  const router = useRouter();
// insert a check
  // useEffect(() => {
  //   if (!isLoggedIn()) {
  //     console.log()
  //     router.push('/login'); 
  //   }
  // }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <AttendanceDashboard />
    </div>
  );
};

export default Dashboard;
