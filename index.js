const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API Perpustakaan Komik' });
});

// Endpoint untuk menambahkan komik baru
app.post('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.create(req.body);
        res.status(201).json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil seluruh daftar komik
app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk mengambil detail komik berdasarkan ID
app.get('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        res.status(200).json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk memperbarui data komik berdasarkan ID
app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }

        await komik.update(data);
        res.status(200).json({ message: 'Komik berhasil diupdate', komik });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint untuk menghapus data komik berdasarkan ID
app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }

        await komik.destroy();
        res.status(200).json({ message: 'Komik berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server berjalan pada port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal menghubungkan ke database:', err);
    });
