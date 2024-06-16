// @ts-nocheck
const cors = require("cors");
const express = require("express");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require('multer');

const multerUpload = multer();
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post("/start-upload", async (req, res) => {
  const { fileName, fileType } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
  };

  try {
    const upload = await s3.createMultipartUpload(params).promise();
    console.log({ upload });
    res.send({ uploadId: upload.UploadId });
  } catch (error) {
    res.send(error);
  }
});

app.post("/upload-part", multerUpload.single("fileChunk"), async (req, res) => {
  const { fileName, partNumber, uploadId, fileChunk } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    PartNumber: partNumber,
    UploadId: uploadId,
    Body: Buffer.from(fileChunk, "base64"),
  };

  try {
    const uploadParts = await s3.uploadPart(params).promise();
    console.log({ uploadParts });
    res.send({ ETag: uploadParts.ETag})
  } catch (error) {
    res.send(error);
  }
});

app.post("/complete-upload", async (req, res) => {
  const { fileName, uploadId, parts } = req.body;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
  };

  try {
    const complete = await s3.completeMultipartUpload(params).promise();
    console.log({ complete });
    res.send({ fileUrl: complete.Location });
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
