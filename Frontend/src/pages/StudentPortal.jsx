import { useEffect, useState } from 'react';
import { getDashboard, getQRCode } from '../services/studentService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/layout.css';
import '../styles/student.css';

const StudentPortal = () => {
  const [data, setData]     = useState(null);
  const [qr, setQr]         = useState(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    getDashboard().then(r => setData(r.data.user));
  }, []);

  const handleShowQR = async () => {
    if (!qr) {
      const res = await getQRCode();
      setQr(res.data.qrCode);
    }
    setShowQR(true);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <h2 className="page-title">Student Dashboard</h2>

          {data && (
            <div className="student-info-grid">
              <div className="info-card">
                <p className="info-label">Name</p>
                <p className="info-value">{data.name}</p>
              </div>
              <div className="info-card">
                <p className="info-label">Email</p>
                <p className="info-value">{data.email}</p>
              </div>
              <div className="info-card full-width">
                <p className="info-label">Assigned Room</p>
                <p className="info-value">
                  {data.roomId ? `Room ${data.roomId.roomNumber}` : 'Not assigned yet'}
                </p>
              </div>
            </div>
          )}

          <button className="btn-add" onClick={handleShowQR}>
            Show My QR Code
          </button>

          {showQR && qr && (
            <div className="qr-image-wrap" style={{ marginTop: '16px' }}>
              <p className="qr-image-label">Scan for hostel entry</p>
              <img src={qr} alt="QR Code" />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentPortal;