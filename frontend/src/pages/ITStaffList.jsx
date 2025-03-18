import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import './ITStaffTree.css';

const LEADER_ID = '67d43c3f815dcd81ec4d170b'; // Lock Leader by ID

const ITStaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/it-staff')
      .then((response) => response.json())
      .then((data) => {
        setStaffData(data);
      })
      .catch((error) => console.error('Error fetching IT staff data:', error));
  }, []);

  // Find the Leader by ID
  const leader = staffData.find(person => person._id === LEADER_ID) || null;
  
  // Filter out the Leader from subordinates
  const subordinates = staffData.filter(person => person._id !== LEADER_ID);

  // Filter subordinates based on search term and position
  const filteredSubordinates = subordinates.filter(person =>
    (person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     person.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterPosition ? person.position === filterPosition : true)
  );

  return (
    <Layout>
      <div className="container">
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="🔍 ค้นหาพนักงาน..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
            <option value="">📌 ทุกตำแหน่ง</option>
            {[...new Set(staffData.map(person => person.position))].map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        <div className="staff-tree">
          {/* Show Leader if position matches or no filter */}
          {leader && (!filterPosition || leader.position === filterPosition) && (
            <div className="leader">
              <div className="staff-card leader-card">
                <img src={leader.profilePic} alt="Profile" className="profile-pic" />
                <h3>{leader.firstName} {leader.lastName}</h3>
                <div className="staff-info">
                  <p><strong>Position:</strong> {leader.position}</p>
                  <p><strong>📞</strong> {leader.phone}</p>
                  <p><strong>✉️</strong> {leader.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="subordinates">
            {filteredSubordinates.length === 0 ? (
              <p className="no-results">❌ ไม่พบพนักงานที่ตรงกับเงื่อนไข</p>
            ) : (
              filteredSubordinates.map((person) => (
                <div key={person._id} className="staff-card">
                  <img src={person.profilePic} alt="Profile" className="profile-pic" />
                  <h3>{person.firstName} {person.lastName}</h3>
                  <div className="staff-info">
                    <p><strong>Position:</strong> {person.position}</p>
                    <p><strong>📞</strong> {person.phone}</p>
                    <p><strong>✉️</strong> {person.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ITStaffList;
