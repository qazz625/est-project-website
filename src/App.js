import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BasicDetails from './components/BasicDetails';
import CO2Emissions from './components/CO2Emissions';
import Contributors from './components/Contributors';



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/basic-details" element={<BasicDetails />}/>
          <Route path="/co2-emissions" element={<CO2Emissions />}/>
          <Route path="/contributors" element={<Contributors />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
