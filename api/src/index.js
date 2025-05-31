import express from 'express';
import helmet from 'helmet';
import { json } from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cron from 'node-cron';
import quakesRouter from './routes/quakes.js';
import { pullQuakes } from './jobs/pullQuakes.js';

const app = express();
app.use(helmet());
app.use(json());
app.use('/api/quakes', quakesRouter);

const httpServer = createServer(app);
export const io = new Server(httpServer, { cors: { origin: '*' } });

cron.schedule('* * * * *', pullQuakes);        // fetch every minute
httpServer.listen(5000, () => console.log('API listening on 5000'));
