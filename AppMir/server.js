const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Folosim CORS pentru a permite cereri din frontend
app.use(cors());

// Servim fișiere statice din folderul "public"
app.use(express.static('public'));

// Configurare pentru stocarea fișierelor încărcate
const storage = multer.diskStorage({
  destination: 'uploads/', // Folderul în care fișierele vor fi salvate
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Folosim numele original al fișierului
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Ruta pentru încărcarea fișierului
app.post('/upload', upload.single('cbct'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ filename: req.file.filename });
});

// Ruta pentru descărcarea fișierului
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Verificăm dacă fișierul există
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
