import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import './components/Header';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';

function App() {


  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/coin/:id' element={<Coinpage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
