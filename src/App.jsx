// frontend/src/App.jsx
import React, { useState } from 'react';
import DocumentUpload from './components/DocumentUpload';
// import QueryInterface from './components/QueryInterface';
import GeminiInterface from './components/GeminiInterface';

function App() {
  const [view, setView] = useState('gemini'); // 'gemini', 'upload', 'query'

  return (
    <div>
      {/* Navigation to switch between views */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => setView('gemini')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Gemini UI
        </button>
        <button 
          onClick={() => setView('upload')}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Upload Docs
        </button>
        <button 
          onClick={() => setView('query')}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Query
        </button>
      </div>

      {view === 'gemini' && <GeminiInterface />}
      {view === 'upload' && <DocumentUpload />}
      {view === 'query' && <QueryInterface />}
    </div>
  );
}

export default App;