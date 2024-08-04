import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import TestPage from './Pages/TestPage';
import RegisterPage from './Pages/RegisterPage';
import LogInPage from './Pages/LogInPage';


function App() {
  return (
    <div className="App">
        <NavBar/>

        <div className="container">
          <Routes>
              <Route path="/" element= {<Home/>}/>
              <Route path="/Search" element= {<SearchPage/>}/>
              <Route path="/Test" element= {<TestPage/>}/>
              <Route path='/Register' element= {<RegisterPage/>}/>
              <Route path='/LogIn' element= {<LogInPage/>}/>



          </Routes>
        </div>

        <p>Unit Test</p>
        <img src={logo} className="App-logo" alt="logo" />

      

    </div>
  );
}

export default App;
