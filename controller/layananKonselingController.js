const pool = require('../config/connection');
const queries = require('../model/layananKonselingModel');


// Dapatkan data layananKonseling
const getLayananKonseling = async (req, res) => {
    try {
        const result = await pool.query(queries.getLayananKonseling);
        const layananKonseling = result.rows;
        res.json(layananKonseling);
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data LayananKonseling', error);
        res.status(500).send('Internal Server Error');
    };
};

// Dapatkan Layanan Konseling By id
const getLayananKonselingById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(queries.getLayananKonselingById, [id]);
        const layanankonseling = result.rows[0];
        res.json(layanankonseling)
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil LayananKonseling by Id', error);
        res.status(500).send('Internal Server Error');
    };
};

// Hapus data layananKonseling
const deleteLayananKonseling = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const checkLayananKonseling = await pool.query(queries.getLayananKonselingById, [id]);
        if (checkLayananKonseling.rows.length === 0) {
            return res.status(404).json({ msg: "LayananKonseling tidak ditemukan" });
        };
        await pool.query(queries.deleteLayananKonseling, [id]);
        res.status(200).json({ msg: "LayananKonseling berhasil dihapus" });
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus LayananKonseling', error);
        res.status(500).json({ msg: "Internal Server Error" });
    };
};

module.exports = {
    getLayananKonseling,
    deleteLayananKonseling,
    getLayananKonselingById
}