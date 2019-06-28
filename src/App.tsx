import React from 'react';
import Editor from './components/editor'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
const App: React.FC = () => {
  
  return (
    <div className="App">
      <Editor />
    </div>
  );
}

export default App;
