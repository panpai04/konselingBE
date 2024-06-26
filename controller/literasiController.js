const pool = require('../config/connection');
const queries = require('../model/literasiModel');

const getLiterasi = async (req, res) => {
    try {
        // Jalankan query untuk mendapatkan data literasi
        const result = await pool.query(queries.getLiterasi);
        res.json(result.rows); // Pastikan mengirimkan array data
    } catch (error) {
        console.error('Error fetching literasi:', error);
        res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
    }
}

// Dapatkan data literasi berdasarkan ID
const getLiterasiById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid ID');
        }
        const result = await pool.query(queries.getLiterasiById, [id]);
        const literasi = result.rows[0];
        res.json(literasi);
    } catch (error) {
        console.error("Terjadi kesalahan saat mendapatkan data Literasi berdasarkan ID:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    getLiterasi,
    getLiterasiById
}
