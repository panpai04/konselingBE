const pool = require('../config/connection');
const queriesUser = require('../model/userModel');
const { getUserByEmail,
        getGender,
        getGenderForm,
      } = require('../model/userModel')
const queriesSiswa = require('../model/siswaModel');
const queriesKelas = require('../model/kelasModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Function ambil data user
const getUsers = async (req, res) => {
  try {
    
    const result = await pool.query(queriesUser.getUserLogin);
    const user = result.rows;
    res.json(user)
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data user', error);
    res.status(500).send('Internal Server Error');
  }
}

// Function ambil data usersById
const getUsersById = async (req, res) => {
    try {
      // Ambil ID dari parameter
      const id = req.params.id;

      // Cari pengguna berdasarkan ID
      const user = await Users.findOne({ where: { id }});
      res.status(200).json({ user });

    } catch (error) {
       console.error('Terjadi kesalahan saat mengambil data user',error);
       res.status(500).json('Internal Server Error') 
    }
}
// Dapatkan data jenis kelamin
const getJenisKelamin = async (req, res) => {
  try {
      const {rows} = await pool.query(getGenderForm);
      console.log(rows); 
      res.status(200).json(rows)
  } catch (error) {
      console.error("Error fetching gender options:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Function hapus user
const deleteUsers = async (req, res) => {
    try {
      // Ambil ID dari parameter 
      const id = req.params.id; 
  
      // Cari pengguna berdasarkan ID
      const user = await Users.findOne({ where: { id } });
  
      // Hapus pengguna dari database
      await user.destroy();
  
      // Kirim respons 
      res.status(200).json({ msg: "Pengguna berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Kesalahan Internal Server" });
    }
  };

// Function Register
const Register = async (req, res) => {
  const { name, email, password, confPassword, jenis_kelamin_id, tanggal_lahir, kelas_id, alamat } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password Tidak Sama" });
  }

  try {
    console.log("Mengecek apakah email sudah terdaftar...");
    const userResult = await pool.query(queriesUser.getUserByEmail, [email]);
    if (userResult.rows.length > 0) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      console.log("Menambahkan pengguna baru...");
      const addUserValues = [name, email, hashPassword, null, 'siswa'];
      console.log("addUserValues:", addUserValues);
      const newUserResult = await client.query(queriesUser.addUser, addUserValues);
      const newUserId = newUserResult.rows[0].id;

      console.log("Mengambil ID jenis kelamin...");
      console.log("jenis_kelamin_id yang diterima dari frontend:", jenis_kelamin_id);
      const genderResult = await client.query(getGender, [jenis_kelamin_id]);
      console.log("genderResult:", genderResult.rows);
      if (genderResult.rows.length === 0) {
        throw new Error("Invalid gender type");
      }
      const genderId = genderResult.rows[0].id;

      console.log("Validasi kelas ID...");
      const kelasResult = await client.query(queriesKelas.getKelasForm, [kelas_id]);
      console.log("kelasResult:", kelasResult.rows);
      if (kelasResult.rows.length === 0) {
        throw new Error("Invalid class ID");
      }
      const kelasId = kelasResult.rows[0].id;

      console.log("Jenis kelamin ID:", genderId);
      console.log("Kelas ID:", kelasId);
      console.log("Menambahkan siswa baru...");
      const addStudentValues = [newUserId, name, genderId, tanggal_lahir, kelasId, alamat];
      console.log("addStudentValues:", addStudentValues);
      await client.query(queriesSiswa.addStudent, addStudentValues);

      await client.query('COMMIT');

      res.status(201).json({ msg: "Registrasi berhasil" });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Terjadi kesalahan saat melakukan register:', error);
      res.status(500).json({ msg: "Internal Server Error" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan register:', error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


// Function Login
const Login = async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log(req.body)
      //  Validasi email dan password harus diisi
      if (!email || !password) {
          return res.status(400).json({ msg: "Email dan password diperlukan" });
      }
      const userResult = await pool.query(getUserByEmail, [email]);
      // Cek apakah email terdaftar
      if (userResult.rows.length === 0) {
          return res.status(400).json({ msg: "Email tidak terdaftar" });
      }
      // Ambil data pengguna dari hasil query
      const user = userResult.rows[0];

      // Apakah passwordnya sama ?
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ msg: "Password Salah" });

      // Ambil informasi pengguna
      const { role, id: userId, name, email: userEmail } = user;

      // Buat akses token 
      const accessToken = jwt.sign({ userId, name, email: userEmail, role }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '3600s' 
      });

      res.json({ accessToken, name, role })

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Function Logout
const Logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');  
    return res.sendStatus(200);
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan logout', error);
    return res.status(500).json({ msg: "Internal Server Error" }); 
  }
};

module.exports = {
    getUsers,
    getJenisKelamin,
    getUsersById,
    getJenisKelamin,
    deleteUsers,
    Register,
    Login,
    Logout,
};