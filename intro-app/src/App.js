import QRCode from "qrcode.react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <strong>Welcome to IDQ Soul Wallet!!</strong>
        </p>
        <QRCode value="https://google.com" />
      </header>
    </div>
  );
}

export default App;
