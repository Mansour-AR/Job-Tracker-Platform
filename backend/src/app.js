import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Basic middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

export default app;