export const fetchFiles = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_FILES_REQUEST' });
    try {
      const response = await fetch('http://localhost:5000/api/files');
      const data = await response.json();
      dispatch({ type: 'FETCH_FILES_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_FILES_FAILURE', error: error.message });
    }
  };
};

// Upload a file
export const uploadFile = (file) => {
  return async (dispatch) => {
    dispatch({ type: 'UPLOAD_FILE_REQUEST' });
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'File upload failed');
      }

      const result = await response.json();
      dispatch({ type: 'UPLOAD_FILE_SUCCESS', payload: result });
    } catch (error) {
      dispatch({ type: 'UPLOAD_FILE_FAILURE', error: error.message });
    }
  };
};

// Delete a file
export const deleteFile = (fileId) => {
  return async (dispatch) => {
    dispatch({ type: 'DELETE_FILE_REQUEST' });
    try {
      const response = await fetch(`http://localhost:5000/api/files/${fileId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch({ type: 'DELETE_FILE_SUCCESS', payload: fileId });
      }
    } catch (error) {
      dispatch({ type: 'DELETE_FILE_FAILURE', error: error.message });
    }
  };
};
