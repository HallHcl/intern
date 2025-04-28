import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Modal, Button } from 'react-bootstrap';  // Import Modal from react-bootstrap
import './ITStaffTree.css';

const LEADER_ID = '67d43cce815dcd81ec4d1713'; // Lock Leader by ID

const ITStaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control the modal visibility

  useEffect(() => {
    fetch('http://localhost:5000/api/it-staff')
      .then((response) => response.json())
      .then((data) => {
        setStaffData(data);
      })
      .catch((error) => console.error('Error fetching IT staff data:', error));
  }, []);

  const leader = staffData.find(person => person._id === LEADER_ID) || null;
  const subordinates = staffData.filter(person => person._id !== LEADER_ID);

  const filteredSubordinates = subordinates.filter(person =>
    (person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterPosition ? person.position === filterPosition : true)
  );

  const isLeaderMatchingSearch = leader &&
    (leader.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterPosition || leader.position === filterPosition);

  // Function to open modal and set selected staff
  const handleStaffClick = (person) => {
    setSelectedStaff(person);
    setShowModal(true); // Show the modal
  };

  return (
    <Layout>
      <div className="container-staff">
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
          {isLeaderMatchingSearch && (
            <div className="leader">
              <div className="staff-card leader-card" onClick={() => handleStaffClick(leader)}>
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
            {filteredSubordinates.length === 0 && !isLeaderMatchingSearch ? (
              <p className="no-results">❌ ไม่พบพนักงานที่ตรงกับเงื่อนไข</p>
            ) : (
              filteredSubordinates.map((person) => (
                <div key={person._id} className="staff-card" onClick={() => handleStaffClick(person)}>
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

      {/* Modal for staff preview */}
      {selectedStaff && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedStaff.firstName} {selectedStaff.lastName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedStaff.profilePic || "https://via.placeholder.com/150"}
              alt="Profile Preview"
              className="img-fluid mb-3"
            />
            <p><strong>ตำแหน่ง:</strong> {selectedStaff.position}</p>
            <p><strong>📞</strong> {selectedStaff.phone}</p>
            <p><strong>✉️</strong> {selectedStaff.email}</p>
            <p><strong>📝 รายละเอียด:</strong> {selectedStaff.description || "ไม่มีข้อมูลเพิ่มเติม"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>ปิด</Button>
            {/* You can add more buttons for further actions */}
          </Modal.Footer>
        </Modal>
      )}
    </Layout>
  );
};

export default ITStaffList;
