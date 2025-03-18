import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import WifiVideo from './pages/WifiVideo';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/it-staff" element={<ITStaffList />} />
        <Route path="/news" element={<News />} />
        <Route path="/manuals" element={<Manuals />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/notebook-ebook" element={<NotebookEbook />} />
        <Route path="/printer-ebook" element={<PrinterEbook />} />
        <Route path="/wifi-ebook" element={<WifiEbook />} />
        <Route path="/notebook-video" element={<NotebookVideo />} />
        <Route path="/printer-video" element={<PrinterVideo />} />
        <Route path="/wifi-video" element={<WifiVideo />} />
      </Routes>
    </Router>
  );
};

export default App;
