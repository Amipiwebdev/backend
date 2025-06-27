require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes); // 👈 your prefix

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
});
