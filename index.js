const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const { createServer } = require("http");
const httpServer = createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());

// Index Route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
});

httpServer.listen(port, () => {
	console.log(`Server is running on port ${ port }`);
});

// Import route modules
const bookRoutes = require('./src/routes/bookRoute');

// Use route modules
app.use('/user', bookRoutes);