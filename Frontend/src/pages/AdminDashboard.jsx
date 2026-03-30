import { useEffect, useState } from 'react';
import { getAllStudents } from '../services/studentService';
import { getAllRooms, createRoom } from '../services/roomService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import '../styles/layout.css';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms]       = useState([]);
  const [newRoom, setNewRoom]   = useState({ roomNumber: '', type: 'single', capacity: 1 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAllStudents().then(r => setStudents(r.data));
    getAllRooms().then(r => setRooms(r.data));
  }, []);

  const handleCreateRoom = async e => {
    e.preventDefault();
    try {
      const res = await createRoom(newRoom);
      setRooms(prev => [...prev, res.data]);
      toast.success('Room created!');
      setShowForm(false);
      setNewRoom({ roomNumber: '', type: 'single', capacity: 1 });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <h2 className="page-title">Admin Dashboard</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Students</p>
              <p className="stat-value">{students.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Total Rooms</p>
              <p className="stat-value">{rooms.length}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Available Rooms</p>
              <p className="stat-value">{rooms.filter(r => r.status === 'available').length}</p>
            </div>
          </div>

          <div className="section-header">
            <h3 className="section-title">Rooms</h3>
            <button className="btn-add" onClick={() => setShowForm(!showForm)}>
              + Add Room
            </button>
          </div>

          {showForm && (
            <form className="add-form" onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label>Room No.</label>
                <input
                  required value={newRoom.roomNumber}
                  onChange={e => setNewRoom(p => ({ ...p, roomNumber: e.target.value }))}
                  style={{ width: '90px' }}
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newRoom.type}
                  onChange={e => setNewRoom(p => ({ ...p, type: e.target.value }))}
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number" min={1} max={4} required
                  value={newRoom.capacity}
                  onChange={e => setNewRoom(p => ({ ...p, capacity: +e.target.value }))}
                  style={{ width: '60px' }}
                />
              </div>
              <button type="submit" className="btn-success">Save</button>
            </form>
          )}

          <div className="rooms-grid">
            {rooms.map(room => (
              <div className="room-card" key={room._id}>
                <div className="room-card-header">
                  <span className="room-card-title">Room {room.roomNumber}</span>
                  <span className={`badge badge-${room.status}`}>{room.status}</span>
                </div>
                <p>Type: <strong>{room.type}</strong></p>
                <p>Occupants: {room.occupants?.length} / {room.capacity}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;