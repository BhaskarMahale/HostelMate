import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import QRScanner from '../components/QRScanner';
import '../styles/layout.css';
import '../styles/dashboard.css';
import '../styles/qr.css';

const QRPage = () => {
  const [mode, setMode] = useState('checkin');

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <h2 className="page-title">QR Hostel Entry</h2>

          <div className="qr-mode-btns">
            <button
              className={mode === 'checkin' ? 'btn-active' : 'btn-outline'}
              onClick={() => setMode('checkin')}
            >
              Check In
            </button>
            <button
              className={mode === 'checkout' ? 'btn-active' : 'btn-outline'}
              onClick={() => setMode('checkout')}
            >
              Check Out
            </button>
          </div>

          <div className="qr-box">
            <p className="qr-hint">
              Scan QR Code to {mode === 'checkin' ? 'Check In' : 'Check Out'}
            </p>
            <QRScanner mode={mode} key={mode} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRPage;
