const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const distDir = path.join(__dirname, 'dist');
const staticDir = fs.existsSync(path.join(distDir, 'index.html')) ? distDir : __dirname;

app.use(express.static(staticDir));

app.get(['/Tanay_Soman_Resume.pdf', '/resume.pdf', '/resume'], (req, res) => {
  const pdfPath = path.join(__dirname, 'Tanay_Soman_Resume.pdf');
  if (req.query.download === '1' || req.query.download === 'true') {
    res.download(pdfPath, 'Tanay_Soman_Resume.pdf');
  } else {
    res.type('application/pdf');
    res.sendFile(pdfPath);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
