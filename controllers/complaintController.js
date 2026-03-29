const Complaint = require('../models/Complaint');

// POST submit complaint (student)
const submitComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;
        const complaint = await Complaint.create({
            studentId: req.user._id, title, description, image
        });
        res.status(201).json(complaint);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET all complaints (admin)
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('studentId', 'name email');
        res.json(complaints);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET my complaints (student)
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ studentId: req.user._id });
        res.json(complaints);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT update status (admin)
const updateStatus = async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id, { status: req.body.status }, { new: true }
        );
        res.json(complaint);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { submitComplaint, getAllComplaints, getMyComplaints, updateStatus };