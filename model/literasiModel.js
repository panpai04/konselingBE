const getLiterasi = "SELECT * FROM literasi ";
const getLiterasiById = "SELECT * FROM literasi WHERE id =$1";

module.exports = {
    getLiterasi,
    getLiterasiById
}