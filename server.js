const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

db.sequelize.sync();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});