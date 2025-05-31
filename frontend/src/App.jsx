import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export default function App() {
  const [socket] = useState(() => io('http://localhost:5000'));
  const [quakes, setQuakes] = useState([]);

  // initial fetch
  useEffect(() => {
    axios.get('http://localhost:5000/api/quakes')
         .then(r => setQuakes(r.data));
  }, []);

  // live updates
  useEffect(() => {
    socket.on('new-quake', q => setQuakes(qs => [q, ...qs.slice(0, 19)]));
    return () => socket.close();
  }, [socket]);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>
        ShakeMap – live earthquakes (last 20)
      </h1>

      {quakes.length === 0 ? (
        <p>Waiting for data…</p>
      ) : (
        <table>
          <thead>
            <tr><th>Mag</th><th>Place</th><th>Time (UTC)</th></tr>
          </thead>
          <tbody>
            {quakes.map(q => (
              <tr key={q.usgs_id}>
                <td>{q.mag?.toFixed(1)}</td>
                <td>{q.place}</td>
                <td>{new Date(q.occurred_at).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

