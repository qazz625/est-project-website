import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BasicDetails from './components/BasicDetails';
import GHGEmissions from './components/GHGEmissions';
import Contributors from './components/Contributors';
import Predict from './components/Predict'



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/basic-details" element={<BasicDetails />}/>
          <Route path="/ghg-emissions" element={<GHGEmissions />}/>
          <Route path="/predict" element={<Predict />}/>
          <Route path="/contributors" element={<Contributors />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
