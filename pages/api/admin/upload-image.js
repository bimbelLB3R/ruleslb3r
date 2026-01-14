import formidable from 'formidable';
import fs from 'fs';
import { uploadToS3 } from '../../../libs/s3';

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
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowEmptyFiles: false,
  });

  try {
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only images allowed.' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalFilename.replace(/[^a-zA-Z0-9.]/g, '_');
    const key = `soal-images/${timestamp}-${originalName}`;

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Upload to S3
    const fileObj = {
      buffer: fileBuffer,
      mimetype: file.mimetype,
    };
    
    const url = await uploadToS3(fileObj, key);

    // Clean up temp file
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