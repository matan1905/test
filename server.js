const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
// Centralized state
const state = {
  lastAdjustment: {},
  paidStatus: {},
  totalAmount: 8953.96,
  people: [
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
    { name: 'Plony Almony', id: 'plony' }
  ]
};
// Function to emit state updates to all clients
function emitStateUpdate(socket) {
  socket.emit('stateUpdate', state);
}
  // Send initial state to the newly connected client
  emitStateUpdate(socket);

// New route to get the entire state
app.get('/api/state', (req, res) => {
  res.json(state);


const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('updatePaymentStatus', (data) => {
    console.log('paymentStatusUpdated', data);
    state.paidStatus[data.name] = true;
    io.emit('stateUpdate', state);
    
    // Check if all payments are made
    if (Object.values(state.paidStatus).every(status => status === true)) {
      io.emit('showConfetti');
    }
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/api/lastAdjustment', (req, res) => {
  res.json(state.lastAdjustment);
});
// API route to set last adjustment
app.post('/api/lastAdjustment', (req, res) => {
  state.lastAdjustment = req.body;
  state.paidStatus = {};
  io.emit('stateUpdate', state);
  res.json({ message: 'Last adjustment updated successfully' });
});
app.get('/api/paidStatus', (req, res) => {
  res.json(state.paidStatus);
});

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
