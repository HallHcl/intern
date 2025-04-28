import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import
import './AdminDashboard.css'; // We'll create this file next

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setDecodedToken] = useState(null);  // State to hold decoded token

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        localStorage.setItem('decodedToken', JSON.stringify(decoded));
        
        // Check if user has admin role
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

  if (loading) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading dashboard...</p>
    </div>;
  }

  if (error) {
    return <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Error</h3>
      <p>{error}</p>
    </div>;
  }

  if (!isAuthorized) {
    return <div className="access-denied">
      <div className="access-denied-icon">🔒</div>
      <h2>Access Denied</h2>
      <p>You must be an admin to view this page.</p>
    </div>;
  }

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
          <p className="stat-number">{tickets.length}</p>
        </div>
      </div>

      <section className="tickets-section">
        <h2>Tickets List</h2>
        
        {tickets.length > 0 ? (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
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
                  <button className="action-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
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
