import { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const UserDashboard = () => {
  const [branchCode, setBranchCode] = useState('');
  const [anydeskNumber, setAnydeskNumber] = useState('');
  const [details, setDetails] = useState('');
  const [issueType, setIssueType] = useState('แจ้งปัญหาการใช้งานทั่วไป');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const ticketData = {
      branchCode,
      anydeskNumber,
      details,
      issueType
    };

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/api/tickets', ticketData);
      setMessage(response.data.message); // Show success message
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
      </div>
    </Layout>
  );
};

export default UserDashboard;
