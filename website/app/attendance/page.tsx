import Attendance from '@/components/Attendance';
import { Sidebar } from 'lucide-react';


const AttendancePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Attendance />
   
    </div>
  )
};

export default AttendancePage;
