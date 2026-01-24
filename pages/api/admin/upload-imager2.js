import formidable from 'formidable';
import fs from 'fs';
import { uploadToR2 } from '../../../libs/r2';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    maxFileSize: 5 * 1024 * 1024,
    allowEmptyFiles: false,
  });

  try {
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only images allowed.' });
    }

    const timestamp = Date.now();
    const originalName = file.originalFilename.replace(/[^a-zA-Z0-9.]/g, '_');
    const key = `gambarsoal/${timestamp}-${originalName}`;

    const fileBuffer = fs.readFileSync(file.filepath);

    const fileObj = {
      buffer: fileBuffer,
      mimetype: file.mimetype,
    };

    const url = await uploadToR2(fileObj, key);

    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      success: true,
      url,
      key
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
}
