import logo from './logo.svg';
import './App.css';
import InputBox from './Components/InputBox/InputBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


         <InputBox displayValue="Search"/>
      </header>
    </div>
  );
}

export default App;
