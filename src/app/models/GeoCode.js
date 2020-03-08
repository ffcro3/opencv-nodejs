import mongoose from 'mongoose';

const GeoCodeSchema = new mongoose.Schema({
  number: String,
  route: String,
  neighborhood: String,
  city: String,
  state: String,
  country: String,
  formattedAddress: String,
  latitude: String,
  longitude: String,
  place_id: String,
  type: String,
});

export default mongoose.model('GeoCode', GeoCodeSchema);
