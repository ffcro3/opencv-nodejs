import mongoose from 'mongoose';

const AddressSerachSchema = new mongoose.Schema({
  searchGeo: String,
});

export default mongoose.model('AddressSearch', AddressSerachSchema);
