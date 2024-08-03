import logo from './logo.svg';
import './App.css';
import InputBoxWithButton from './Components/InputBoxWithButton/InputBoxWithButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


         <InputBoxWithButton displayValue="Search"/>
      </header>
    </div>
  );
}

export default App;
