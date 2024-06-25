const pool = require('../config/connection');
const { getStudentsAll } = require('../model/siswaModel');
const { getKelasAll } = require('../model/kelasModel')
const { getPelanggaranAll } = require('../model/pelanggaranModel');
const { getKonselorAll } = require('../model/konselorModel')


// Dapatkan jumlah data siswa
const getCountStudent = async (req, res) => {
    try {
      const result = await pool.query(getStudentsAll);
      const count = result.rows[0].count;
      res.json({count})
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil jumlah siswa', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Dapatkan jumlah data kelas
const getCountKelas = async (req, res) => {
    try {
        const result = await pool.query(getKelasAll);
        const count = result.rows[0].count;
        res.json({count});
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil jumlah kelas', error);
        res.status(500).send('Internal Server Error');
    };
};

// Dapatkan jumlah data pelanggaran
const getCountPelanggaran = async (req, res) => {
    try {
        const result = await pool.query(getPelanggaranAll);
        const count = result.rows[0].count;
        res.json({count});
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil jumlah kelas', error);
        res.status(500).send('Internal Server Error');
    };
};

// Dapatkan jumlah data konselor
const getCountKonselor = async (req, res) => {
    try {
      const result = await pool.query(getKonselorAll);
      const count = result.rows[0].count;
      res.json({count})
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil jumlah konselor', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }


module.exports = {
    getCountStudent,
    getCountKelas,
    getCountPelanggaran,
    getCountKonselor,
};
