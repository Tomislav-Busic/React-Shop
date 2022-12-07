import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header && Footer/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={ <Home/> } />
      </Routes>
    </Router>
  );
}

export default App;
