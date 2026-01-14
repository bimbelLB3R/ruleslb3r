const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require('dotenv').config({ path: '.env.local' });

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function testUpload() {
  try {
    // Buat dummy file
    const testContent = "Test upload from LB3R";
    const key = `test-uploads/test-${Date.now()}.txt`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(testContent),
      ContentType: "text/plain",
    //   ACL: "public-read",
    });

    await s3Client.send(command);

    const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    
    console.log("✅ Upload berhasil!");
    console.log("📎 URL:", url);
    console.log("\n🔗 Buka URL di browser untuk test public access");
  } catch (error) {
    console.error("❌ Upload gagal:", error.message);
  }
}

testUpload();