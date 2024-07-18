const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const http = require('http');
// Socket.io
// Store last used adjustment
let lastAdjustment = {};
// API route to get last adjustment
app.get('/api/lastAdjustment', (req, res) => {
  res.json(lastAdjustment);
});
// API route to set last adjustment
app.post('/api/lastAdjustment', (req, res) => {
  lastAdjustment = req.body;
  res.json({ message: 'Last adjustment updated successfully' });
});



const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('updatePaymentStatus', (data) => {
    console.log('paymentStatusUpdated', data);
    io.emit('paymentStatusUpdated', data);
  });
  socket.on('allPaymentsMade', () => {
    io.emit('showConfetti');
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// API routes
app.get('/api/split', (req, res) => {
  const { amount, people } = req.query;
  const splitAmount = parseFloat(amount) / parseInt(people);
  res.json({ splitAmount: splitAmount.toFixed(2) });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
