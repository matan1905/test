const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
// Centralized state
const demoPeople = [
    { name: 'Matan Ellhayani' },
    { name: 'itamar hay'},
]
const initialState = {
  totalAmount: 8953.96,
  shareToPay: {
    [demoPeople[0].name]: (8953.96/2).toFixed(2),
    [demoPeople[1].name]: (8953.96/2).toFixed(2),
  },
  status: {},
  people: demoPeople,
  // Payment deadline - one hour from now
  payUntil: (new Date(Date.now() + 3600000)).getTime()
};
let state = JSON.parse(JSON.stringify(initialState));


// New route to get the entire state



const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('updateStatus', (data) => {
    console.log('updateStatus', data);
    state.status[data.name] = data.status;
    io.emit('stateUpdate', state);
    
    // Check if all payments are made
    if (demoPeople.every(person => state.status[person.name] === 'paid')) {
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

app.get('/api/reset', (req, res) => {
  state = JSON.parse(JSON.stringify(initialState));
  state.payUntil = (new Date(Date.now() + 3600000)).getTime();
  io.emit('stateUpdate', state);
  res.json({ message: 'State reset successfully' });
});

app.get('/reset', (req, res) => {
  state = JSON.parse(JSON.stringify(initialState));
  state.payUntil = (new Date(Date.now() + 3600000)).getTime();
  if(req.query.price) {
    state.totalAmount = parseFloat(req.query.price);
    state.people.forEach(person => {
      state.shareToPay[person.name] = (state.totalAmount/state.people.length).toFixed(2);
    });
  }
  io.emit('stateUpdate', state);
  res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

