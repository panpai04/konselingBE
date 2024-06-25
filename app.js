const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 4000;

// Inisialisasi postgresql
const pool = require('./config/connection');

// Import Routing
const studentRoutes = require('./routes/siswaRoutes');
const kelasRoutes = require('./routes/kelasRoutes');
const profileRoutes = require('./routes/profileRoutes');
const loginRoutes = require('./routes/login');
const konselorRoutes = require('./routes/konselorRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pelanggaranRoutes = require('./routes/pelanggaranRoutes');
const konselingRoutes = require('./routes/konselingRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Inisialisasi cors 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Inisialisasi Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routing
app.use('/kelas', kelasRoutes);
app.use('/profile', profileRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/students', studentRoutes);
app.use('/konselor', konselorRoutes);
app.use('/pelanggaran', pelanggaranRoutes);
app.use('/konseling', konselingRoutes);
app.use('/auth', loginRoutes);
app.use('/users', usersRoutes);

// Run Servers
app.listen(PORT, () => {
  console.log(`Server berjalan di localhost: ${PORT}`);
});

// Run Database
async function connect() {
  try {
    const client = await pool.connect();
    console.log('connected...');
  } catch (err) {
    console.log(err.message);
  }
}
connect();
