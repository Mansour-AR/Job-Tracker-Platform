import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Root test server working!',
    timestamp: new Date().toISOString(),
    cwd: process.cwd()
  });
});

app.listen(PORT, () => {
  console.log(`Root test server on port ${PORT}`);
  console.log('Current working directory:', process.cwd());
}); 