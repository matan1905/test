const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
// Centralized state
const demoPeople = [
    { name: 'Matan Ellhayani' },
    { name: 'itamar hay'},
    { name: 'Plony Almony'}
]
const state = {
  totalAmount: 8953.96,
  lastAdjustment: {
    [demoPeople[0].name]: (8953.96/3).toFixed(2),
    [demoPeople[1].name]: (8953.96/3).toFixed(2),
    [demoPeople[2].name]: (8953.96/3).toFixed(2),
  },
  paidStatus: {},
  people: demoPeople
};


// New route to get the entire state



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
    if (demoPeople.every(person => state.paidStatus[person.name])) {
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

app.get('/api/state', (req, res) => {
  res.json(state);
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

