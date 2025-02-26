import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/chats' Component={Chatpage}></Route>
      </Routes>
    </div>
  );
}

export default App;
