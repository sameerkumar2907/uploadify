import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, deleteFile } from '../redux/actions/fileActions';
import { List, ListItem, ListItemText, IconButton, CircularProgress, Typography, Card, CardContent, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FileList = () => {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector(state => state.file);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleDelete = (fileId) => {
    dispatch(deleteFile(fileId));
  };

  const handleDownload = (fileId, filename) => {
    const link = document.createElement('a');
    link.href = `http://localhost:5000/api/files/${fileId}/download`;
    link.download = filename;
    link.click();
  };

  const handlePreview = (fileId) => {
    window.open(`http://localhost:5000/api/files/${fileId}/preview`, '_blank');
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Uploaded Files
        </Typography>

        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" mt={2}>
            Error: {error}
          </Typography>
        )}

        {files.length === 0 ? (
          <Typography>No files uploaded yet.</Typography>
        ) : (
          <List>
            {files.map((file) => (
              <ListItem
                key={file.id}
                sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}
              >
                <ListItemText primary={file.filename} />
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" onClick={() => handlePreview(file.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success" onClick={() => handleDownload(file.id, file.filename)}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(file.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default FileList;
