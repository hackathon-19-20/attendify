import { useState } from 'react';

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([
    { subject: 'Math', totalClasses: 10, attended: 8 },
    { subject: 'Physics', totalClasses: 12, attended: 9 }
  ]);

  return (
    <div className="ml-64 p-4">
      <h2 className="text-2xl mb-6">Attendance Overview</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Subject</th>
            <th className="py-2 px-4 border">Total Classes</th>
            <th className="py-2 px-4 border">Attended</th>
            <th className="py-2 px-4 border">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.subject}>
              <td className="py-2 px-4 border">{record.subject}</td>
              <td className="py-2 px-4 border">{record.totalClasses}</td>
              <td className="py-2 px-4 border">{record.attended}</td>
              <td className="py-2 px-4 border">
                {((record.attended / record.totalClasses) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDashboard;
