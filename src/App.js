
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Navbar />
      <Switch>
        <Route path='/' />
      </Switch>
    </Router>
  );
}

export default App;
