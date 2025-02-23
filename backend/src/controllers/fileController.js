import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import prisma from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload File
export const uploadFile = async (req, res) => {
  try {
    const { originalname, mimetype, size, path } = req.file;

    const file = await prisma.files.upsert({
      where: { filename: originalname },
      update: {
        filepath: path,
        mimetype,
        size,
        uploadedAt: new Date(),
      },
      create: {
        filename: originalname,
        filepath: path,
        mimetype,
        size,
      },
    });

    res.status(200).json(file);
  } catch (error) {
    console.error("Error in uploadFile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get All Files
export const getAllFiles = async (req, res) => {
  try {
    const files = await prisma.files.findMany();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Download File
export const downloadFile = async (req, res) => {
  try {
    const file = await prisma.files.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!file) return res.status(404).json({ error: "File not found" });

    const filePath = path.join("uploads", file.filename);
    res.download(filePath, file.name);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Preview File
export const previewFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find file in the database
    const file = await prisma.files.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    const filePath = path.join(__dirname, "../../uploads/", file.filename);

    // Send the file for preview (auto-detect MIME type and send proper content type)
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in previewFile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete File
export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find file in the database
    const file = await prisma.files.findUnique({
      where: { id: parseInt(id) },
    });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Construct full file path
    const filePath = path.join(__dirname, "../../uploads/", file.filename);

    // Delete file from filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error deleting file" });
      }

      // Remove file entry from database
      await prisma.files.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    console.error("Error in deleteFile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
