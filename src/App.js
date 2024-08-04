import logo from './logo.svg';
import './App.css';
import InputBoxWithButton from './Components/InputBoxWithButton/InputBoxWithButton';
import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';


function App() {
  return (
    <div className="App">
        <NavBar/>

        <div className="container">
          <Routes>
              <Route path="/" element= {<Home/>}/>
              <Route path="/Search" element= {<SearchPage/>}/>

          </Routes>
        </div>

        <p>Unit Test</p>
        <img src={logo} className="App-logo" alt="logo" />

      

    </div>
  );
}

export default App;
