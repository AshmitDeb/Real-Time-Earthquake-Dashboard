import axios from 'axios';
import { query } from '../db.js';
import { io } from '../index.js';

export async function pullQuakes() {
  try {
    const { data } = await axios.get(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
    );
    for (const f of data.features) {
      const { id: usgs_id, properties, geometry } = f;
      const [lon, lat, depth] = geometry.coordinates;
      const { mag, place, time } = properties;
      const occurred_at = new Date(time);

      const { rows } = await query(
        `INSERT INTO quakes(usgs_id, mag, place, lat, lon, depth, occurred_at)
         VALUES($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (usgs_id) DO NOTHING RETURNING *`,
        [usgs_id, mag, place, lat, lon, depth, occurred_at]
      );
      if (rows[0]) io.emit('new-quake', rows[0]);
    }
  } catch (err) {
    console.error('USGS pull failed', err.message);
  }
}
