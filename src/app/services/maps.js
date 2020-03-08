import 'dotenv/config';
import maps from '@google/maps';

const mapsApi = maps.createClient({
  key: process.env.GKEY,
});

export default mapsApi;
