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
  context: "This is splitting payment for a flight to TLV->LAS and back",
  payments: {
    'Matan Ellhayani': 0,
    'itamar hay': 0,
    'Plony Almony': 0
  }
};
// Function to update state and broadcast changes
function updateState(newState) {
  Object.assign(state, newState);
  io.emit('stateUpdate', state);
}

app.get('/api/state', (req, res) => {
  res.json(state);


const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial state to the connected client
  socket.emit('initialState', state);
  socket.on('updatePaymentStatus', (data) => {
    updateState({
      paidStatus: {
        ...state.paidStatus,
        [data.name]: true
      }
    });
    
    if (Object.values(state.paidStatus).every(status => status)) {
      io.emit('showConfetti');
    }
  });
  socket.on('updatePayments', (payments) => {
    updateState({ payments });
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
  updateState({
    lastAdjustment: req.body,
    paidStatus: {}
  });
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
