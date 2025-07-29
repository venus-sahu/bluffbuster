const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

const PORT = 5501;

// ✅ Serve static files from current folder
app.use(express.static(__dirname));

// ✅ Send index.html from current folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Track connected players
let playerCount = 0;

io.on('connection', (socket) => {
  console.log('✅ A user connected');

  socket.on('playerJoined', () => {
    playerCount++;
    console.log(`Players joined: ${playerCount}`);
    io.emit('updatePlayerCount', playerCount);
  });

  socket.on('disconnect', () => {
    playerCount--;
    console.log(`❌ A user disconnected. Players left: ${playerCount}`);
    io.emit('updatePlayerCount', playerCount);
  });
});

// ✅ Start the server
http.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});