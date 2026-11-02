const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

// Middleware parsing request body
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Endpoint root informasi API
app.get('/', (req, res) => {
    res.json({
        message: 'Selamat datang di API Perpustakaan Komik',
        endpoints: {
            getAllKomik: 'GET /komik',
            getKomikById: 'GET /komik/:id',
            createKomik: 'POST /komik',
            updateKomik: 'PUT /komik/:id',
            deleteKomik: 'DELETE /komik/:id'
        }
    });
});

// Endpoint untuk menambahkan komik baru dengan validasi input
app.post('/komik', async (req, res) => {
    try {
        const { title, description, author } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                message: 'Field title dan author wajib diisi'
            });
        }

        const komikBaru = await db.Komik.create({
            title,
            description,
            author
        });

        res.status(201).json({
            message: 'Komik berhasil ditambahkan',
            data: komikBaru
        });
    } catch (err) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server saat menambahkan komik',
            error: err.message
        });
    }
});

// Endpoint untuk mengambil seluruh daftar komik
app.get('/komik', async (req, res) => {
    try {
        const daftarKomik = await db.Komik.findAll();
        res.status(200).json({
            total: daftarKomik.length,
            data: daftarKomik
        });
    } catch (err) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat mengambil daftar komik',
            error: err.message
        });
    }
});

// Endpoint untuk mengambil detail komik berdasarkan ID
app.get('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({
                message: `Komik dengan ID ${id} tidak ditemukan`
            });
        }
        res.status(200).json({
            message: 'Data komik ditemukan',
            data: komik
        });
    } catch (err) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat mencari komik',
            error: err.message
        });
    }
});

// Endpoint untuk memperbarui data komik berdasarkan ID
app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const { title, description, author } = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({
                message: `Komik dengan ID ${id} tidak ditemukan`
            });
        }

        await komik.update({
            title: title !== undefined ? title : komik.title,
            description: description !== undefined ? description : komik.description,
            author: author !== undefined ? author : komik.author
        });

        res.status(200).json({
            message: 'Komik berhasil diupdate',
            data: komik
        });
    } catch (err) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat memperbarui data komik',
            error: err.message
        });
    }
});

// Endpoint untuk menghapus data komik berdasarkan ID
app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({
                message: `Komik dengan ID ${id} tidak ditemukan`
            });
        }

        await komik.destroy();
        res.status(200).json({
            message: `Komik dengan ID ${id} berhasil dihapus`
        });
    } catch (err) {
        res.status(500).json({
            message: 'Terjadi kesalahan saat menghapus komik',
            error: err.message
        });
    }
});

// Sinkronisasi database Sequelize sebelum menjalankan server Express
db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server berhasil berjalan pada port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal menghubungkan ke database PostgreSQL:', err);
    });
