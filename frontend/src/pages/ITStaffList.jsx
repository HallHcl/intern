import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Modal, Button } from 'react-bootstrap';  // Import Modal from react-bootstrap
import './ITStaffTree.css';

const SUPER_LEADER_ID = '680faff437678acdc2f9297c'; // Lock Super Leader by ID
const LEADER_ID = '680fb01f37678acdc2f92980'; // Lock Leader by ID

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
  const superLeader = staffData.find(person => person._id === SUPER_LEADER_ID) || null;
  const subordinates = staffData.filter(person => person._id !== LEADER_ID && person._id !== SUPER_LEADER_ID);

  const filteredSubordinates = subordinates.filter(person =>
    (person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterPosition ? person.position === filterPosition : true)
  );

  const isLeaderMatchingSearch = leader &&
    (leader.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterPosition || leader.position === filterPosition);

  const isSuperLeaderMatchingSearch = superLeader &&
    (superLeader.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      superLeader.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filterPosition || superLeader.position === filterPosition);

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
          {isSuperLeaderMatchingSearch && superLeader && (
            <div className="super-leader">
              <div className="staff-card super-leader-card" onClick={() => handleStaffClick(superLeader)}>
                <img src={superLeader.profilePic} alt="Profile" className="profile-pic" />
                <h3>{superLeader.firstName} {superLeader.lastName}</h3>
                <div className="staff-info">
                  <p><strong>Position:</strong> {superLeader.position}</p>
                  <p><strong>📞</strong> {superLeader.phone}</p>
                  <p><strong>✉️</strong> {superLeader.email}</p>
                </div>
              </div>
            </div>
          )}

          {isLeaderMatchingSearch && leader && (
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
            {filteredSubordinates.length === 0 && !isLeaderMatchingSearch && !isSuperLeaderMatchingSearch ? (
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
      <Modal.Title>ข้อมูลพนักงาน</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex flex-row">
        {/* Left side: image and name */}
        <div className="text-center w-50 border-end pe-3">
          <img
            src={selectedStaff.profilePic || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="img-fluid rounded-circle mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <h5 className="mt-2 text-capitalize">
            {selectedStaff.firstName} {selectedStaff.lastName}
          </h5>
        </div>

        {/* Right side: details */}
        <div className="ps-4 w-50">
          <p><strong>Positoin:</strong> {selectedStaff.position}</p>
          <p><strong>✉️ Email:</strong> {selectedStaff.email}</p>
          <p><strong>📞 Phone:</strong> {selectedStaff.phone}</p>
          <p><strong>📝 Description:</strong> {selectedStaff.description || "ไม่มีข้อมูลเพิ่มเติม"}</p>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>ปิด</Button>
    </Modal.Footer>
  </Modal>
)}




    </Layout>
  );
};

export default ITStaffList;