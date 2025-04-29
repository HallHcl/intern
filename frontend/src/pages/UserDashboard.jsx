import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Layout from '../components/Layout';

const UserDashboard = () => {
  const [branchCode, setBranchCode] = useState('');
  const [anydeskNumber, setAnydeskNumber] = useState('');
  const [details, setDetails] = useState('');
  const [issueType, setIssueType] = useState('แจ้งปัญหาการใช้งานทั่วไป');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        fetchUserTickets(decoded.userId, token);
      } catch (err) {
        console.error('Invalid token');
        setMessage('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
      }
    } else {
      setMessage('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
    }
  }, []);
  

  const fetchUserTickets = async (uid, token) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/user/${uid}`, { // ใช้ uid แทน userId
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserTickets(response.data);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    const ticketData = {
      branchCode,
      anydeskNumber,
      details,
      issueType,
      userId
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/tickets', ticketData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
      setBranchCode('');
      setAnydeskNumber('');
      setDetails('');
      setIssueType('แจ้งปัญหาการใช้งานทั่วไป');
      fetchUserTickets(userId, token); // อัปเดตตารางหลังส่ง ticket
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการส่งข้อมูล');
      console.error('Error submitting ticket:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">สร้าง Ticket</h1>
        {message && <div className="bg-green-100 text-green-700 p-2 mb-4">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">รหัสสาขา</label>
            <input
              type="text"
              value={branchCode}
              onChange={(e) => setBranchCode(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">หมายเลข AnyDesk (ไม่บังคับ)</label>
            <input
              type="text"
              value={anydeskNumber}
              onChange={(e) => setAnydeskNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">รายละเอียดปัญหา</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">ประเภทปัญหา</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="แจ้งปัญหาการใช้งานทั่วไป">แจ้งปัญหาการใช้งานทั่วไป</option>
              <option value="เบิก/เปลี่ยนอุปกรณ์">เบิก/เปลี่ยนอุปกรณ์</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            ส่ง Ticket
          </button>
        </form>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">ประวัติการส่ง Ticket</h2>
        {userTickets.length === 0 ? (
          <p className="text-gray-600">ยังไม่มีรายการที่ส่ง</p>
        ) : (
          <div className="overflow-x-auto mt-4">
  <table className="min-w-full table-auto border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 border">วันที่</th>
        <th className="px-4 py-2 border">ประเภท</th>
        <th className="px-4 py-2 border">รายละเอียด</th>
        <th className="px-4 py-2 border">สถานะ</th>
        <th className="px-4 py-2 border">หมายเลข AnyDesk</th> {/* เพิ่มคอลัมน์สำหรับ AnyDesk */}
        <th className="px-4 py-2 border">รหัสสาขา</th> {/* เพิ่มคอลัมน์สำหรับรหัสสาขา */}
      </tr>
    </thead>
    <tbody>
      {userTickets.map(ticket => (
        <tr key={ticket._id}>
          <td className="px-4 py-2 border">{new Date(ticket.createdAt).toLocaleDateString()}</td>
          <td className="px-4 py-2 border">{ticket.issueType}</td>
          <td className="px-4 py-2 border">{ticket.details}</td>
          <td className="px-4 py-2 border">{ticket.status || 'WAIT FOR ASSET'}</td>
          <td className="px-4 py-2 border">{ticket.anydeskNumber || 'N/A'}</td> {/* แสดงหมายเลข AnyDesk */}
          <td className="px-4 py-2 border">{ticket.branchCode || 'N/A'}</td> {/* แสดงรหัสสาขา */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
