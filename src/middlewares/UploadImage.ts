import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import multer from "multer";
import path from "path";

const serviceAccount = require("../config/FIREBASE_CONFIG_KEY.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'ajudai-ii.appspot.com'
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadImage = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      console.log('Nenhuma imagem encontrada.');
      return next();
    }

    const image = req.file;

    const name = `${Date.now()}_${path.basename(image.originalname)}`;

    const file = bucket.file(name);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on("error", (err: Error) => {
      console.error('Erro ao escrever no stream:', err);
      return res.status(500).json({ error: "Erro ao fazer upload da imagem" });
    });

    stream.on("finish", async () => {
      await file.makePublic();
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${name}`;
      return res.json({ imageUrl });
    });

    stream.end(image.buffer);
  } catch (error) {
    console.error('Erro durante o processo:', error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
