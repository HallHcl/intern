import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Corrected import
import Home from './pages/Home';
import ITStaffList from './pages/ITStaffList';
import Manuals from './pages/Manuals';
import News from './pages/News';
import Videos from './pages/Videos';
import NotebookEbook from './pages/NotebookEbook'; // นำเข้า NotebookEbook
import PrinterEbook from './pages/PrinterEbook';
import WifiEbook from './pages/WifiEbook';
import NotebookVideo from './pages/NotebookVideo';
import PrinterVideo from './pages/PrinterVideo';
import JoinDomain from './pages/JoinDomain';
import Language from './pages/Language';
import Time from './pages/Time';
import Initial from './pages/Initial';
import Policy from './pages/Policy';
import Security from './pages/Security';
import Maintenance from './pages/Maintenance';
import Storage from './pages/Storage';
import WifiVideo from './pages/WifiVideo';
import UserDashboard from './pages/UserDashboard'; // Import User Dashboard
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard
import PrinterPage from './pages/PrinterPage';  // Create this component
import EpsonEbook from './pages/EpsonEbook';    // Create this component
import BrotherEbook from './pages/BrotherEbook';  // Create this component
import ProtectedRoute from './components/ProtectedRoute'; // import ProtectedRoute
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const user = { role: 'admin' };  // Example user object (you can change this as needed)

  return (
    <Router>
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/it-staff" element={<ITStaffList />} />
        <Route path="/news" element={<News />} />
        <Route path="/manuals" element={<Manuals />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Domain" element={<JoinDomain />} />
        <Route path="/Language" element={<Language />} />
        <Route path="/Time" element={<Time />} />
        <Route path="/Initial" element={<Initial />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/Security" element={<Security/>} />
        <Route path="/Maintenance" element={<Maintenance/>} />
        <Route path="/Storage" element={<Storage/>} />

        <Route path="/notebook-ebook" element={<NotebookEbook />} />
        <Route path="/printer-ebook" element={<PrinterEbook />} />
        <Route path="/wifi-ebook" element={<WifiEbook />} />
        <Route path="/notebook-video" element={<NotebookVideo />} />
        <Route path="/printer-video" element={<PrinterVideo />} />
        <Route path="/wifi-video" element={<WifiVideo />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute userRole={user.role}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/printer" element={<PrinterPage />} /> {/* Fixed route */}
        <Route path="/epson-ebook" element={<EpsonEbook />} /> {/* Fixed route */}
        <Route path="/brother-ebook" element={<BrotherEbook />} /> {/* Fixed route */}
        
      </Routes>
    </Router>
  );
};

export default App;
