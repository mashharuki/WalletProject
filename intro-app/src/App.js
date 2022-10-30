import QRCode from "qrcode.react";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <strong>Welcome to IDQ Soul Wallet!!</strong>
        </p>
        <QRCode value="http://192.168.0.19:3000" />
      </header>
    </div>
  );
}

export default App;
