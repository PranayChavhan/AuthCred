import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    position: { type: String },
    department: { type: String },
    verificationStatus: { type: String, default: 'Pending' },
    otherDetails: { type: Object }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
