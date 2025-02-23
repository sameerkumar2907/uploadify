import React from 'react';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Uploadify
      </h1>
      <FileUpload />
      <FileList />
    </div>
  );
};

export default App;
