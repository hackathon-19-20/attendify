import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-4"><Link href="/dashboard">Dashboard</Link></li>
        <li className="mb-4"><Link href="/timetable">Timetable</Link></li>
        <li className="mb-4"><Link href="/attendance">Attendance</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
