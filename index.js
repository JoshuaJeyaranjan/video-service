const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// test
const categoriesRoutes = require('./routes/categories');
const videosRoutes = require('./routes/videos');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/categories', categoriesRoutes);
app.use('/api/videos', videosRoutes);

// Health check
app.get('/', (req, res) => res.send('Video service is running.'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));