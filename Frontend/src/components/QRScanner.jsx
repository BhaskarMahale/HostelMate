import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import toast from 'react-hot-toast';
import { checkIn, checkOut } from '../services/studentService';

const QRScanner = ({ mode }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10, qrbox: { width: 250, height: 250 }
    });

    scanner.render(async () => {
      scanner.clear();
      try {
        const res = mode === 'checkin' ? await checkIn() : await checkOut();
        toast.success(res.data.message);
      } catch (err) {
        toast.error(err.response?.data?.message || 'QR Error');
      }
    });

    return () => scanner.clear().catch(() => {});
  }, [mode]);

  return <div id="qr-reader" style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }} />;
};

export default QRScanner;