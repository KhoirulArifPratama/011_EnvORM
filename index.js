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

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server berjalan pada port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Gagal menghubungkan ke database:', err);
    });
