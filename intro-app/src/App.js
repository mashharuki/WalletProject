import QRCode from "qrcode.react";
import './App.css';

function App() {
  // URL
  const URL = 'http://192.168.0.3:3000'

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <strong>Welcome to IDQ Soul Wallet!!</strong>
        </p>
        <QRCode value={URL} />
        <a href={URL}>{URL}</a>
      </header>
    </div>
  );
}

export default App;
