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

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server berjalan pada port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal menghubungkan ke database:', err);
    });
