import express from "express";
import upload from "../config/multerConfig.js";
import { uploadFile, getAllFiles, previewFile, downloadFile, deleteFile } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile, (err, req, res, next) => {
  if (err) {
    // If the error is a multer error (invalid file type), send the error message
    if (err.message === "Invalid file type") {
      return res.status(400).json({ message: "Invalid file type" });
    }
    return res.status(500).json({ message: "An error occurred during file upload" });
  }
});
router.get("/files", getAllFiles);
router.delete("/files/:id", deleteFile);

router.get('/files/:id/preview', previewFile);
router.get('/files/:id/download', downloadFile);

export default router;
