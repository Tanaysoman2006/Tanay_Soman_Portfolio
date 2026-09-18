const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume(outputPath) {
  // Create a document with Letter size (612 x 792 points) and compact margins (36 pt = 0.5 in)
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 36, bottom: 36, left: 40, right: 40 },
    autoFirstPage: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const leftMargin = 40;
  const rightMargin = 572; // 612 - 40
  const contentWidth = rightMargin - leftMargin;

  // Header: Name
  doc.font('Helvetica-Bold')
     .fontSize(20)
     .fillColor('#111827')
     .text('TANAY SOMAN', leftMargin, 36, { align: 'center', width: contentWidth });

  doc.moveDown(0.2);

  // Contact line 1
  doc.font('Helvetica')
     .fontSize(8.5)
     .fillColor('#222222')
     .text('Nagpur, Maharashtra, India  |  +91 98987 66745  |  tanaysoman578@gmail.com', {
       align: 'center',
       width: contentWidth
     });

  doc.moveDown(0.15);

  // Links line
  doc.font('Helvetica')
     .fontSize(8.5)
     .fillColor('#1e40af')
     .text('linkedin.com/in/tanay-soman-2a8a382a5  |  github.com/Tanaysoman2006', {
       align: 'center',
       width: contentWidth
     });

  doc.moveDown(0.5);

  function addSectionHeader(title) {
    const y = doc.y;
    doc.font('Helvetica-Bold')
       .fontSize(9.5)
       .fillColor('#111827')
       .text(title.toUpperCase(), leftMargin, y);
    
    const lineY = doc.y + 1;
    doc.strokeColor('#4b5563')
       .lineWidth(0.75)
       .moveTo(leftMargin, lineY)
       .lineTo(rightMargin, lineY)
       .stroke();

    doc.y = lineY + 4;
  }

  // 1. PROFESSIONAL SUMMARY
  addSectionHeader('PROFESSIONAL SUMMARY');
  doc.font('Helvetica')
     .fontSize(8.2)
     .fillColor('#1f2937')
     .text(
       'Computer Science and Engineering undergraduate at Symbiosis Institute of Technology, Nagpur, with working proficiency in Python, C, Java and SQL and a solid foundation in Data Structures, Algorithms and Object-Oriented Programming. Experienced in building computer vision and deep learning projects with OpenCV, MediaPipe and CNN architectures, with exposure to AWS cloud fundamentals. Seeking a software engineering internship where I can apply these skills to production problems and learn from experienced engineers.',
       leftMargin,
       doc.y,
       { width: contentWidth, align: 'justify', lineGap: 1.5 }
     );

  doc.moveDown(0.5);

  // 2. EDUCATION
  addSectionHeader('EDUCATION');

  function addEduItem(school, dates, degree, grade) {
    const startY = doc.y;
    doc.font('Helvetica-Bold')
       .fontSize(8.5)
       .fillColor('#111827')
       .text(school, leftMargin, startY, { width: contentWidth - 140 });

    doc.font('Helvetica')
       .fontSize(8.5)
       .fillColor('#374151')
       .text(dates, rightMargin - 140, startY, { width: 140, align: 'right' });

    let degreeText = degree;
    if (grade) {
      degreeText += ` — ${grade}`;
    }
    doc.font('Helvetica')
       .fontSize(8.2)
       .fillColor('#374151')
       .text(degreeText, leftMargin, doc.y, { width: contentWidth });

    doc.moveDown(0.3);
  }

  addEduItem('Symbiosis Institute of Technology, Nagpur', 'Jul 2024 – May 2028 (Expected)', 'Bachelor of Technology (B.Tech), Computer Science and Engineering');
  addEduItem('M. K. H. Sancheti Junior College, Nagpur', 'Jul 2022 – Apr 2024', 'Higher Secondary Certificate (Class XI–XII), Science', '83.3%');
  addEduItem('R. S. Mundle English School, Nagpur', 'Jun 2016 – Apr 2022', 'Secondary School Certificate (Class X)', '92.7%');

  doc.moveDown(0.2);

  // 3. TECHNICAL SKILLS
  addSectionHeader('TECHNICAL SKILLS');

  function addSkill(label, value) {
    doc.font('Helvetica-Bold')
       .fontSize(8.2)
       .fillColor('#111827')
       .text(label + ': ', leftMargin, doc.y, { continued: true });

    doc.font('Helvetica')
       .fontSize(8.2)
       .fillColor('#374151')
       .text(value, { lineGap: 1 });
    doc.moveDown(0.1);
  }

  addSkill('Programming Languages', 'Python, C, Java');
  addSkill('Core Computer Science', 'Data Structures and Algorithms, Object-Oriented Programming, DBMS');
  addSkill('Machine Learning & Vision', 'OpenCV, MediaPipe, NumPy, Convolutional Neural Networks, MobileNetV2, Grad-CAM');
  addSkill('Databases & Cloud', 'SQL, AWS (cloud fundamentals, basic deployment)');
  addSkill('Other', 'Embedded Systems, Git and GitHub');

  doc.moveDown(0.3);

  // 4. PROJECTS
  addSectionHeader('PROJECTS');

  function addProject(title, tech, bullets) {
    const startY = doc.y;
    doc.font('Helvetica-Bold')
       .fontSize(8.5)
       .fillColor('#111827')
       .text(title, leftMargin, startY, { width: contentWidth - 180 });

    doc.font('Helvetica-Oblique')
       .fontSize(8.2)
       .fillColor('#4b5563')
       .text(tech, rightMargin - 180, startY, { width: 180, align: 'right' });

    doc.y = startY + 11;

    bullets.forEach(b => {
      doc.font('Helvetica')
         .fontSize(8.2)
         .fillColor('#374151')
         .text('•  ' + b, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
      doc.moveDown(0.1);
    });

    doc.moveDown(0.25);
  }

  addProject(
    'Driver Drowsiness Detection System',
    'Python, OpenCV, MediaPipe, NumPy',
    [
      'Built a real-time system that monitors a driver through a webcam feed and raises an alert when signs of drowsiness are detected.',
      'Used MediaPipe facial landmark detection with OpenCV video processing to track eye and mouth state across frames.',
      'Implemented frame-wise numerical analysis in NumPy to distinguish sustained drowsiness from ordinary blinking, reducing false alerts.'
    ]
  );

  addProject(
    'Tomato Leaf Disease Detection Model',
    'CNN, MobileNetV2, Grad-CAM',
    [
      'Developed an image classification model that identifies common tomato leaf diseases from photographs of crop leaves.',
      'Applied transfer learning with a MobileNetV2 backbone to achieve reliable accuracy on a lightweight architecture suited to low-resource deployment.',
      'Integrated Grad-CAM visualisations to highlight the leaf regions driving each prediction, making the model’s output interpretable to non-technical users.'
    ]
  );

  doc.moveDown(0.1);

  // 5. EXPERIENCE
  addSectionHeader('EXPERIENCE');

  const expY = doc.y;
  doc.font('Helvetica-Bold')
     .fontSize(8.5)
     .fillColor('#111827')
     .text('Web Development Intern — InternPe', leftMargin, expY, { width: contentWidth - 140 });

  doc.font('Helvetica')
     .fontSize(8.2)
     .fillColor('#4b5563')
     .text('May 2026 – Jun 2026', rightMargin - 140, expY, { width: 140, align: 'right' });

  doc.font('Helvetica-Oblique')
     .fontSize(8)
     .fillColor('#4b5563')
     .text('Remote', leftMargin, doc.y + 1);

  doc.moveDown(0.15);

  const expBullets = [
    'Completed a two-month structured web development internship, building responsive web applications to provided specifications.',
    'Developed front-end interfaces with HTML, CSS and JavaScript, focusing on clean layout and cross-device compatibility.',
    'Delivered assigned milestones on schedule and incorporated mentor feedback through iterative review cycles.'
  ];

  expBullets.forEach(b => {
    doc.font('Helvetica')
       .fontSize(8.2)
       .fillColor('#374151')
       .text('•  ' + b, leftMargin + 8, doc.y, { width: contentWidth - 8, lineGap: 1 });
    doc.moveDown(0.1);
  });

  doc.moveDown(0.3);

  // 6. ADDITIONAL SKILLS
  addSectionHeader('ADDITIONAL SKILLS');
  doc.font('Helvetica')
     .fontSize(8.2)
     .fillColor('#1f2937')
     .text('Problem solving  ·  Analytical thinking  ·  Team collaboration  ·  Languages: English, Hindi, Marathi', leftMargin, doc.y, { width: contentWidth });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

if (require.main === module) {
  const out = path.join(__dirname, 'Tanay_Soman_Resume.pdf');
  generateResume(out)
    .then(() => {
      console.log('Resume PDF generated successfully at', out);
      // Also copy to dist if dist exists
      const distDir = path.join(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        fs.copyFileSync(out, path.join(distDir, 'Tanay_Soman_Resume.pdf'));
        fs.copyFileSync(out, path.join(distDir, 'resume.pdf'));
      }
      fs.copyFileSync(out, path.join(__dirname, 'resume.pdf'));
    })
    .catch(err => {
      console.error('Error generating resume PDF:', err);
      process.exit(1);
    });
}

module.exports = { generateResume };
