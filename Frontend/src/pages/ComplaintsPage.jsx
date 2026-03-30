import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  submitComplaint, getMyComplaints,
  getAllComplaints, updateStatus
} from '../services/complaintService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import '../styles/layout.css';
import '../styles/dashboard.css';
import '../styles/complaints.css';

const ComplaintsPage = () => {
  const { user }                    = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [form, setForm]             = useState({ title: '', description: '', image: null });

  const load = async () => {
    const res = user.role === 'admin'
      ? await getAllComplaints()
      : await getMyComplaints();
    setComplaints(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    if (form.image) fd.append('image', form.image);
    try {
      await submitComplaint(fd);
      toast.success('Complaint submitted!');
      setForm({ title: '', description: '', image: null });
      load();
    } catch {
      toast.error('Failed to submit');
    }
  };

  const handleStatus = async (id, status) => {
    await updateStatus(id, status);
    toast.success('Status updated');
    load();
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <h2 className="page-title">Complaints</h2>

          {user.role === 'student' && (
            <form className="complaint-form" onSubmit={handleSubmit}>
              <h3>Submit New Complaint</h3>
              <input
                required placeholder="Title"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              />
              <textarea
                required placeholder="Describe your issue..." rows={3}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              />
              <input
                type="file" accept="image/*"
                onChange={e => setForm(p => ({ ...p, image: e.target.files[0] }))}
              />
              <button type="submit" className="btn-add">Submit</button>
            </form>
          )}

          <div className="complaints-list">
            {complaints.map(c => (
              <div className="complaint-card" key={c._id}>
                <div className="complaint-card-header">
                  <p className="complaint-title">{c.title}</p>
                  <span className={`badge badge-${c.status}`}>{c.status}</span>
                </div>
                <p className="complaint-desc">{c.description}</p>
                {c.image && (
                  <img
                    className="complaint-img"
                    src={`http://localhost:5000/uploads/${c.image}`}
                    alt="complaint"
                  />
                )}
                {user.role === 'admin' && (
                  <select value={c.status} onChange={e => handleStatus(c._id, e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplaintsPage;