const getLayananKonseling = "SELECT * FROM layanankonseling";
const deleteLayananKonseling = "DELETE FROM layanankonseling WHERE id = $1";
const getLayananKonselingById = "SELECT * FROM layanankonseling WHERE id =$1";

module.exports = {
    getLayananKonseling,
    deleteLayananKonseling,
    getLayananKonselingById
}