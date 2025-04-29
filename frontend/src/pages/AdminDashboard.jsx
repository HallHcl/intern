import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        localStorage.setItem('decodedToken', JSON.stringify(decoded));

        if (decoded.role === 'admin') {
          setIsAuthorized(true);
          fetchTickets();
        } else {
          setLoading(false);
          setError('Access denied: Admin privileges required');
        }
      } catch (err) {
        setLoading(false);
        setError('Invalid token');
      }
    } else {
      setLoading(false);
      setError('Authentication required');
    }
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tickets');
      setTickets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching tickets');
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${ticketId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTickets(); // Re-fetch tickets after updating status
    } catch (err) {
      setError('Error updating ticket status');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="access-denied">
        <div className="access-denied-icon">🔒</div>
        <h2>Access Denied</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );
  }

  const ticketStats = {
    total: tickets.length,
    pending: tickets.filter(ticket => ticket.status === 'PENDING').length,
    inProgress: tickets.filter(ticket => ticket.status === 'WORK IN PROGRESS').length,
    checking: tickets.filter(ticket => ticket.status === 'CHECKING').length, // เปลี่ยนจาก 'RESOLVE' เป็น 'CHECKING'
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchTickets}>Refresh</button>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p className="stat-number">{ticketStats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tickets</h3>
          <p className="stat-number">{ticketStats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number">{ticketStats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>CHECKING</h3>
          <p className="stat-number">{ticketStats.checking}</p> {/* เปลี่ยนจาก 'RESOLVE' */}
        </div>
      </div>

      <section className="tickets-section">
        <h2>Tickets List</h2>

        {tickets.length > 0 ? (
          <>
            {/* แจ้งปัญหาการใช้งานทั่วไป */}
            <div className="ticket-category">
              <h3>แจ้งปัญหาการใช้งานทั่วไป</h3>
              <div className="tickets-grid">
                {tickets.filter(ticket => ticket.issueType === 'แจ้งปัญหาการใช้งานทั่วไป').map((ticket) => (
                  <div className="ticket-card" key={ticket._id}>
                    <div className="ticket-header">
                      <span className="issue-type">{ticket.issueType}</span>
                      <span className="ticket-date">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="ticket-content">
                      <div className="ticket-info">
                        <span className="info-label">Branch Code:</span>
                        <span className="info-value">{ticket.branchCode}</span>
                      </div>
                      <div className="ticket-info">
                        <span className="info-label">AnyDesk:</span>
                        <span className="info-value">{ticket.anydeskNumber || 'Not provided'}</span>
                      </div>
                      <div className="ticket-details">
                        <span className="info-label">Details:</span>
                        <p>{ticket.details}</p>
                      </div>
                    </div>
                    <div className="ticket-footer">
                      <select
                        value={ticket.status || 'WAIT FOR ASSET'}
                        onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                      >
                        <option value="WAIT FOR ASSET">WAIT FOR ASSET</option>
                        <option value="WORK IN PROGRESS">WORK IN PROGRESS</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CHECKING">CHECKING</option> {/* เปลี่ยนจาก 'RESOLVE' เป็น 'CHECKING' */}
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* เบิก/เปลี่ยนอุปกรณ์ */}
            <div className="ticket-category">
              <h3>เบิก/เปลี่ยนอุปกรณ์</h3>
              <div className="tickets-grid">
                {tickets.filter(ticket => ticket.issueType === 'เบิก/เปลี่ยนอุปกรณ์').map((ticket) => (
                  <div className="ticket-card" key={ticket._id}>
                    <div className="ticket-header">
                      <span className="issue-type">{ticket.issueType}</span>
                      <span className="ticket-date">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="ticket-content">
                      <div className="ticket-info">
                        <span className="info-label">Branch Code:</span>
                        <span className="info-value">{ticket.branchCode}</span>
                      </div>
                      <div className="ticket-info">
                        <span className="info-label">AnyDesk:</span>
                        <span className="info-value">{ticket.anydeskNumber || 'Not provided'}</span>
                      </div>
                      <div className="ticket-details">
                        <span className="info-label">Details:</span>
                        <p>{ticket.details}</p>
                      </div>
                    </div>
                    <div className="ticket-footer">
                      <select
                        value={ticket.status || 'WAIT FOR ASSET'}
                        onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                      >
                        <option value="WAIT FOR ASSET">WAIT FOR ASSET</option>
                        <option value="WORK IN PROGRESS">WORK IN PROGRESS</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CHECKING">CHECKING</option> {/* เปลี่ยนจาก 'RESOLVE' เป็น 'CHECKING' */}
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>No tickets available at this time.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
