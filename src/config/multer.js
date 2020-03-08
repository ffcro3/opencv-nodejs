import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString('hex') + path.extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/wps-office.xlsx',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Tipo de arquivo não suportado. Adcione um arquivo de Excel para continuar'
        )
      );
    }
  },
};
