import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  address: String,
  number: String,
  neighborhood: String,
  city: String,
  state: String,
});

export default mongoose.model('Address', AddressSchema);
