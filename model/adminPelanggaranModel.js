const getDataPelanggaran = "SELECT * FROM pelanggaran";
const getDataPelanggaranById = "SELECT * FROM pelanggaran WHERE id=$1";
const inputDataPelanggaran = "INSERT INTO pelanggaran (nama_siswa,jenis_kelamin,waktu,peristiwa,tempat,informan,bidang_bimbingan) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const deleteDataPelanggaran = "DELETE FROM pelanggaran WHERE id=$1";
const updateDataPelanggaran = "UPDATE pelanggaran SET nama_siswa=$1,jenis_kelamin=$2,waktu=$3,peristiwa=$4,tempat=$5,informan=$6,bidang_bimbingan=$7 WHERE id=$8";


module.exports={
    getDataPelanggaran,
    inputDataPelanggaran,
    deleteDataPelanggaran,
    getDataPelanggaranById,
    updateDataPelanggaran
}