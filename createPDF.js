const fs = require('fs');
const PDFDocument = require('pdfkit');
const { create } = require('domain');

function createPDF(info, path) {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
  generateTable(doc, info);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc.image('res/photo.jpg', 50, 45, { width: 520, height: 200 }).moveDown();
}

function generateTable(doc, info) {
  doc
    .image('res/bses.jpg', 50, 270, { width: 150, height: 150 })
    .fontSize(22)
    .font('fonts/MADE.otf')
    .text('Due Date :', 270, 300)
    .font('fonts/times.ttf')
    .text(info.elecdd, 400, 300)
    .font('fonts/MADE.otf')
    .text('Total Amount :', 270, 350)
    .font('fonts/times.ttf')
    .text(info.elecamt, 450, 350)
    .image('res/igl.jpg', 50, 430, { width: 150, height: 150 })
    .font('fonts/MADE.otf')
    .text('Due Date :', 270, 460)
    .font('fonts/times.ttf')
    .text(info.gasdd, 400, 460)
    .font('fonts/MADE.otf')
    .text('Total Amount :', 270, 510)
    .font('fonts/times.ttf')
    .text(info.gasamt, 450, 510)
    .image('res/djb.jpg', 50, 600, { width: 150, height: 150 })
    .font('fonts/MADE.otf')
    .text('Due Date :', 270, 630)
    .font('fonts/times.ttf')
    .text(info.waterdd, 400, 630)
    .font('fonts/MADE.otf')
    .text('Total Amount :', 270, 680)
    .font('fonts/times.ttf')
    .text(info.wateramt, 450, 680);
}

module.exports = {
  createPDF,
};
