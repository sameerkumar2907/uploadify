import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../redux/actions/fileActions';
import { Button, Typography, Box, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { files, uploadError } = useSelector((state) => state.file);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Clear previous upload errors
    if (uploadError) {
      dispatch({ type: 'CLEAR_UPLOAD_ERROR' });
    }

    // Check if file with the same name already exists
    const isDuplicate = files.some((f) => f.filename === selectedFile.name);
    if (isDuplicate) {
      setFile(selectedFile);
      setShowConfirmation(true);
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadFile(file));  
      resetFileInput();
    }
  };

  const handleConfirmUpload = () => {
    setShowConfirmation(false);
    if (file) {
      dispatch(uploadFile(file));
      resetFileInput();
    }
  };

  const handleCancelUpload = () => {
    setShowConfirmation(false);
    resetFileInput();
  };

  // Resets the file input to allow re-selecting the same file
  const resetFileInput = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upload a File
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Choose a File
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
              Select File
            </Button>
          </label>
          {file && <Typography>{file.name}</Typography>}
        </Box>

        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
          Upload
        </Button>

        {uploadError && (
          <Typography color="error" mt={2}>
            {uploadError}
          </Typography>
        )}
      </Paper>

      {/* Confirmation Dialog for Duplicate Files */}
      <Dialog open={showConfirmation} onClose={handleCancelUpload}>
        <DialogTitle>File Already Exists</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A file with the same name already exists. Do you want to replace it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUpload} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUpload} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileUpload;
