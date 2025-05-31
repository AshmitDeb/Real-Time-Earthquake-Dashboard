import { Router } from 'express';
import { query } from '../db.js';
const r = Router();

// last 24 h by magnitude desc
r.get('/', async (_, res) => {
  const { rows } = await query(
    `SELECT * FROM quakes WHERE occurred_at > now() - interval '1 day' ORDER BY occurred_at DESC`);
  res.json(rows);
});

// rolling averages for chart
r.get('/stats', async (_, res) => {
  const { rows } = await query(
    `SELECT date_trunc('hour', occurred_at) as t, avg(mag) as mag
       FROM quakes
      WHERE occurred_at > now() - interval '12 hours'
   GROUP BY t ORDER BY t`);
  res.json(rows);
});

export default r;