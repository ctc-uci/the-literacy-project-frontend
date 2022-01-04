import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="mb-2">
          <Button
            variant="primary"
            href="https://react-bootstrap.github.io/getting-started/why-react-bootstrap/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about react-bootstrap here!!
          </Button>{' '}
        </div>
        <p>This is a React App!</p>
      </header>
    </div>
  );
}

export default App;
