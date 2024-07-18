const express = require('express');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');
// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('updatePaymentStatus', (data) => {
    io.emit('paymentStatusUpdated', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

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
