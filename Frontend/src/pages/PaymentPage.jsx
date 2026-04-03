import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { makePayment, getMyPayments, getAllPayments } from '../services/paymentService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import '../styles/layout.css';
import '../styles/dashboard.css';
import '../styles/payment.css';

const PaymentPage = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ amount: '', month: '' });

  const load = async () => {
    const res = user.role === 'admin' ? await getAllPayments() : await getMyPayments();
    setPayments(res.data);
  };

  useEffect(() => { load(); }, []);

  const handlePay = async e => {
    e.preventDefault();
    try {
      await makePayment(form);
      toast.success('Payment successful! Receipt generated.');
      setForm({ amount: '', month: '' });
      load();
    } catch {
      toast.error('Payment failed');
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <h2 className="page-title">Payments</h2>

          {user.role === 'student' && (
            <form className="payment-form" onSubmit={handlePay}>
              <h3>Make Payment</h3>
              <input
                required type="number" placeholder="Amount (₹)"
                value={form.amount}
                onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
              />
              <input
                required placeholder="Month (e.g. January 2024)"
                value={form.month}
                onChange={e => setForm(p => ({ ...p, month: e.target.value }))}
              />
              <button type="submit" className="btn-success" style={{ width: '100%' }}>
                Pay Now
              </button>
            </form>
          )}

          <div className="payment-table-wrap">
            <table className="payment-table">
              <thead>
                <tr>
                  {user.role === 'admin' && <th>Student</th>}
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p._id}>
                    {user.role === 'admin' && <td>{p.studentId?.name}</td>}
                    <td>{p.month}</td>
                    <td>₹{p.amount}</td>
                    <td>
                      <span className={`badge badge-${p.status}`}>{p.status}</span>
                    </td>
                    <td>
                      {p.receipt && (
                        <a>
                          className="receipt-link"
                          href={`http://localhost:5000/uploads/${p.receipt}`}
                          target="_blank" rel="noreferrer"

                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;