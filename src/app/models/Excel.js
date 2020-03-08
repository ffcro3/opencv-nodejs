import mongoose from 'mongoose';

const ExcelSchema = new mongoose.Schema({
  name: String,
  path: String,
  date: Date,
});

export default mongoose.model('Excel', ExcelSchema);
